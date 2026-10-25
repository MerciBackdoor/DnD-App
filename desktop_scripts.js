// ============================================================
// Реестр мини-приложений. Новое приложение = новая папка + одна запись здесь.
//   src     — путь к html относительно этой страницы
//   height  — высота окна по умолчанию (px), окно можно растянуть за нижнюю кромку
//   color   — акцентный цвет превью в списке
//   preview — (необязательно) картинка для превью, напр. 'clock/preview.png'
// ============================================================
const APPS = [
  { id: 'ability',  title: 'Характеристики',    desc: 'Лист героя, навыки, заклинания',  icon: '🛡️', color: '#c9a84c', src: 'ability_scores/Ability_Scores.html', height: 540 },
  { id: 'battle',   title: 'Боевой трекер',     desc: 'Инициатива, ХП, состояния',       icon: '⚔️', color: '#c0392b', src: 'battle_tracker/Battle_Tracker.html', height: 620 },
  { id: 'bestiary', title: 'Бестиарий',         desc: 'Поиск и карточки существ',        icon: '🐉', color: '#6b8e5a', src: 'bestiary/Bestiary.html',             height: 460 },
  { id: 'body',     title: 'Анатомия попаданий', desc: 'Куда попал удар (к12)',           icon: '🩸', color: '#a8453d', src: 'body_parts/Body_Parts.html',         height: 480 },
  { id: 'chaos',    title: 'Метр хаоса',        desc: 'Насколько партия опасна',         icon: '🔥', color: '#e67e22', src: 'chaos_meter/Chaos_Meter.html',       height: 250 },
  { id: 'clock',    title: 'Часы кампании',     desc: 'День, время суток, отдых',        icon: '🌗', color: '#5b7bd5', src: 'clock/Clock.html',                   height: 760 },
  { id: 'cubes',    title: 'Кубы',              desc: 'Броски d4–d100 и монета',         icon: '🎲', color: '#d4a017', src: 'cubes/Cubes.html',                   height: 310 },
  { id: 'ball',     title: 'Магический шар',    desc: 'Ответ на мысленный вопрос',       icon: '🔮', color: '#6a5acd', src: 'magic_ball/Magic_Ball.html',         height: 470 },
  { id: 'npc',      title: 'Генератор NPC',     desc: 'Отряд из трёх, портреты рас',     icon: '🧙', color: '#b5651d', src: 'npc_generator/NPC_Generator.html',   height: 680 },
  { id: 'loot',     title: 'Карманная добыча',  desc: 'Безделушка и монеты',             icon: '💰', color: '#ffd700', src: 'small_loot_generator/Small_Loot_Generator.html', height: 440 },
  { id: 'notes',    title: 'Быстрые заметки',   desc: 'Стикеры на рабочий стол',         icon: '📌', color: '#f0d060', src: 'quick_notes/Quick_Notes.html',       height: 430 },
  { id: 'spells',   title: 'Книга заклинаний',  desc: 'Поиск, фильтр, иллюстрации',      icon: '📖', color: '#7a5cd6', src: 'spell_book/Spell_Book.html',         height: 700 },
  { id: 'traps',    title: 'Конструктор ловушек', desc: 'Ловушки со СЛ и уроном',        icon: '🪤', color: '#8b5a2b', src: 'traps/Traps.html',                   height: 540 },
  { id: 'vivarium', title: 'Виварий',           desc: 'Свои монстры и враги',            icon: '🦂', color: '#8e3b46', src: 'vivarium/Vivarium.html',             height: 760 },
  { id: 'weather',  title: 'Погода',            desc: 'Погода, жара и холод',            icon: '⛅', color: '#4a90c2', src: 'weather/Weather.html',               height: 560 },
  { id: 'decks',    title: 'Колоды чудес',      desc: 'Карты Многих Вещей и другие',     icon: '🃏', color: '#d4af37', src: 'wonderful_decks/Wonderful_Decks.html', height: 640 },
  { id: 'images',   title: 'Просмотр картинок', desc: 'Галерея карт и арта',             icon: '🖼️', color: '#5a8a8a', src: 'image_viewer/Image_Viewer.html',     height: 520 }
];

