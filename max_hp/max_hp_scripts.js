// ============================================================
// Подсчёт максимума хитов
//   1 уровень:   максимум кости хитов + модификатор ТЕЛ
//   дальше:      бросок кости (или среднее) + модификатор ТЕЛ за каждый уровень
//   «Крепкий»:   +2 ХП за каждый уровень
//   За уровень персонаж получает не меньше 1 хита.
// ============================================================

const CLASSES = [
  { id: 'barbarian', name: 'Варвар',       die: 12 },
  { id: 'bard',      name: 'Бард',         die: 8  },
  { id: 'wizard',    name: 'Волшебник',    die: 6  },
  { id: 'fighter',   name: 'Воин',         die: 10 },
  { id: 'druid',     name: 'Друид',        die: 8  },
  { id: 'cleric',    name: 'Жрец',         die: 8  },
  { id: 'artificer', name: 'Изобретатель', die: 8  },
  { id: 'warlock',   name: 'Колдун',       die: 8  },
  { id: 'monk',      name: 'Монах',        die: 8  },
  { id: 'paladin',   name: 'Паладин',      die: 10 },
  { id: 'rogue',     name: 'Плут',         die: 8  },
  { id: 'ranger',    name: 'Следопыт',     die: 10 },
  { id: 'sorcerer',  name: 'Чародей',      die: 6  }
];
const CUSTOM = 'custom';

const STORAGE_KEY = 'dnd_maxhp_state_v1';
const MAX_LEVEL = 20;

const $ = (id) => document.getElementById(id);

let state = {
  classId: 'fighter',
  die: 10,
  level: 1,
  con: 10,
  tough: false,
  mode: 'average',   // 'average' | 'roll'
  rolls: [],         // броски кости за уровни 2..N (rolls[0] — 2-й уровень)
  rollDie: 10        // какая кость была брошена (при смене кости броски недействительны)
};

// ---------- Вспомогательное ----------
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const fmtMod = (m) => (m >= 0 ? '+' + m : String(m));
const avgOf = (die) => Math.floor(die / 2) + 1;          // фиксированное среднее: d8 → 5, d10 → 6, d12 → 7
const rollDie = (die) => Math.floor(Math.random() * die) + 1;

// Значения из полей: пустое или кривое поле не ломает расчёт
function cleanDie()   { const n = Math.round(Number(state.die));   return Number.isFinite(n) ? clamp(n, 2, 100) : 8; }
function cleanLevel() { const n = Math.round(Number(state.level)); return Number.isFinite(n) ? clamp(n, 1, MAX_LEVEL) : 1; }
function cleanCon()   { const n = Math.round(Number(state.con));   return Number.isFinite(n) ? clamp(n, 1, 30) : 10; }
function conMod()     { return Math.floor((cleanCon() - 10) / 2); }

// ---------- Броски ----------
// Недостающие броски добавляются (как при реальном повышении уровня), лишние отбрасываются.
// Если кость изменилась — прежние броски недействительны.
function ensureRolls() {
  const die = cleanDie();
  const before = JSON.stringify([state.rolls, state.rollDie]);
  if (state.rollDie !== die) { state.rolls = []; state.rollDie = die; }
  const need = cleanLevel() - 1;
  while (state.rolls.length < need) state.rolls.push(rollDie(die));
  if (state.rolls.length > need) state.rolls.length = need;
  return before !== JSON.stringify([state.rolls, state.rollDie]);   // изменились ли броски
}

function rerollAll() {
  state.rolls = [];
  state.rollDie = cleanDie();
  ensureRolls();
  saveState();
  render();
}

