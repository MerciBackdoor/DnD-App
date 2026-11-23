// ============================================================
// Оружейная: таблица оружия и доспехов с фильтрами, сортировкой и карточкой предмета.
// Данные — в armory_data.js. Значения, помеченные «*», взяты из Книги игрока: в загруженных файлах их не было.
// ============================================================

const STORAGE_KEY = 'dnd_armory_state_v1';
const $ = (id) => document.getElementById(id);

const CAT_ORDER   = { 'Простое': 0, 'Воинское': 1, 'Экзотическое': 2 };
const ARMOR_ORDER = { 'Лёгкий': 0, 'Средний': 1, 'Тяжёлый': 2, 'Щит': 3 };

let state = {
  tab: 'weapons',
  dex: 2,
  ref: false,
  q: '',
  sort: { weapons: { key: 'ru', dir: 1 }, armors: { key: 'ru', dir: 1 } },
  filters: {
    weapons: { cat: 'all', kind: 'all', dtype: 'all', props: [], src: 'all' },
    armors:  { type: 'all', src: 'all' }
  },
  selected: { weapons: null, armors: null }
};

// ---------- Вспомогательное ----------
const fmtWeight = (lb) => (lb == null ? '—' : (Number.isInteger(lb) ? lb : String(lb).replace('.', ',')) + ' фнт.');
function diceAvg(d) {                                         // «2к6» → 7, «1» → 1, «—» → 0
  const m = /^(\d+)к(\d+)/.exec(d || '');
  if (m) return +m[1] * (+m[2] + 1) / 2;
  const n = parseFloat(d);
  return Number.isFinite(n) ? n : 0;
}
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const dexMod = () => { const n = Math.round(Number(state.dex)); return Number.isFinite(n) ? Math.max(-5, Math.min(10, n)) : 0; };

function armorAc(a) {
  if (a.ac == null) return null;
  if (a.key === 'shield') return a.ac;
  if (!a.dex) return a.ac;
  return a.ac + (a.dexMax != null ? Math.min(dexMod(), a.dexMax) : dexMod());
}
function armorFormula(a) {
  if (a.ac == null) return '—';
  if (a.key === 'shield') return '+' + a.ac;
  return String(a.ac) + (a.dex ? (a.dexMax != null ? ' + ЛОВ (макс. 2)' : ' + ЛОВ') : '');
}

// ---------- Данные вкладок ----------
const DATA = () => (state.tab === 'weapons' ? ARMORY.weapons : ARMORY.armors);
const sourcesOf = (arr) => {
  const m = new Map();
  arr.forEach(x => { if (!m.has(x.src)) m.set(x.src, { name: x.srcName, n: 0 }); m.get(x.src).n++; });
  return [...m.entries()].sort((a, b) => b[1].n - a[1].n || a[0].localeCompare(b[0]));
};

function matches(item, q) {
  if (!q) return true;
  const hay = [item.ru, item.en, item.src, item.srcName, item.type || '', item.cat || '', item.kind || '', item.dtype || '', ...(item.props || [])].join(' ').toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every(w => hay.includes(w));
}

function filtered() {
  const f = state.filters[state.tab];
  return DATA().filter(x => {
    if (!matches(x, state.q.trim())) return false;
    if (f.src !== 'all' && x.src !== f.src) return false;
    if (state.tab === 'weapons') {
      if (f.cat !== 'all' && x.cat !== f.cat) return false;
      if (f.kind !== 'all' && x.kind !== f.kind) return false;
      if (f.dtype !== 'all' && x.dtype !== f.dtype) return false;
      if (f.props.length && !f.props.every(p => x.props.includes(p))) return false;
    } else if (f.type !== 'all' && x.type !== f.type) return false;
    return true;
  });
}

