// ============================================================
// Дикая дикая магия
//   Сквозной номер g (как на d1000): 0–899 — таблицы дикой магии (0s … 800s), 900–999 — «100 проклятий».
//   На каждый бросок интерфейс меняет цвет под таблицу, из которой выпал эффект.
// ============================================================

const STORAGE_KEY = 'dnd_wildmagic_state_v1';
const CURSE_TABLE = 9;
const HISTORY_MAX = 20;
const CURSE_REF = /Random Curse/i;      // в тексте эффекта есть отсылка к таблице проклятий

const $ = (id) => document.getElementById(id);
const app = $('app'), stage = $('stage');
const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

let state = { enabled: WM_TABLES.map(() => true), history: [], last: null };
let busy = false;

// ---------- Номера и тексты ----------
const tableOf = (g) => (g >= 900 ? CURSE_TABLE : Math.floor(g / 100));
const indexOf = (g) => (g >= 900 ? g - 900 : g % 100);
const textOf  = (g) => WM_EFFECTS[tableOf(g)][indexOf(g)];
const pad3    = (g) => String(g).padStart(3, '0');

function numberLabel(g) {
  const ti = tableOf(g);
  return ti === CURSE_TABLE ? `Проклятие № ${indexOf(g)}` : `Эффект № ${g}`;
}

// ---------- Случайность ----------
function randomInt(n) {                       // равномерно, без смещения
  const c = window.crypto;
  if (c && c.getRandomValues) {
    const lim = Math.floor(0x100000000 / n) * n;
    const buf = new Uint32Array(1);
    do { c.getRandomValues(buf); } while (buf[0] >= lim);
    return buf[0] % n;
  }
  return Math.floor(Math.random() * n);
}

function poolNumbers(onlyTables) {
  const tables = onlyTables || state.enabled.map((on, i) => (on ? i : -1)).filter(i => i >= 0);
  const out = [];
  tables.forEach(ti => { for (let i = 0; i < 100; i++) out.push(ti === CURSE_TABLE ? 900 + i : ti * 100 + i); });
  return out;
}

// ---------- Тема ----------
function applyTheme(ti, fast) {
  const t = WM_TABLES[ti];
  app.classList.toggle('rolling', !!fast);
  app.dataset.table = t.id;
  app.style.setProperty('--accent', t.color);
  app.style.setProperty('--accent2', t.color2);
}

function setDigits(g, animate) {
  const s = pad3(g);
  [...$('digits').children].forEach((el, i) => {
    el.textContent = s[i];
    if (animate) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
  });
}

// ---------- Показ результата ----------
function showResult(g, opts = {}) {
  const ti = tableOf(g), t = WM_TABLES[ti], text = textOf(g);
  applyTheme(ti, false);
  setDigits(g, false);
  $('reel-table').textContent = `${t.icon} ${t.ru} · ${t.en}`;

  $('card').hidden = false;
  $('card-table').textContent = `${t.icon} ${t.ru}`;
  $('card-num').textContent = numberLabel(g) + (ti === CURSE_TABLE ? ` · на кубах ${pad3(g)}` : '');
  const via = $('card-via');
  via.hidden = !opts.via;
  if (opts.via) via.textContent = `Следствие эффекта № ${opts.via}`;
  const eff = $('card-text');
  eff.textContent = text;
  eff.classList.toggle('long', text.length > 150);
  $('curse-btn').hidden = !CURSE_REF.test(text);

  state.last = g;
  if (opts.push) {
    state.history.unshift(g);
    if (state.history.length > HISTORY_MAX) state.history.length = HISTORY_MAX;
  }
  saveState();
  renderHistory();

  if (opts.celebrate) celebrate(ti);
}

function celebrate(ti) {
  if (reduceMotion) return;
  const card = $('card');
  card.classList.remove('show'); void card.offsetWidth; card.classList.add('show');
  $('digits').classList.remove('land'); void $('digits').offsetWidth; $('digits').classList.add('land');
  const fl = $('flash'); fl.classList.remove('go'); void fl.offsetWidth; fl.classList.add('go');
  stage.classList.remove('shake'); void stage.offsetWidth; stage.classList.add('shake');
  burst(WM_TABLES[ti], ti === CURSE_TABLE ? 90 : 60);
}