// ---------- Расчёт ----------
function compute() {
  const die = cleanDie(), level = cleanLevel(), mod = conMod();
  const toughPer = state.tough ? 2 : 0;
  const useRolls = state.mode === 'roll';

  const rows = [];
  let total = 0, minTotal = 0, maxTotal = 0, avgTotal = 0;

  for (let lv = 1; lv <= level; lv++) {
    let base, kind;
    if (lv === 1)        { base = die;                                         kind = 'max'; }
    else if (useRolls)   { base = state.rolls[lv - 2] ?? avgOf(die);           kind = 'roll'; }
    else                 { base = avgOf(die);                                  kind = 'avg'; }

    const raw = base + mod;
    const dieGain = Math.max(1, raw);              // минимум 1 хит за уровень
    const gain = dieGain + toughPer;
    total += gain;

    rows.push({ level: lv, kind, base, mod, dieGain, tough: toughPer, gain, total, minApplied: raw < 1 });

    // границы и среднее для сравнения
    const lo = lv === 1 ? die : 1, hi = die, av = lv === 1 ? die : avgOf(die);
    minTotal += Math.max(1, lo + mod) + toughPer;
    maxTotal += Math.max(1, hi + mod) + toughPer;
    avgTotal += Math.max(1, av + mod) + toughPer;
  }
  return { die, level, mod, toughPer, rows, total, minTotal, maxTotal, avgTotal };
}

// ---------- Отрисовка ----------
function render() {
  if (state.mode === 'roll' && ensureRolls()) saveState();   // новые броски сразу сохраняем, чтобы они не менялись при перезагрузке
  const r = compute();

  // поля
  $('con-mod').textContent = fmtMod(r.mod);
  $('die-hint').textContent = state.classId === CUSTOM ? 'своя кость' : '';
  $('mode-hint').textContent = state.mode === 'average'
    ? `Каждый уровень после первого: среднее d${r.die} = ${avgOf(r.die)}.`
    : `Каждый уровень после первого: бросок d${r.die}. Броски сохраняются, при росте уровня докидываются новые.`;
  document.querySelectorAll('#mode-seg button').forEach(b => {
    const on = b.dataset.mode === state.mode;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
  });
  $('reroll-btn').hidden = state.mode !== 'roll' || r.level < 2;

  // итог
  $('total-hp').textContent = r.total;
  const mods = `ТЕЛ ${cleanCon()} (${fmtMod(r.mod)})`;
  $('total-sub').textContent = `${r.level} ур. · d${r.die} · ${mods}` + (state.tough ? ' · Крепкий' : '');

  // разбор
  const bd = $('breakdown');
  bd.innerHTML = '';
  const li = (label, value) => {
    const el = document.createElement('li');
    const l = document.createElement('span'); l.textContent = label;
    const v = document.createElement('b');    v.textContent = value;
    el.append(l, v);
    bd.appendChild(el);
  };

  const first = r.rows[0];
  li(`1 уровень: максимум d${r.die} (${r.die}) ${fmtMod(r.mod)}`, first.dieGain);
  if (r.level > 1) {
    const rest = r.rows.slice(1);
    const sum = rest.reduce((s, x) => s + x.dieGain, 0);
    const label = state.mode === 'average'
      ? `Уровни 2–${r.level}: ${rest.length} × (среднее ${avgOf(r.die)} ${fmtMod(r.mod)})`
      : `Уровни 2–${r.level}: броски [${rest.map(x => x.base).join(', ')}] ${fmtMod(r.mod)} за уровень`;
    li(label, sum);
  }
  if (state.tough) li(`Крепкий: 2 × ${r.level} ур.`, '+' + r.toughPer * r.level);
  const total = document.createElement('li');
  total.className = 'total';
  total.innerHTML = '<span>Итого</span><b></b>';
  total.querySelector('b').textContent = r.total;
  bd.appendChild(total);

  // сравнение и пометки
  const notes = [];
  if (state.mode === 'roll') {
    const diff = r.total - r.avgTotal;
    notes.push(`По среднему было бы ${r.avgTotal} (${diff === 0 ? 'ровно столько' : (diff > 0 ? '+' : '') + diff + ' от среднего'}).`);
  }
  notes.push(`Диапазон при броске костей: ${r.minTotal}–${r.maxTotal}` + (state.mode === 'average' ? `, среднее ${r.avgTotal}` : '') + '.');
  if (r.rows.some(x => x.minApplied)) notes.push('За некоторые уровни применён минимум в 1 хит.');
  $('range-note').textContent = notes.join(' ');

  // таблица по уровням
  const head = $('levels-head');
  head.innerHTML = '';
  const cols = ['Ур.', state.mode === 'roll' ? 'Кость' : 'Кость хитов', 'ТЕЛ'];
  if (state.tough) cols.push('Крепкий');
  cols.push('Прирост', 'Всего');
  const tr = document.createElement('tr');
  cols.forEach(c => { const th = document.createElement('th'); th.textContent = c; tr.appendChild(th); });
  head.appendChild(tr);

  const body = $('levels-body');
  body.innerHTML = '';
  r.rows.forEach(row => {
    const t = document.createElement('tr');
    const cell = (txt, cls) => { const td = document.createElement('td'); td.textContent = txt; if (cls) td.className = cls; t.appendChild(td); };
    cell(row.level);

    let dieTxt = String(row.base), dieCls = '';
    if (row.kind === 'max') { dieTxt = `${row.base} (макс.)`; dieCls = 'die-max'; }
    else if (row.kind === 'avg') { dieTxt = `${row.base} (ср.)`; }
    else if (row.base === 1) dieCls = 'die-low';
    else if (row.base === r.die) dieCls = 'die-high';
    cell(dieTxt, dieCls);

    cell(fmtMod(row.mod));
    if (state.tough) cell('+' + row.tough);
    cell((row.minApplied ? '≥ ' : '') + row.gain, 'gain');
    cell(row.total, 'cum');
    body.appendChild(t);
  });
}