// ---------- Сортировка ----------
const SORTERS = {
  weapons: {
    ru:   (a, b) => a.ru.localeCompare(b.ru, 'ru'),
    cat:  (a, b) => (CAT_ORDER[a.cat] - CAT_ORDER[b.cat]) || a.kind.localeCompare(b.kind, 'ru'),
    dice: (a, b) => diceAvg(a.dice) - diceAvg(b.dice),
    gp:   (a, b) => (a.gp ?? 1e9) - (b.gp ?? 1e9),
    lb:   (a, b) => (a.lb ?? 1e9) - (b.lb ?? 1e9),
    src:  (a, b) => a.src.localeCompare(b.src)
  },
  armors: {
    ru:      (a, b) => a.ru.localeCompare(b.ru, 'ru'),
    type:    (a, b) => ARMOR_ORDER[a.type] - ARMOR_ORDER[b.type],
    ac:      (a, b) => (armorAc(a) ?? -99) - (armorAc(b) ?? -99),
    str:     (a, b) => (a.str ?? 0) - (b.str ?? 0),
    stealth: (a, b) => (a.stealth ? 1 : 0) - (b.stealth ? 1 : 0),
    gp:      (a, b) => (a.gp ?? 1e9) - (b.gp ?? 1e9),
    lb:      (a, b) => (a.lb ?? 1e9) - (b.lb ?? 1e9),
    src:     (a, b) => a.src.localeCompare(b.src)
  }
};

const COLUMNS = {
  weapons: [['ru', 'Название'], ['cat', 'Тип'], ['dice', 'Урон'], ['props', 'Свойства'], ['gp', 'Цена'], ['lb', 'Вес'], ['src', 'Источник']],
  armors:  [['ru', 'Название'], ['type', 'Тип'], ['ac', 'КД'], ['str', 'Сила'], ['stealth', 'Скрытность'], ['gp', 'Цена'], ['lb', 'Вес'], ['src', 'Источник']]
};

// Значение колонки неизвестно (нет цены, веса или КД) — такие строки всегда внизу, при любом направлении сортировки
const unknownFor = (key, x) => (key === 'ac' ? armorAc(x) == null : (key === 'gp' || key === 'lb') ? x[key] == null : false);

function sortedRows() {
  const s = state.sort[state.tab];
  const cmp = SORTERS[state.tab][s.key] || SORTERS[state.tab].ru;
  const all = filtered();
  const known = all.filter(x => !unknownFor(s.key, x)).sort((a, b) => (cmp(a, b) || a.ru.localeCompare(b.ru, 'ru')) * s.dir);
  const unknown = all.filter(x => unknownFor(s.key, x)).sort((a, b) => a.ru.localeCompare(b.ru, 'ru'));
  return known.concat(unknown);
}

// ---------- Фильтры ----------
function chipGroup(label, options, current, onPick) {
  const box = el('div', 'fgroup');
  box.appendChild(el('span', 'flabel', label));
  options.forEach(([val, text]) => {
    const b = el('button', 'chip', text);
    b.type = 'button';
    b.setAttribute('aria-pressed', current === val);
    b.addEventListener('click', () => { onPick(val); });
    box.appendChild(b);
  });
  return box;
}

function sourceSelect(arr, current, onPick) {
  const box = el('div', 'fgroup');
  box.appendChild(el('span', 'flabel', 'Источник'));
  const sel = el('select');
  const all = el('option', null, 'Все'); all.value = 'all'; sel.appendChild(all);
  sourcesOf(arr).forEach(([code, info]) => {
    const o = el('option', null, `${code} · ${info.name} (${info.n})`); o.value = code; sel.appendChild(o);
  });
  sel.value = current;
  sel.addEventListener('change', () => onPick(sel.value));
  box.appendChild(sel);
  return box;
}

