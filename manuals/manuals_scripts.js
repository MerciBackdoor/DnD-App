// ============================================================
// Мануалы: список слева, чтение справа, содержание, поиск по тексту.
// Сами мануалы лежат в library/ — см. library/index.js и library/_template.js.
// ============================================================

const MANUALS = [];

// Её вызывают файлы мануалов из library/
function registerManual(m) {
  if (!m || !m.id || !m.title || typeof m.html !== 'string') {
    console.warn('Мануал пропущен: нужны id, title и html', m && m.id);
    return;
  }
  if (MANUALS.some(x => x.id === m.id)) {
    console.warn('Повторный id мануала, пропущен:', m.id);
    return;
  }
  MANUALS.push({
    category: 'Прочее', subtitle: '', summary: '', source: '', lang: '',
    ...m,
    tags: Array.isArray(m.tags) ? m.tags : []
  });
}

const STORE = { last: 'manuals_last', scroll: 'manuals_scroll', toc: 'manuals_toc_open' };

const $ = (id) => document.getElementById(id);
const searchInput    = $('search-input');
const categoryFilter = $('category-filter');
const listEl         = $('manual-list');
const statusEl       = $('list-status');
const emptyState     = $('empty-state');
const emptyText      = $('empty-text');
const readerView     = $('reader-view');
const readerMain     = $('reader-main');
const readerBody     = $('reader-body');
const contentEl      = $('manual-content');
const tocList        = $('toc-list');
const hitNav         = $('hit-nav');
const hitCount       = $('hit-count');

let currentId = null;
let hits = [];          // подсвеченные совпадения в открытом мануале
let hitIndex = -1;
let headings = [];      // заголовки открытого мануала (для содержания)

// ---------- Вспомогательное ----------
function readJSON(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch (e) { return fallback; }
}
function writeJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* хранилище недоступно — не страшно */ }
}
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function getWords() {
  return [...new Set(searchInput.value.toLowerCase().split(/\s+/).filter(Boolean))];
}

// ---------- Загрузка файлов мануалов ----------
function loadManualFiles(done) {
  const files = (typeof MANUAL_FILES !== 'undefined' && Array.isArray(MANUAL_FILES)) ? MANUAL_FILES : null;
  if (!files) { done(new Error('Не найден library/index.js со списком мануалов.')); return; }
  if (files.length === 0) { done(null, []); return; }

  let left = files.length;
  const failed = [];
  const finish = () => { if (--left === 0) done(null, failed); };
  files.forEach(f => {
    const s = document.createElement('script');
    s.async = false;              // выполнять строго в порядке списка (при дубликатах id побеждает первый)
    s.src = 'library/' + f;
    s.onload = finish;
    s.onerror = () => { failed.push(f); finish(); };
    document.head.appendChild(s);
  });
}