// ---------- Сохранение ----------
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* хранилище недоступно */ }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === 'object') {
      state = { ...state, ...saved, rolls: Array.isArray(saved.rolls) ? saved.rolls.filter(Number.isFinite) : [] };
      if (state.classId !== CUSTOM && !CLASSES.some(c => c.id === state.classId)) state.classId = CUSTOM;
      if (state.mode !== 'roll') state.mode = 'average';
    }
  } catch (e) { /* повреждённые данные — начинаем с нуля */ }
}

// ---------- Поля ----------
function fillClasses() {
  const sel = $('class-select');
  sel.innerHTML = '';
  CLASSES.forEach(c => {
    const o = document.createElement('option');
    o.value = c.id;
    o.textContent = `${c.name} (d${c.die})`;
    sel.appendChild(o);
  });
  const o = document.createElement('option');
  o.value = CUSTOM;
  o.textContent = 'Другой (своя кость хитов)';
  sel.appendChild(o);
}

function syncInputs() {
  $('class-select').value = state.classId;
  $('die-input').value = state.die;
  $('level-input').value = state.level;
  $('con-input').value = state.con;
  $('tough-check').checked = !!state.tough;
}

function bind() {
  $('class-select').addEventListener('change', (e) => {
    state.classId = e.target.value;
    const c = CLASSES.find(x => x.id === state.classId);
    if (c) { state.die = c.die; $('die-input').value = c.die; }   // для «Другого» кость остаётся как была
    saveState(); render();
  });

  // Ручная кость: если не совпадает с кубом выбранного класса — класс становится «Другим»
  $('die-input').addEventListener('input', (e) => {
    state.die = e.target.value === '' ? state.die : Number(e.target.value);
    const c = CLASSES.find(x => x.id === state.classId);
    if (!c || c.die !== cleanDie()) {
      state.classId = CUSTOM;
      $('class-select').value = CUSTOM;
    }
    saveState(); render();
  });

  $('level-input').addEventListener('input', (e) => {
    if (e.target.value === '') return;
    state.level = Number(e.target.value);
    saveState(); render();
  });
  $('con-input').addEventListener('input', (e) => {
    if (e.target.value === '') return;
    state.con = Number(e.target.value);
    saveState(); render();
  });
  // при уходе из поля возвращаем в допустимые рамки
  const normalize = () => {
    state.die = cleanDie(); state.level = cleanLevel(); state.con = cleanCon();
    syncInputs(); saveState(); render();
  };
  ['die-input', 'level-input', 'con-input'].forEach(id => $(id).addEventListener('change', normalize));

  $('tough-check').addEventListener('change', (e) => { state.tough = e.target.checked; saveState(); render(); });

  document.querySelectorAll('#mode-seg button').forEach(b => {
    b.addEventListener('click', () => { state.mode = b.dataset.mode; saveState(); render(); });
  });
  $('reroll-btn').addEventListener('click', rerollAll);
}

fillClasses();
loadState();
syncInputs();
bind();
render();
saveState();