// ---------- Бросок ----------
const TICKS = [35, 35, 40, 45, 50, 60, 70, 85, 100, 125, 155, 190, 235, 290];

function roll(opts = {}) {
  if (busy) return;
  const pool = poolNumbers(opts.only);
  if (!pool.length) return;
  busy = true;
  setBusy(true);
  const final = pool[randomInt(pool.length)];

  const done = () => {
    showResult(final, { push: true, celebrate: true, via: opts.via });
    busy = false;
    setBusy(false);
  };
  if (reduceMotion) { done(); return; }

  // «барабан»: числа мелькают, интерфейс перекрашивается под таблицу каждого числа
  let k = 0, prev = -1;
  const tick = () => {
    let g;
    if (k >= TICKS.length) { g = final; } else {
      do { g = pool[randomInt(pool.length)]; } while (g === prev && pool.length > 1);
    }
    prev = g;
    applyTheme(tableOf(g), true);
    setDigits(g, true);
    $('reel-table').textContent = `${WM_TABLES[tableOf(g)].icon} ${WM_TABLES[tableOf(g)].ru}`;
    if (k >= TICKS.length) { setTimeout(done, 140); return; }
    stage.classList.toggle('jitter', k % 2 === 0);
    setTimeout(tick, TICKS[k++]);
  };
  $('card').hidden = true;
  tick();
}

function setBusy(on) {
  $('roll-btn').disabled = on || poolNumbers().length === 0;
  $('curse-btn').disabled = on;
  stage.classList.toggle('busy', on);
  if (!on) { stage.classList.remove('jitter'); app.classList.remove('rolling'); }
}

// ---------- Таблицы (фильтр) ----------
function renderChips() {
  const box = $('chips');
  box.innerHTML = '';
  WM_TABLES.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.style.setProperty('--c', t.color);
    b.setAttribute('aria-pressed', state.enabled[i]);
    b.title = `${t.ru} · ${t.en}`;
    b.innerHTML = '<span class="ic"></span><span class="nm"></span><span class="ct">100</span>';
    b.querySelector('.ic').textContent = t.icon;
    b.querySelector('.nm').textContent = t.ru;
    b.addEventListener('click', () => { state.enabled[i] = !state.enabled[i]; saveState(); updatePool(); renderChips(); });
    box.appendChild(b);
  });
}

function updatePool() {
  const n = poolNumbers().length;
  $('pool-note').textContent = n ? `В пуле: ${n} из 1000 эффектов` : 'Выберите хотя бы одну таблицу';
  $('roll-btn').disabled = busy || n === 0;
}

function setEnabled(fn) {
  state.enabled = WM_TABLES.map((_, i) => fn(i));
  saveState(); updatePool(); renderChips();
}

// ---------- Ручной ввод ----------
function lookup() {
  const input = $('lookup-input'), hint = $('lookup-hint');
  const raw = input.value.trim();
  const g = Number(raw);
  if (raw === '' || !Number.isInteger(g) || g < 0 || g > 999) {
    hint.textContent = 'Нужно целое число от 0 до 999.';
    hint.classList.add('err');
    return;
  }
  hint.classList.remove('err');
  hint.textContent = 'Бросьте d1000 (три d10) и введите число. 0–899 — дикая магия, 900–999 — проклятия.';
  if (busy) return;
  showResult(g, { push: true, celebrate: true });
}

// ---------- История ----------
function renderHistory() {
  const ul = $('history');
  ul.innerHTML = '';
  if (!state.history.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'Пока пусто';
    ul.appendChild(li);
    return;
  }
  state.history.forEach(g => {
    const t = WM_TABLES[tableOf(g)];
    const li = document.createElement('li');
    li.style.setProperty('--c', t.color);
    li.className = g === state.last ? 'cur' : '';
    const head = document.createElement('div');
    head.className = 'h-head';
    head.textContent = `${t.icon} ${tableOf(g) === CURSE_TABLE ? 'Проклятие ' + indexOf(g) : '№ ' + g}`;
    const body = document.createElement('div');
    body.className = 'h-text';
    const txt = textOf(g);
    body.textContent = txt.length > 70 ? txt.slice(0, 68) + '…' : txt;
    li.append(head, body);
    li.addEventListener('click', () => { if (!busy) showResult(g); });
    ul.appendChild(li);
  });
}