const Desktop = (() => {
  const STORAGE_KEY = 'dnd_desktop_state_v2';
  const MIN_H = 160, MAX_H = 2400, GAP = 14;

  const root   = document.getElementById('desktop');
  const stage  = document.getElementById('stage');
  const stack  = document.getElementById('stack');
  const spacer = document.getElementById('spacer');
  const list   = document.getElementById('app-list');
  const vbar   = document.getElementById('vbar');
  const vthumb = document.getElementById('vthumb');
  const counter = document.getElementById('open-count');

  const wins = new Map();   // id -> { el, frame, body, meta, height }

  // ---------- Левая панель ----------
  const ORDER_KEY = 'dnd_desktop_app_order';

  // Порядок карточек: сохранённый пользователем, новые приложения — в конец
  function orderedApps() {
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(ORDER_KEY)) || []; } catch (e) {}
    const byId = new Map(APPS.map(a => [a.id, a]));
    const out = [];
    saved.forEach(id => { if (byId.has(id)) { out.push(byId.get(id)); byId.delete(id); } });
    byId.forEach(a => out.push(a));
    return out;
  }

  function saveOrder() {
    try {
      const ids = [...list.querySelectorAll('.app-card')].map(c => c.dataset.id);
      localStorage.setItem(ORDER_KEY, JSON.stringify(ids));
    } catch (e) { console.warn('Не удалось сохранить порядок приложений', e); }
  }

  function buildSidebar() {
    orderedApps().forEach(app => {
      const card = document.createElement('div');
      card.className = 'app-card';
      card.dataset.id = app.id;
      card.tabIndex = 0;
      card.draggable = true;
      card.setAttribute('role', 'button');
      card.title = 'Клик — открыть. Потяни, чтобы переставить.';
      card.style.setProperty('--c', app.color);
      card.innerHTML = `
        <div class="app-preview"><span>${app.icon}</span></div>
        <div class="app-info">
          <div class="app-name"></div>
          <div class="app-desc"></div>
        </div>
        <span class="dot"></span>`;
      card.querySelector('.app-name').textContent = app.title;
      card.querySelector('.app-desc').textContent = app.desc;

      if (app.preview) {
        const img = new Image();
        img.alt = '';
        img.draggable = false;          // тащим карточку, а не картинку внутри неё
        img.onload = () => { const box = card.querySelector('.app-preview'); box.textContent = ''; box.appendChild(img); };
        img.src = app.preview;
      }
      card.addEventListener('click', () => openApp(app.id));
      list.appendChild(card);
    });
    bindReorder();
  }

  // Перестановка карточек перетаскиванием (и Alt+↑/↓ с клавиатуры)
  function bindReorder() {
    let dragged = null;

    list.addEventListener('dragstart', (e) => {
      const card = e.target.closest('.app-card');
      if (!card) return;
      dragged = card;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.dataset.id);   // нужно Firefox
      setTimeout(() => card.classList.add('is-dragging'), 0);
    });

    list.addEventListener('dragover', (e) => {
      if (!dragged) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      // автопрокрутка списка у верхнего и нижнего края
      const r = list.getBoundingClientRect();
      if (e.clientY < r.top + 50) list.scrollTop -= 14;
      else if (e.clientY > r.bottom - 50) list.scrollTop += 14;

      // куда вставить: перед первой карточкой, середина которой ниже курсора
      const others = [...list.querySelectorAll('.app-card:not(.is-dragging)')];
      const before = others.find(c => {
        const b = c.getBoundingClientRect();
        return e.clientY < b.top + b.height / 2;
      });
      if (before) { if (dragged.nextElementSibling !== before) list.insertBefore(dragged, before); }
      else if (list.lastElementChild !== dragged) list.appendChild(dragged);
    });

    list.addEventListener('drop', (e) => { if (dragged) { e.preventDefault(); saveOrder(); } });

    list.addEventListener('dragend', () => {
      if (!dragged) return;
      dragged.classList.remove('is-dragging');
      dragged = null;
      saveOrder();
    });

    list.addEventListener('keydown', (e) => {
      const card = e.target.closest('.app-card');
      if (!card) return;
      if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        const sib = e.key === 'ArrowUp' ? card.previousElementSibling : card.nextElementSibling;
        if (!sib) return;
        if (e.key === 'ArrowUp') list.insertBefore(card, sib); else list.insertBefore(sib, card);
        card.focus();
        saveOrder();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openApp(card.dataset.id);
      }
    });
  }

  function refreshSidebar() {
    list.querySelectorAll('.app-card').forEach(c => c.classList.toggle('is-open', wins.has(c.dataset.id)));
    counter.textContent = 'Открыто: ' + wins.size;
    root.classList.toggle('has-windows', wins.size > 0);
    markCurrent();
  }

  function markCurrent() {
    let current = null;
    const probe = stage.scrollTop + stage.clientHeight * 0.35;
    wins.forEach((w, id) => { if (w.el.offsetTop <= probe) current = id; });
    list.querySelectorAll('.app-card').forEach(c => c.classList.toggle('is-current', c.dataset.id === current));
  }

  // ---------- Окна ----------
  function createWindow(meta) {
    const el = document.createElement('section');
    el.className = 'win';
    el.innerHTML = `
      <header class="win-bar">
        <span class="win-icon"></span>
        <span class="win-title"></span>
        <button type="button" class="win-reload" title="Перезагрузить">⟳</button>
        <button type="button" class="win-close" title="Закрыть">×</button>
      </header>
      <div class="win-body"><iframe></iframe></div>
      <div class="win-grip" title="Потяни, чтобы изменить высоту"></div>`;

    el.querySelector('.win-icon').textContent = meta.icon || '▣';
    el.querySelector('.win-title').textContent = meta.title;
    const body  = el.querySelector('.win-body');
    const frame = el.querySelector('iframe');
    const height = clamp(meta.height || 480);
    body.style.height = height + 'px';

    if (meta.src) frame.src = meta.src; else frame.srcdoc = meta.srcdoc || '';
    if (!meta.src) el.querySelector('.win-reload').remove();

    el.querySelector('.win-close').addEventListener('click', () => close(meta.id));
    el.querySelector('.win-reload')?.addEventListener('click', () => reload(meta.id));
    bindResize(el.querySelector('.win-grip'), meta.id);

    stack.appendChild(el);
    wins.set(meta.id, { el, frame, body, meta, height });
    return wins.get(meta.id);
  }

  function openApp(id) {
    const app = APPS.find(a => a.id === id);
    if (!app) return;
    if (wins.has(id)) { focusWindow(id); return; }
    createWindow({ id: app.id, title: app.title, icon: app.icon, src: app.src, height: app.height, persist: true });
    afterLayoutChange();
    focusWindow(id);
  }

  // Документное окно (карточка персонажа, существо и т.п.)
  function openDoc(meta) {
    const existing = wins.get(meta.id);
    if (existing) {                       // то же самое окно — обновляем содержимое
      existing.meta = meta;
      existing.frame.srcdoc = meta.srcdoc || '';
      existing.el.querySelector('.win-title').textContent = meta.title;
      save();
    } else {
      createWindow(meta);
      afterLayoutChange();
    }
    focusWindow(meta.id);
  }

  function focusWindow(id) {
    const w = wins.get(id);
    if (!w) return;
    updateSpacer();
    stage.scrollTo({ top: Math.max(0, w.el.offsetTop - GAP), behavior: 'smooth' });
    w.el.classList.remove('flash');
    void w.el.offsetWidth;                // перезапуск анимации
    w.el.classList.add('flash');
  }

  function close(id) {
    const w = wins.get(id);
    if (!w) return;
    w.el.remove();
    wins.delete(id);
    afterLayoutChange();
  }

  function closeAll() {
    [...wins.keys()].forEach(id => { wins.get(id).el.remove(); wins.delete(id); });
    afterLayoutChange();
  }

  function reload(id) {
    const w = wins.get(id);
    if (!w || !w.meta.src) return;
    try { w.frame.contentWindow.location.replace(new URL(w.meta.src, location.href).href); }
    catch (e) { w.frame.src = w.meta.src; }
  }

  function isOwnFrame(source) {
    for (const w of wins.values()) if (w.frame.contentWindow === source) return true;
    return false;
  }

  // ---------- Высота окна ----------
  function clamp(h) { return Math.min(MAX_H, Math.max(MIN_H, Math.round(h))); }

  function bindResize(grip, id) {
    grip.addEventListener('pointerdown', (e) => {
      const w = wins.get(id);
      if (!w) return;
      e.preventDefault();
      grip.setPointerCapture(e.pointerId);
      const startY = e.clientY, startH = w.height;
      document.body.classList.add('dragging');

      const move = (ev) => {
        w.height = clamp(startH + ev.clientY - startY);
        w.body.style.height = w.height + 'px';
        afterLayoutChange(false);
      };
      const up = () => {
        grip.removeEventListener('pointermove', move);
        grip.removeEventListener('pointerup', up);
        grip.removeEventListener('pointercancel', up);
        document.body.classList.remove('dragging');
        save();
      };
      grip.addEventListener('pointermove', move);
      grip.addEventListener('pointerup', up);
      grip.addEventListener('pointercancel', up);
    });
  }

  // ---------- Прокрутка ----------
  // Запас снизу: чтобы любое окно, даже последнее и низкое, можно было подвести к верху экрана
  function updateSpacer() {
    const last = [...wins.values()].pop();
    const need = last ? stage.clientHeight - last.el.offsetHeight - GAP * 2 : 0;
    spacer.style.height = Math.max(0, need) + 'px';
  }

  function updateBar() {
    const sh = stage.scrollHeight, ch = stage.clientHeight, track = vbar.clientHeight;
    const scrollable = sh > ch + 1;
    vbar.classList.toggle('idle', !scrollable);
    if (!scrollable) {
      vthumb.style.height = (track - 8) + 'px';
      vthumb.style.transform = 'translateY(0)';
      return;
    }
    const th = Math.max(48, (track - 8) * ch / sh);
    const top = (stage.scrollTop / (sh - ch)) * (track - 8 - th);
    vthumb.style.height = th + 'px';
    vthumb.style.transform = `translateY(${top}px)`;
  }

  function afterLayoutChange(persist = true) {
    updateSpacer();
    updateBar();
    refreshSidebar();
    if (persist) save();
  }

  function wheelScroll(e) {
    e.preventDefault();
    const k = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? stage.clientHeight : 1;
    stage.scrollTop += e.deltaY * k;
  }

  function bindScrolling() {
    // Колесо над правой полосой и над «рамками» окон/промежутками — листает центральную область.
    // Колесо над содержимым приложения достаётся самому приложению (его внутренним ползункам).
    vbar.addEventListener('wheel', wheelScroll, { passive: false });
    stage.addEventListener('wheel', wheelScroll, { passive: false });

    stage.addEventListener('scroll', () => { updateBar(); markCurrent(); });
    new ResizeObserver(() => { updateSpacer(); updateBar(); }).observe(stage);
    new ResizeObserver(() => updateBar()).observe(vbar);

    // перетаскивание ползунка
    vthumb.addEventListener('pointerdown', (e) => {
      if (vbar.classList.contains('idle')) return;
      e.preventDefault();
      vthumb.setPointerCapture(e.pointerId);
      const startY = e.clientY, startScroll = stage.scrollTop;
      const sh = stage.scrollHeight, ch = stage.clientHeight;
      const room = vbar.clientHeight - 8 - vthumb.offsetHeight;
      document.body.classList.add('dragging');

      const move = (ev) => { stage.scrollTop = startScroll + (ev.clientY - startY) * (sh - ch) / room; };
      const up = () => {
        vthumb.removeEventListener('pointermove', move);
        vthumb.removeEventListener('pointerup', up);
        vthumb.removeEventListener('pointercancel', up);
        document.body.classList.remove('dragging');
      };
      vthumb.addEventListener('pointermove', move);
      vthumb.addEventListener('pointerup', up);
      vthumb.addEventListener('pointercancel', up);
    });

    // клик по дорожке — прокрутка на страницу
    vbar.addEventListener('pointerdown', (e) => {
      if (e.target !== vbar || vbar.classList.contains('idle')) return;
      const thumbTop = vthumb.getBoundingClientRect().top;
      const dir = e.clientY < thumbTop ? -1 : 1;
      stage.scrollBy({ top: dir * stage.clientHeight * 0.9, behavior: 'smooth' });
    });
  }

  // ---------- Сохранение и восстановление ----------
  function save() {
    try {
      const out = [...wins.values()]
        .filter(w => w.meta.persist !== false)
        .map(w => ({ id: w.meta.id, doc: w.meta.docType, data: w.meta.data, height: w.height }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
    } catch (e) { console.warn('Не удалось сохранить состояние рабочего стола', e); }
  }

  function restore() {
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return; }
    saved.forEach(item => {
      if (item.doc) {
        const build = DOC_BUILDERS[item.doc];
        if (build && item.data) createWindow({ ...build(item.data), height: item.height });
      } else {
        const app = APPS.find(a => a.id === item.id);
        if (app) createWindow({ id: app.id, title: app.title, icon: app.icon, src: app.src, height: item.height || app.height, persist: true });
      }
    });
  }

  // ---------- Старт ----------
  function init() {
    buildSidebar();
    bindScrolling();
    document.getElementById('close-all').addEventListener('click', closeAll);
    restore();
    afterLayoutChange(false);
  }

  document.addEventListener('DOMContentLoaded', init);

  return { openApp, openDoc, close, closeAll, focusWindow, isOwnFrame };
})();