function renderFilters() {
  const box = $('filters');
  box.innerHTML = '';
  const f = state.filters[state.tab];
  const upd = (patch) => { Object.assign(f, patch); saveState(); renderAll(); };

  if (state.tab === 'weapons') {
    box.appendChild(chipGroup('Категория', [['all', 'Все'], ['Простое', 'Простое'], ['Воинское', 'Воинское'], ['Экзотическое', 'Экзотическое']], f.cat, v => upd({ cat: v })));
    box.appendChild(chipGroup('Вид', [['all', 'Все'], ['Рукопашное', '🗡 Рукопашное'], ['Дальнобойное', '🏹 Дальнобойное']], f.kind, v => upd({ kind: v })));
    box.appendChild(chipGroup('Урон', [['all', 'Любой'], ['дробящий', 'Дробящий'], ['колющий', 'Колющий'], ['рубящий', 'Рубящий']], f.dtype, v => upd({ dtype: v })));

    // свойства — несколько сразу (должны быть все выбранные)
    const counts = new Map();
    ARMORY.weapons.forEach(w => w.props.forEach(p => counts.set(p, (counts.get(p) || 0) + 1)));
    const pg = el('div', 'fgroup props');
    pg.appendChild(el('span', 'flabel', 'Свойства'));
    [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ru')).forEach(([p, n]) => {
      const b = el('button', 'chip small', p);
      b.type = 'button';
      b.title = (ARMORY.glossary[p] ? ARMORY.glossary[p] + '\n' : '') + `Таких видов оружия: ${n}`;
      b.setAttribute('aria-pressed', f.props.includes(p));
      b.addEventListener('click', () => upd({ props: f.props.includes(p) ? f.props.filter(x => x !== p) : [...f.props, p] }));
      pg.appendChild(b);
    });
    box.appendChild(pg);
  } else {
    box.appendChild(chipGroup('Тип', [['all', 'Все'], ['Лёгкий', 'Лёгкий'], ['Средний', 'Средний'], ['Тяжёлый', 'Тяжёлый'], ['Щит', 'Щит']], f.type, v => upd({ type: v })));
  }
  box.appendChild(sourceSelect(DATA(), f.src, v => upd({ src: v })));

  const reset = el('button', 'reset', '✕ Сбросить');
  reset.type = 'button';
  reset.addEventListener('click', () => {
    state.q = ''; $('search').value = '';
    state.filters[state.tab] = state.tab === 'weapons' ? { cat: 'all', kind: 'all', dtype: 'all', props: [], src: 'all' } : { type: 'all', src: 'all' };
    saveState(); renderAll();
  });
  box.appendChild(reset);
}

// ---------- Таблица ----------
function propTag(p, w) {
  const t = el('span', 'ptag', p);
  let tip = ARMORY.glossary[p] || '';
  if (p === 'Универсальное' && w.versatile) { t.textContent = `${p} (${w.versatile})`; }
  if ((p === 'Метательное' || p === 'Боеприпас') && w.range) { t.textContent = `${p} (${w.range})`; }
  if (tip) t.title = tip;
  return t;
}

function renderHead() {
  const head = $('thead');
  head.innerHTML = '';
  const tr = el('tr');
  const s = state.sort[state.tab];
  COLUMNS[state.tab].forEach(([key, label]) => {
    const th = el('th', key === 'props' ? 'nosort' : '', label);
    th.dataset.key = key;
    if (key !== 'props') {
      th.addEventListener('click', () => {
        state.sort[state.tab] = { key, dir: s.key === key ? -s.dir : 1 };
        saveState(); renderTable();
      });
      if (s.key === key) th.appendChild(el('span', 'arrow', s.dir === 1 ? ' ▲' : ' ▼'));
    }
    tr.appendChild(th);
  });
  head.appendChild(tr);
}

function srcBadge(x) {
  const b = el('span', 'srcb' + (x.src === 'PHB' ? ' core' : ''), x.src);
  b.title = x.srcName;
  return b;
}