// Индекс для поиска: текст без разметки (через inert-парсер, ничего не загружается)
function buildIndex() {
  MANUALS.forEach(m => {
    const doc = new DOMParser().parseFromString(m.html, 'text/html');
    m._text = (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
    m._textLower = m._text.toLowerCase();
    m._meta = [m.title, m.subtitle, m.category, m.summary, ...m.tags].join(' ').toLowerCase();
  });
}

// ---------- Поиск ----------
function searchManuals(words, category) {
  const out = [];
  MANUALS.forEach(m => {
    if (category !== 'all' && m.category !== category) return;
    if (!words.length) { out.push({ m, count: 0, snippet: '' }); return; }

    if (!matchesWords(m, words)) return;

    let count = 0, first = -1;
    words.forEach(w => {
      let i = m._textLower.indexOf(w);
      while (i !== -1 && count < 999) {
        if (first === -1 || i < first) first = i;
        count++;
        i = m._textLower.indexOf(w, i + w.length);
      }
    });
    const metaHit = words.some(w => m._meta.includes(w));
    out.push({ m, count, metaHit, first });
  });

  if (words.length) {
    out.sort((a, b) => (b.metaHit - a.metaHit) || (b.count - a.count) || a.m.title.localeCompare(b.m.title, 'ru'));
  }
  return out;
}

function snippetNode(m, words, first) {
  const box = document.createElement('span');
  if (first == null || first < 0) { box.textContent = m.summary; return box; }
  const start = Math.max(0, first - 40);
  const piece = (start > 0 ? '…' : '') + m._text.slice(start, first + 90) + '…';
  const re = new RegExp(words.map(escapeRe).join('|'), 'gi');
  let last = 0, mt;
  while ((mt = re.exec(piece))) {
    if (mt.index > last) box.appendChild(document.createTextNode(piece.slice(last, mt.index)));
    const mark = document.createElement('mark');
    mark.textContent = mt[0];
    box.appendChild(mark);
    last = mt.index + mt[0].length;
    if (mt[0].length === 0) re.lastIndex++;
  }
  if (last < piece.length) box.appendChild(document.createTextNode(piece.slice(last)));
  return box;
}

// ---------- Список слева ----------
function makeItem(r, words, showCategory) {
  const m = r.m;
  const el = document.createElement('div');
  el.className = 'manual-item' + (m.id === currentId ? ' active' : '');
  el.dataset.id = m.id;
  el.tabIndex = 0;
  el.setAttribute('role', 'button');

  const title = document.createElement('div');
  title.className = 'mi-title';
  title.textContent = m.title;
  if (r.count) {
    const badge = document.createElement('span');
    badge.className = 'mi-count';
    badge.textContent = r.count >= 999 ? '999+' : r.count;
    badge.title = 'Совпадений в тексте';
    title.appendChild(badge);
  }
  el.appendChild(title);

  const sub = document.createElement('div');
  sub.className = 'mi-sub';
  if (words.length) {
    sub.appendChild(snippetNode(m, words, r.first));
    if (showCategory) {
      const c = document.createElement('div');
      c.className = 'mi-cat';
      c.textContent = m.category;
      el.appendChild(sub); el.appendChild(c);
    } else el.appendChild(sub);
  } else if (m.summary || m.subtitle) {
    sub.textContent = m.summary || m.subtitle;
    el.appendChild(sub);
  }

  el.addEventListener('click', () => openManual(m.id));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openManual(m.id); }
  });
  return el;
}

function renderList() {
  const words = getWords();
  const results = searchManuals(words, categoryFilter.value);
  listEl.innerHTML = '';

  if (words.length) {
    statusEl.textContent = `Найдено: ${results.length} из ${MANUALS.length}`;
    if (!results.length) {
      listEl.innerHTML = '<div class="list-empty">Ничего не найдено</div>';
      return;
    }
    results.forEach(r => listEl.appendChild(makeItem(r, words, true)));
    return;
  }

  statusEl.textContent = `Мануалов: ${results.length}`;
  if (!results.length) {
    listEl.innerHTML = '<div class="list-empty">' +
      (MANUALS.length ? 'В этой категории пока пусто' : 'Мануалов пока нет') + '</div>';
    return;
  }

  // группировка по категориям
  const groups = new Map();
  results.forEach(r => {
    if (!groups.has(r.m.category)) groups.set(r.m.category, []);
    groups.get(r.m.category).push(r);
  });
  [...groups.keys()].sort((a, b) => a.localeCompare(b, 'ru')).forEach(cat => {
    const head = document.createElement('div');
    head.className = 'cat-head';
    head.textContent = cat;
    listEl.appendChild(head);
    groups.get(cat)
      .sort((a, b) => a.m.title.localeCompare(b.m.title, 'ru'))
      .forEach(r => listEl.appendChild(makeItem(r, words, false)));
  });
}

function fillCategories() {
  const prev = categoryFilter.value;
  const cats = [...new Set(MANUALS.map(m => m.category))].sort((a, b) => a.localeCompare(b, 'ru'));
  categoryFilter.innerHTML = '<option value="all">Все категории</option>';
  cats.forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    categoryFilter.appendChild(o);
  });
  categoryFilter.value = cats.includes(prev) ? prev : 'all';
}