// ---------- Копирование ----------
function copyResult() {
  if (state.last == null) return;
  const g = state.last;
  const s = `${numberLabel(g)} (${WM_TABLES[tableOf(g)].en}): ${textOf(g)}`;
  const ok = () => toast('Скопировано');
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = s; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); ok(); } catch (e) { toast('Не удалось'); }
    ta.remove();
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(s).then(ok, fallback); else fallback();
}
let toastTimer = null;
function toast(msg) {
  const el = $('toast');
  el.textContent = msg; el.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('on'), 1400);
}

// ---------- Искры ----------
const canvas = $('sparks'), ctx2d = canvas.getContext ? canvas.getContext('2d') : null;
let sparks = [], sparkRaf = 0;
function fitCanvas() { canvas.width = app.clientWidth; canvas.height = app.clientHeight; }
function burst(t, count) {
  if (!ctx2d) return;
  fitCanvas();
  const r = $('digits').getBoundingClientRect(), a = app.getBoundingClientRect();
  const cx = r.left - a.left + r.width / 2, cy = r.top - a.top + r.height / 2;
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 7;
    sparks.push({ x: cx, y: cy, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 1.5, life: 1, decay: 0.012 + Math.random() * 0.02,
                  size: 1.5 + Math.random() * 3.5, color: Math.random() < 0.5 ? t.color : t.color2 });
  }
  if (!sparkRaf) sparkRaf = requestAnimationFrame(stepSparks);
}
function stepSparks() {
  ctx2d.clearRect(0, 0, canvas.width, canvas.height);
  sparks = sparks.filter(p => p.life > 0);
  sparks.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.09; p.vx *= 0.99; p.life -= p.decay;
    ctx2d.globalAlpha = Math.max(0, p.life);
    ctx2d.fillStyle = p.color;
    ctx2d.beginPath(); ctx2d.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx2d.fill();
  });
  ctx2d.globalAlpha = 1;
  sparkRaf = sparks.length ? requestAnimationFrame(stepSparks) : 0;
  if (!sparks.length) ctx2d.clearRect(0, 0, canvas.width, canvas.height);
}

// ---------- Сохранение ----------
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* хранилище недоступно */ }
}
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!s || typeof s !== 'object') return;
    if (Array.isArray(s.enabled) && s.enabled.length === WM_TABLES.length) state.enabled = s.enabled.map(Boolean);
    const valid = (g) => Number.isInteger(g) && g >= 0 && g <= 999;
    if (Array.isArray(s.history)) state.history = s.history.filter(valid).slice(0, HISTORY_MAX);
    if (valid(s.last)) state.last = s.last;
  } catch (e) { /* повреждённые данные — начинаем заново */ }
}

// ---------- Старт ----------
function init() {
  loadState();
  renderChips();
  updatePool();
  renderHistory();

  $('roll-btn').addEventListener('click', () => roll());
  $('curse-btn').addEventListener('click', () => { if (state.last != null) roll({ only: [CURSE_TABLE], via: state.last }); });
  $('copy-btn').addEventListener('click', copyResult);
  $('all-btn').addEventListener('click', () => setEnabled(() => true));
  $('nocurse-btn').addEventListener('click', () => setEnabled(i => i !== CURSE_TABLE));
  $('onlycurse-btn').addEventListener('click', () => setEnabled(i => i === CURSE_TABLE));
  $('lookup-btn').addEventListener('click', lookup);
  $('lookup-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') lookup(); });
  $('clear-hist').addEventListener('click', () => { state.history = []; saveState(); renderHistory(); });
  window.addEventListener('resize', () => { if (sparks.length) fitCanvas(); });

  if (state.last != null) showResult(state.last); else applyTheme(0, false);
}

init();