function renderTable() {
  renderHead();
  const body = $('tbody');
  body.innerHTML = '';
  const rows = sortedRows();
  $('none').hidden = rows.length > 0;
  $('table').hidden = rows.length === 0;
  const sel = state.selected[state.tab];

  rows.forEach(x => {
    const tr = el('tr', x.id === sel ? 'sel' : '');
    tr.dataset.id = x.id;
    tr.tabIndex = 0;
    const td = (node, cls) => { const c = el('td', cls); if (typeof node === 'string') c.textContent = node; else c.appendChild(node); tr.appendChild(c); return c; };

    const name = el('div', 'nm'); name.appendChild(el('div', 'ru', x.ru)); name.appendChild(el('div', 'en', x.en));
    td(name, 'c-name');

    if (state.tab === 'weapons') {
      td(`${x.kind === 'Дальнобойное' ? '🏹' : '🗡'} ${x.cat}`, 'c-type');
      const d = el('div', 'dmg'); d.appendChild(el('b', null, x.dice)); d.appendChild(el('span', 'dt', x.dtype));
      td(d, 'c-dmg');
      const pc = el('div', 'ptags'); x.props.forEach(p => pc.appendChild(propTag(p, x))); if (!x.props.length) pc.textContent = '—';
      td(pc, 'c-props');
    } else {
      td(x.type, 'c-type');
      const ac = armorAc(x);
      const acc = el('div', 'acell');
      acc.appendChild(el('b', null, ac == null ? '—' : (x.key === 'shield' ? '+' + ac : String(ac))));
      acc.appendChild(el('span', 'af', armorFormula(x)));
      td(acc, 'c-ac');
      td(x.ac == null ? '?' : (x.str ? String(x.str) : '—'), 'c-str');
      td(x.ac == null ? '?' : (x.stealth ? 'Помеха' : '—'), x.stealth ? 'c-stealth bad' : 'c-stealth');
    }
    td(x.cost, 'c-cost');
    td(fmtWeight(x.lb), 'c-wt');
    td(srcBadge(x), 'c-src');

    tr.addEventListener('click', () => select(x.id));
    body.appendChild(tr);
  });

  $('status').textContent = `Показано: ${rows.length} из ${DATA().length}`;
}

function select(id) {
  state.selected[state.tab] = id;
  state.ref = false;
  saveState();
  document.querySelectorAll('#tbody tr').forEach(tr => tr.classList.toggle('sel', tr.dataset.id === id));
  renderDetail();
  const row = document.querySelector(`#tbody tr[data-id="${id}"]`);
  if (row && row.scrollIntoView) row.scrollIntoView({ block: 'nearest' });
}

// ---------- Карточка ----------
const SUP_TIP = 'Значение по Книге игрока: в загруженных файлах его нет';
const supMark = () => { const s = el('sup', 'sup', '*'); s.title = SUP_TIP; return s; };

function statBox(label, value, sup) {
  const b = el('div', 'stat');
  b.appendChild(el('div', 'sl', label));
  const v = el('div', 'sv');
  if (value instanceof Node) v.appendChild(value); else v.textContent = value;
  if (sup) v.appendChild(supMark());
  b.appendChild(v);
  return b;
}

function section(title, nodes) {
  const s = el('section', 'dsec');
  s.appendChild(el('h3', null, title));
  nodes.forEach(n => s.appendChild(n));
  return s;
}
const paras = (arr) => arr.map(t => el('p', null, t));

function renderWeaponDetail(w, box) {
  const stats = el('div', 'stats');
  const dmg = el('span'); dmg.appendChild(el('b', null, w.dice)); dmg.appendChild(document.createTextNode(' ' + w.dtype));
  stats.appendChild(statBox('Урон', dmg));
  if (w.versatile) stats.appendChild(statBox('Двумя руками', w.versatile + ' ' + w.dtype, true));
  if (w.range) stats.appendChild(statBox('Дистанция', w.range + ' фт.', true));
  stats.appendChild(statBox('Цена', w.cost));
  stats.appendChild(statBox('Вес', fmtWeight(w.lb)));
  box.appendChild(stats);

  if (w.props.length) {
    const ul = el('ul', 'plist');
    w.props.forEach(p => {
      const li = el('li');
      const name = el('b', null, p);
      li.appendChild(name);
      if (p === 'Универсальное' && w.versatile) { li.appendChild(document.createTextNode(` (${w.versatile})`)); li.appendChild(supMark()); }
      if ((p === 'Метательное' || p === 'Боеприпас') && w.range) { li.appendChild(document.createTextNode(` (дистанция ${w.range})`)); li.appendChild(supMark()); }
      if (ARMORY.glossary[p]) li.appendChild(el('div', 'pd', ARMORY.glossary[p]));
      ul.appendChild(li);
    });
    box.appendChild(section('Свойства', [ul]));
  }
  if (w.special.length) box.appendChild(section('Особые свойства', paras(w.special)));
  if (w.desc.length) box.appendChild(section('Описание', paras(w.desc)));
  if (w.sup) box.appendChild(el('div', 'foot', '* Значения по Книге игрока: в загруженных файлах дальности и урона «двумя руками» не было.'));
}