function markActive() {
  listEl.querySelectorAll('.manual-item').forEach(el => el.classList.toggle('active', el.dataset.id === currentId));
}

// ---------- Чтение ----------
function decorate() {
  // таблицы — в обёртку с горизонтальной прокруткой
  contentEl.querySelectorAll('table').forEach(t => {
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    t.parentNode.insertBefore(wrap, t);
    wrap.appendChild(t);
  });

  // заголовки → якоря и содержание
  headings = [...contentEl.querySelectorAll('h2, h3, h4')];
  tocList.innerHTML = '';
  headings.forEach((h, i) => {
    h.id = 'mh-' + i;
    const a = document.createElement('a');
    a.className = 'toc-item toc-' + h.tagName.toLowerCase();
    a.textContent = h.textContent.trim();
    a.dataset.target = h.id;
    a.title = a.textContent;
    a.addEventListener('click', () => scrollToEl(h, true));
    tocList.appendChild(a);
  });
  const has = headings.length > 0;
  $('toc').hidden = !has;
  $('toc-toggle').hidden = !has;
}

function scrollToEl(el, smooth, offset = 12) {
  const top = el.getBoundingClientRect().top - readerBody.getBoundingClientRect().top + readerBody.scrollTop - offset;
  readerBody.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
}

// Мануал подходит под запрос, если в нём (или в названии/тегах) есть все слова
function matchesWords(m, words) {
  const hay = m._meta + ' ' + m._textLower;
  return words.every(w => hay.includes(w));
}

// Подсветка слов поиска в тексте мануала
function highlight(words) {
  clearHighlights();
  const m = MANUALS.find(x => x.id === currentId);
  if (!words.length || !m || !matchesWords(m, words)) return;
  const re = new RegExp(words.map(escapeRe).join('|'), 'gi');
  const walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  const LIMIT = 500;
  for (const node of nodes) {
    if (hits.length >= LIMIT) break;
    const text = node.nodeValue;
    re.lastIndex = 0;
    if (!re.test(text)) continue;
    re.lastIndex = 0;

    const frag = document.createDocumentFragment();
    let last = 0, mt;
    while ((mt = re.exec(text))) {
      if (mt.index > last) frag.appendChild(document.createTextNode(text.slice(last, mt.index)));
      const mark = document.createElement('mark');
      mark.textContent = mt[0];
      frag.appendChild(mark);
      hits.push(mark);
      last = mt.index + mt[0].length;
      if (mt[0].length === 0) re.lastIndex++;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }
}

function clearHighlights() {
  contentEl.querySelectorAll('mark').forEach(mk => mk.replaceWith(document.createTextNode(mk.textContent)));
  contentEl.normalize();
  hits = [];
  hitIndex = -1;
}

function updateHitNav() {
  const words = getWords();
  hitNav.hidden = !(words.length && currentId);
  if (hitNav.hidden) return;
  hitCount.textContent = hits.length ? `${hitIndex + 1} / ${hits.length}${hits.length >= 500 ? '+' : ''}` : '0';
}

function goToHit(i, smooth = true) {
  if (!hits.length) return;
  if (hits[hitIndex]) hits[hitIndex].classList.remove('current');
  hitIndex = (i + hits.length) % hits.length;
  const mk = hits[hitIndex];
  mk.classList.add('current');
  const top = mk.getBoundingClientRect().top - readerBody.getBoundingClientRect().top + readerBody.scrollTop - readerBody.clientHeight / 3;
  readerBody.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
  updateHitNav();
}

function openManual(id, { restore = false } = {}) {
  const m = MANUALS.find(x => x.id === id);
  if (!m) return;

  // запоминаем, где остановились в предыдущем мануале
  saveScroll();

  currentId = id;
  localStorage.setItem(STORE.last, id);

  emptyState.hidden = true;
  readerView.hidden = false;

  $('reader-title').textContent = m.title;
  const meta = $('reader-meta');
  meta.innerHTML = '';
  const addMeta = (node) => meta.appendChild(node);
  const span = (txt, cls) => { const s = document.createElement('span'); if (cls) s.className = cls; s.textContent = txt; return s; };
  addMeta(span(m.category, 'meta-cat'));
  if (m.subtitle) addMeta(span(m.subtitle));
  if (m.lang) addMeta(span(m.lang.toUpperCase(), 'badge-lang'));
  if (m.source) {
    const a = document.createElement('a');
    a.href = m.source; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = 'источник'; a.className = 'meta-src'; a.title = m.source;
    addMeta(a);
  }

  contentEl.innerHTML = m.html;
  decorate();
  highlight(getWords());

  if (hits.length) {
    hitIndex = -1;
    goToHit(0, false);
  } else {
    updateHitNav();
    const saved = readJSON(STORE.scroll, {})[id];
    readerBody.scrollTop = (restore || saved) && saved ? saved : 0;
  }
  updateSpy();
  markActive();
}

// ---------- Позиция чтения и scrollspy ----------
let saveTimer = null;
function saveScroll() {
  if (!currentId) return;
  const all = readJSON(STORE.scroll, {});
  all[currentId] = Math.round(readerBody.scrollTop);
  writeJSON(STORE.scroll, all);
}

let spyQueued = false;
function updateSpy() {
  const bodyTop = readerBody.getBoundingClientRect().top;
  let active = null;
  for (const h of headings) {
    if (h.getBoundingClientRect().top - bodyTop <= 60) active = h; else break;
  }
  let activeEl = null;
  tocList.querySelectorAll('.toc-item').forEach(a => {
    const on = active && a.dataset.target === active.id;
    a.classList.toggle('active', !!on);
    if (on) activeEl = a;
  });
  // держим активный пункт содержания в поле зрения
  if (activeEl && !$('toc').hidden) {
    const tb = $('toc').getBoundingClientRect(), ab = activeEl.getBoundingClientRect();
    if (ab.top < tb.top + 30 || ab.bottom > tb.bottom - 10) activeEl.scrollIntoView({ block: 'center' });
  }
}

readerBody.addEventListener('scroll', () => {
  if (!spyQueued) {
    spyQueued = true;
    requestAnimationFrame(() => { spyQueued = false; updateSpy(); });
  }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveScroll, 300);
});
window.addEventListener('beforeunload', saveScroll);

