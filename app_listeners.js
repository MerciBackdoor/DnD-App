// ============================================================
// Сообщения от мини-приложений (postMessage) и «документные» окна.
// Чтобы научить оболочку новому сообщению — добавь ключ в APP_HANDLERS.
// Чтобы окно с таким документом переживало перезагрузку — добавь сборщик в DOC_BUILDERS.
// ============================================================

function escHtml(v) {
  return String(v ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

// ---------- Карточка персонажа (из «Характеристик») ----------
function buildCharacterCardHtml(c) {
  const abilities = [['STR', 'Сила'], ['DEX', 'Ловкость'], ['CON', 'Телосложение'], ['INT', 'Интеллект'], ['WIS', 'Мудрость'], ['CHA', 'Харизма']];
  const mods = abilities.map(([k, n]) => `
    <div class="mod"><span class="mk">${k}</span><span class="mv">${escHtml(c.modifiers?.[k])}</span><span class="mn">${n}</span></div>`).join('');

  const skills = (c.skills || []).map(s => `
    <li class="s${s.state}"><i></i><b>${escHtml(s.val)}</b><span>${escHtml(s.name)}</span></li>`).join('');

  const hasMagic = c.spellBase && c.spellBase !== 'NONE';
  const magic = hasMagic ? `
    <div class="badge"><label>Сложность (DC)</label><div>${escHtml(c.spellDC)}</div></div>
    <div class="badge"><label>Бонус атаки</label><div>${escHtml(c.spellAttack)}</div></div>
    <div class="badge"><label>Заклинательная</label><div>${escHtml(c.spellBase)}</div></div>` : '';

  const sub = [c.race, c.class + (c.subclass ? ` (${c.subclass})` : '')].filter(Boolean).map(escHtml).join(' · ');

  return `<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<style>
  :root { --bg:#0a0b0d; --panel:#12141a; --surface:#1c1f28; --border:#2a2e3a; --accent:#c0392b; --gold:#c9a84c; --text:#d4c9b0; --dim:#9e9e9d; }
  * { box-sizing:border-box; margin:0; padding:0; }
  html,body { background:var(--bg); color:var(--text); font-family:'Cormorant Garamond',Georgia,serif; font-size:17px; }
  body { padding:14px; }
  * { scrollbar-width:thin; scrollbar-color:var(--border) transparent; }
  .head { display:flex; align-items:flex-end; justify-content:space-between; gap:12px; border-bottom:1px solid var(--border); padding-bottom:10px; margin-bottom:12px; }
  h1 { font-family:'Cinzel',serif; color:var(--gold); font-size:1.5rem; letter-spacing:1px; }
  .sub { font-style:italic; color:var(--dim); margin-top:2px; }
  .lvl { font-family:'Cinzel',serif; color:#fff; }
  .badges { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px; }
  .badge { background:var(--surface); border:1px solid rgba(201,168,76,.25); border-radius:4px; padding:4px 12px; text-align:center; min-width:96px; }
  .badge label { display:block; font-family:'Cinzel',serif; font-size:.62rem; color:var(--dim); letter-spacing:.5px; }
  .badge div { font-family:'Cinzel',serif; font-weight:700; font-size:1.2rem; color:var(--gold); }
  .mods { display:grid; grid-template-columns:repeat(6,1fr); gap:8px; margin-bottom:14px; }
  .mod { background:var(--surface); border:1px solid var(--border); border-radius:4px; padding:6px 4px; text-align:center; }
  .mk { display:block; font-family:'Cinzel',serif; font-size:.7rem; color:var(--gold); }
  .mv { display:block; font-family:'Cinzel',serif; font-weight:700; font-size:1.35rem; color:#fff; }
  .mn { display:block; font-size:.8rem; color:var(--dim); }
  ul { list-style:none; columns:3; column-gap:16px; }
  li { display:flex; align-items:center; gap:7px; padding:2px 0; break-inside:avoid; color:var(--dim); font-size:.95rem; }
  li i { width:11px; height:11px; border-radius:50%; border:1px solid var(--border); background:rgba(0,0,0,.3); flex-shrink:0; }
  li.s1 i { background:var(--gold); border-color:var(--gold); box-shadow:0 0 4px rgba(201,168,76,.4); }
  li.s2 i { background:var(--accent); border-color:var(--gold); box-shadow:0 0 6px var(--accent); }
  li b { font-family:'Cinzel',serif; font-size:.82rem; color:#fff; min-width:26px; text-align:right; }
  li.s1 span, li.s2 span { color:var(--text); }
  @media (max-width:900px) { ul { columns:2; } }
  @media (max-width:600px) { ul { columns:1; } .mods { grid-template-columns:repeat(3,1fr); } }
</style></head><body>
  <div class="head">
    <div><h1>${escHtml(c.name)}</h1><div class="sub">${sub}</div></div>
    <div class="lvl">Уровень ${escHtml(c.level)}</div>
  </div>
  <div class="badges">
    <div class="badge"><label>Бон. владения</label><div>${escHtml(c.profBonus)}</div></div>
    <div class="badge"><label>Пасс. внимательность</label><div>${escHtml(c.passivePerception)}</div></div>
    ${magic}
  </div>
  <div class="mods">${mods}</div>
  <ul>${skills}</ul>
</body></html>`;
}

// ---------- Стикер (из «Быстрых заметок») ----------
const STICKY_COLORS = { yellow: '#fef08a', amber: '#fed7aa', green: '#bbf7d0', blue: '#bae6fd', pink: '#fbcfe8', purple: '#ddd6fe' };

function buildStickyHtml(n) {
  const bg = STICKY_COLORS[n.color] || STICKY_COLORS.yellow;
  return `<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<style>
  * { box-sizing:border-box; margin:0; padding:0; scrollbar-width:thin; scrollbar-color:rgba(0,0,0,.3) transparent; }
  html,body { height:100%; background:${bg}; color:#2a2a2a; font-family:'Cormorant Garamond',Georgia,serif; }
  body { padding:16px 20px; overflow:auto; }
  h1 { font-family:'Cinzel',serif; font-size:1.05rem; font-weight:600; letter-spacing:1px; margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid rgba(0,0,0,.18); }
  p { font-size:1.25rem; line-height:1.45; white-space:pre-wrap; word-break:break-word; }
</style></head><body>
  ${n.title ? `<h1>${escHtml(n.title)}</h1>` : ''}
  <p>${escHtml(n.content)}</p>
</body></html>`;
}

// ---------- Карточка ловушки (из «Конструктора ловушек») ----------
const TRAP_DOC_CSS = `
  :root { --bg:#0a0b0d; --panel:#12141a; --surface:#1c1f28; --border:#2a2e3a; --accent:#c0392b; --gold:#c9a84c; --text:#d4c9b0; --dim:#9e9e9d; }
  * { box-sizing:border-box; margin:0; padding:0; scrollbar-width:thin; scrollbar-color:var(--border) transparent; }
  html,body { background:var(--bg); color:var(--text); font-family:'Cormorant Garamond',Georgia,serif; font-size:17px; }
  body { padding:14px; }
  h1 { font-family:'Cinzel',serif; color:var(--gold); font-size:1.35rem; letter-spacing:1px; border-bottom:1px solid var(--border); padding-bottom:8px; margin-bottom:12px; }
`;
const FONTS_LINK = '<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">';

function buildTrapCardHtml(t) {
  const stat = (label, val) => `<div class="st"><label>${label}</label><div>${escHtml(val)}</div></div>`;
  return `<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8">${FONTS_LINK}<style>${TRAP_DOC_CSS}
  .stats { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px; }
  .st { background:var(--surface); border:1px solid rgba(201,168,76,.25); border-radius:4px; padding:4px 12px; text-align:center; min-width:96px; }
  .st label { display:block; font-family:'Cinzel',serif; font-size:.62rem; color:var(--dim); letter-spacing:.5px; }
  .st div { font-family:'Cinzel',serif; font-weight:700; font-size:1.05rem; color:var(--gold); }
  .st.wide div { font-size:.95rem; }
  .row { margin-bottom:8px; line-height:1.4; }
  .row b { font-family:'Cinzel',serif; font-size:.75rem; color:var(--dim); margin-right:6px; font-weight:600; }
</style></head><body>
  <h1>${escHtml(t.name)}</h1>
  <div class="stats">
    ${stat('Обнаружение (СЛ)', t.detectDC)}
    ${stat('Обезвреживание (СЛ)', String(t.disableDC).split(' ')[0])}
    ${stat('КД', t.ac)}
    ${stat('ХП', String(t.hp).split(' ')[0])}
    ${stat('Урон', t.damage)}
  </div>
  <div class="stats"><div class="st wide"><label>Срабатывание</label><div>${escHtml(t.combatStat)}</div></div></div>
  <div class="row"><b>Триггер:</b>${escHtml(t.trigger)}</div>
  <div class="row"><b>Эффект:</b>${escHtml(t.effect)}</div>
  <div class="row"><b>Обезвреживание:</b>${escHtml(t.disableDC)}</div>
  <div class="row"><b>ХП:</b>${escHtml(t.hp)}</div>
</body></html>`;
}

// ---------- Справочник ловушек (кнопка 📖 в «Конструкторе ловушек») ----------
function buildTrapRefHtml(traps) {
  const cards = (traps || []).map(t => `
    <div class="tc">
      <h3>${escHtml(t.icon || '')} ${escHtml(t.name)}</h3>
      <div class="meta">${escHtml(t.type)} · ${escHtml(t.danger)}</div>
      <div class="row"><b>Триггер:</b>${escHtml(t.trigger)}</div>
      <div class="row"><b>Эффект:</b>${escHtml(t.effect)}</div>
      <div class="row"><b>Обнаружение:</b>${escHtml(t.detect)}</div>
      <div class="row"><b>Обезвреживание:</b>${escHtml(t.disable)}</div>
      ${t.note ? `<div class="row"><b>Примечание:</b>${escHtml(t.note)}</div>` : ''}
    </div>`).join('');
  return `<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8">${FONTS_LINK}<style>${TRAP_DOC_CSS}
  .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(340px, 1fr)); gap:12px; }
  .tc { background:var(--surface); border:1px solid var(--border); border-left:3px solid var(--gold); border-radius:5px; padding:12px 14px; }
  .tc h3 { font-family:'Cinzel',serif; color:var(--gold); font-size:.95rem; font-weight:600; letter-spacing:.5px; }
  .meta { font-style:italic; color:var(--dim); font-size:.9rem; margin:2px 0 8px; }
  .row { margin-bottom:6px; line-height:1.35; font-size:.98rem; }
  .row b { font-family:'Cinzel',serif; font-size:.68rem; color:var(--dim); margin-right:6px; font-weight:600; }
</style></head><body>
  <h1>Справочник ловушек</h1>
  <div class="grid">${cards}</div>
</body></html>`;
}

// ---------- Сборщики документных окон (id → описание окна) ----------
const DOC_BUILDERS = {
  card: (character) => ({
    id: 'card:' + character.name,
    docType: 'card',
    title: 'Карточка: ' + character.name,
    icon: '📜',
    height: 440,
    persist: true,
    data: character,
    srcdoc: buildCharacterCardHtml(character)
  }),

  sticky: (note) => ({
    id: 'sticky:' + note.id,
    docType: 'sticky',
    title: note.title || 'Заметка',
    icon: '📌',
    height: 230,
    persist: true,
    data: note,
    srcdoc: buildStickyHtml(note)
  }),

  trap: (t) => ({
    id: 'trap:' + t.id,
    docType: 'trap',
    title: 'Ловушка: ' + t.name,
    icon: '🪤',
    height: 330,
    persist: true,
    data: t,
    srcdoc: buildTrapCardHtml(t)
  }),

  trapRef: (traps) => ({
    id: 'trap-reference',
    docType: 'trapRef',
    title: 'Справочник ловушек',
    icon: '📖',
    height: 620,
    persist: false,          // данные приходят из «Конструктора ловушек» при каждом открытии
    srcdoc: buildTrapRefHtml(traps)
  }),

  monster: (msg) => ({
    id: 'monster:' + (msg.url || msg.title),
    docType: 'monster',
    title: msg.title,
    icon: '🐉',
    height: 640,
    persist: false,          // сохранёнными существами управляет сам Бестиарий
    srcdoc: msg.html
  })
};

// ---------- Реестр обработчиков postMessage ----------
const APP_HANDLERS = {
  // «Характеристики» → «Создать карточку»
  'dnd-desktop-create-card': (msg) => {
    if (!msg.character) return;
    Desktop.openDoc(DOC_BUILDERS.card(msg.character));
  },

  // «Быстрые заметки» → «Создать заметку»
  'dnd-desktop-create-sticky': (msg) => {
    if (!msg.content && !msg.title) return;
    Desktop.openDoc(DOC_BUILDERS.sticky({ id: Date.now(), title: msg.title || '', content: msg.content || '', color: msg.color }));
  },

  // «Конструктор ловушек» → «Создать окно ловушки»
  'dnd-desktop-create-trap-card': (msg) => {
    if (!msg.trap) return;
    Desktop.openDoc(DOC_BUILDERS.trap({ ...msg.trap, id: Date.now() }));
  },

  // «Конструктор ловушек» → кнопка 📖
  'dnd-desktop-show-trap-ref': (msg) => {
    if (!Array.isArray(msg.traps)) return;
    Desktop.openDoc(DOC_BUILDERS.trapRef(msg.traps));
  },

  // «Бестиарий» → клик по существу
  'OPEN_MONSTER_TAB': (msg) => {
    if (!msg.html) return;
    Desktop.openDoc(DOC_BUILDERS.monster(msg));
  }
};

window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || typeof data.type !== 'string') return;
  if (!Desktop.isOwnFrame(event.source)) return;   // слушаем только свои окна
  const handler = APP_HANDLERS[data.type];
  if (handler) handler(data, event);
});