function renderArmorDetail(a, box) {
  const rules = ARMORY.armorRules[a.type];
  const stats = el('div', 'stats');
  const ac = armorAc(a);
  stats.appendChild(statBox('КД', ac == null ? '—' : (a.key === 'shield' ? '+' + ac : String(ac)), a.sup && ac != null));
  if (a.ac != null) stats.appendChild(statBox('Формула', armorFormula(a), a.sup));
  stats.appendChild(statBox('Сила', a.ac == null ? '?' : (a.str ? String(a.str) : '—'), a.sup && a.ac != null));
  stats.appendChild(statBox('Скрытность', a.ac == null ? '?' : (a.stealth ? 'Помеха' : '—'), a.sup && a.ac != null));
  stats.appendChild(statBox('Цена', a.cost));
  stats.appendChild(statBox('Вес', fmtWeight(a.lb)));
  box.appendChild(stats);

  if (a.ac == null) {
    box.appendChild(el('div', 'warn', 'КД, требование к Силе и помеха на Скрытность для этого предмета в загруженном файле не указаны. Смотрите описание ниже или книгу-источник.'));
  } else if (a.key !== 'shield') {
    const base = a.dex ? armorAc(a) : a.ac;
    const calc = el('div', 'calc');
    calc.appendChild(el('div', 'sl', `КД при ЛОВ ${dexMod() >= 0 ? '+' : ''}${dexMod()}`));
    const line = el('div', 'cl');
    line.appendChild(el('b', null, String(base))); line.appendChild(document.createTextNode(' без щита · '));
    line.appendChild(el('b', null, String(base + 2))); line.appendChild(document.createTextNode(' со щитом (+2)'));
    calc.appendChild(line);
    box.appendChild(calc);
  }

  const dl = el('ul', 'plist');
  [['Надевание', rules.don], ['Снятие', rules.doff], ['Ловкость', rules.dex]].forEach(([k, v]) => {
    const li = el('li'); li.appendChild(el('b', null, k + ': ')); li.appendChild(document.createTextNode(v)); dl.appendChild(li);
  });
  box.appendChild(section('Как носить', [dl]));
  if (a.desc.length) box.appendChild(section('Описание', paras(a.desc)));
  if (a.sup) box.appendChild(el('div', 'foot', '* КД, требование к Силе и помеха на Скрытность — по Книге игрока (и Путеводителю по Побережью Меча для шипованного доспеха): в загруженном файле этих значений не было.'));
}

function renderReference(box) {
  if (state.tab === 'weapons') {
    box.appendChild(el('h2', null, 'Свойства оружия'));
    box.appendChild(el('div', 'en', 'Книга игрока'));
    const ul = el('ul', 'plist');
    Object.entries(ARMORY.glossary).forEach(([k, v]) => { const li = el('li'); li.appendChild(el('b', null, k)); li.appendChild(el('div', 'pd', v)); ul.appendChild(li); });
    box.appendChild(ul);
    box.appendChild(el('div', 'foot', 'Свойства из дополнительных книг (Двойное оружие, Пороховое, Скрытое, Очередь, Магазин и др.) в справку не вошли: их правила описаны в источнике оружия.'));
  } else {
    box.appendChild(el('h2', null, 'Правила ношения доспехов'));
    box.appendChild(el('div', 'en', 'Книга игрока'));
    const t = el('table', 'rtable');
    const head = el('tr'); ['Тип', 'Надеть', 'Снять', 'Ловкость'].forEach(h => head.appendChild(el('th', null, h))); t.appendChild(head);
    Object.entries(ARMORY.armorRules).forEach(([k, r]) => {
      const tr = el('tr'); [k, r.don, r.doff, r.dex].forEach(v => tr.appendChild(el('td', null, v))); t.appendChild(tr);
    });
    box.appendChild(t);
    box.appendChild(section('Требования и штрафы', [
      el('p', null, 'Если у доспеха указано требование к Силе, а ваша Сила ниже, ваша скорость снижается на 10 футов.'),
      el('p', null, 'Помеха на Скрытность: проверки Ловкости (Скрытность) совершаются с помехой.'),
      el('p', null, 'Ношение доспеха, которым вы не владеете, даёт помеху на все проверки, броски атаки и спасброски, использующие Силу или Ловкость, и запрещает накладывать заклинания.')
    ]));
  }
}