// ---------- Содержание ----------
function setToc(open) {
  readerMain.classList.toggle('toc-hidden', !open);
  writeJSON(STORE.toc, open);
}
$('toc-toggle').addEventListener('click', () => setToc(readerMain.classList.contains('toc-hidden')));

// ---------- Поиск: обработчики ----------
let searchTimer = null;
searchInput.addEventListener('input', () => {
  renderList();
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    if (!currentId) return;
    highlight(getWords());
    updateHitNav();
    if (hits.length) goToHit(0, false);
  }, 200);
});
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const first = listEl.querySelector('.manual-item');
    if (first) openManual(first.dataset.id);
  }
});
categoryFilter.addEventListener('change', renderList);
$('hit-next').addEventListener('click', () => goToHit(hitIndex + 1));
$('hit-prev').addEventListener('click', () => goToHit(hitIndex - 1));

// ---------- Старт ----------
function start(err, failed) {
  if (err) {
    statusEl.textContent = 'Ошибка загрузки';
    emptyText.textContent = err.message;
    return;
  }
  buildIndex();
  fillCategories();
  renderList();

  if (failed && failed.length) {
    statusEl.textContent += ' · не загружены: ' + failed.join(', ');
  }
  if (!MANUALS.length) {
    emptyText.textContent = 'Мануалов пока нет. Добавьте файл в папку library и впишите его имя в library/index.js.';
    return;
  }

  // содержание: по умолчанию открыто, если окно достаточно широкое
  const savedToc = readJSON(STORE.toc, null);
  setToc(savedToc === null ? window.innerWidth >= 1100 : !!savedToc);

  const last = localStorage.getItem(STORE.last);
  if (last && MANUALS.some(m => m.id === last)) openManual(last, { restore: true });
}

loadManualFiles(start);