function renderDetail() {
  const box = $('detail');
  box.innerHTML = '';
  const id = state.selected[state.tab];
  const item = id && DATA().find(x => x.id === id);
  $('ref-btn').classList.toggle('on', state.ref);

  if (state.ref || !item) {
    if (!state.ref && !item) box.appendChild(el('div', 'hintline', 'Выберите предмет в таблице, чтобы увидеть его карточку. Ниже — справка.'));
    renderReference(box);
    return;
  }
  const head = el('div', 'dhead');
  head.appendChild(el('h2', null, item.ru));
  head.appendChild(el('div', 'en', item.en));
  const badges = el('div', 'badges');
  const sb = srcBadge(item); sb.textContent = item.src + ' · ' + item.srcName; badges.appendChild(sb);
  if (state.tab === 'weapons') { badges.appendChild(el('span', 'tagb', item.cat)); badges.appendChild(el('span', 'tagb', item.kind)); }
  else badges.appendChild(el('span', 'tagb', item.type));
  head.appendChild(badges);
  box.appendChild(head);
  if (state.tab === 'weapons') renderWeaponDetail(item, box); else renderArmorDetail(item, box);
}

// ---------- Общее ----------
function renderTabs() {
  document.querySelectorAll('#tabs .tab').forEach(b => b.setAttribute('aria-pressed', b.dataset.tab === state.tab));
  $('cnt-weapons').textContent = ARMORY.weapons.length;
  $('cnt-armors').textContent = ARMORY.armors.length;
  $('dex-box').hidden = state.tab !== 'armors';
}

function renderAll() {
  renderTabs(); renderFilters(); renderTable(); renderDetail();
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* хранилище недоступно */ }
}
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!s || typeof s !== 'object') return;
    if (s.tab === 'weapons' || s.tab === 'armors') state.tab = s.tab;
    if (Number.isFinite(s.dex)) state.dex = s.dex;
    if (typeof s.q === 'string') state.q = s.q;
    ['weapons', 'armors'].forEach(t => {
      if (s.sort && s.sort[t] && SORTERS[t][s.sort[t].key] && (s.sort[t].dir === 1 || s.sort[t].dir === -1)) state.sort[t] = s.sort[t];
      if (s.filters && s.filters[t]) Object.keys(state.filters[t]).forEach(k => { if (k in s.filters[t]) state.filters[t][k] = s.filters[t][k]; });
      if (s.selected && typeof s.selected[t] === 'string' && (t === 'weapons' ? ARMORY.weapons : ARMORY.armors).some(x => x.id === s.selected[t])) state.selected[t] = s.selected[t];
    });
    if (!Array.isArray(state.filters.weapons.props)) state.filters.weapons.props = [];
  } catch (e) { /* повреждённые данные — начинаем заново */ }
}

function init() {
  loadState();
  $('search').value = state.q;
  $('dex-input').value = state.dex;

  document.querySelectorAll('#tabs .tab').forEach(b => b.addEventListener('click', () => {
    state.tab = b.dataset.tab; state.ref = false; saveState(); renderAll();
  }));
  $('search').addEventListener('input', (e) => { state.q = e.target.value; saveState(); renderTable(); });
  $('dex-input').addEventListener('input', (e) => {
    if (e.target.value === '' || e.target.value === '-') return;
    state.dex = Number(e.target.value); saveState(); renderTable(); renderDetail();
  });
  $('dex-input').addEventListener('change', () => { state.dex = dexMod(); $('dex-input').value = state.dex; saveState(); renderTable(); renderDetail(); });
  $('ref-btn').addEventListener('click', () => { state.ref = !state.ref; renderDetail(); });

  // стрелки ↑/↓ в таблице переключают выбранный предмет
  $('table-wrap').addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const rows = [...document.querySelectorAll('#tbody tr')];
    if (!rows.length) return;
    e.preventDefault();
    const cur = rows.findIndex(r => r.dataset.id === state.selected[state.tab]);
    const next = rows[Math.max(0, Math.min(rows.length - 1, cur + (e.key === 'ArrowDown' ? 1 : -1)))];
    select(next.dataset.id); next.focus();
  });

  renderAll();
}

init();
