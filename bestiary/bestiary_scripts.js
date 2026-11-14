// Старый массив bestiaryData удален. Мы используем глобальный MONSTERS_DATA из database.js

const SAVED_KEY    = 'bestiary_saved_monsters';
const SELECTED_KEY = 'bestiary_selected_url';

let savedMonsters = [];
let currentUrl = null;   // существо, которое сейчас открыто в правой панели

const emptyState     = document.getElementById('empty-state');
const monsterDisplay = document.getElementById('monster-display');
const contentPanel   = document.querySelector('.content-panel');

document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    loadSavedMonsters();
});

// --- Логика Поиска ---
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('results-list');

    if (!searchInput || !resultsList) return;

    // Проверяем, загрузилась ли база
    if (typeof MONSTERS_DATA !== 'undefined') {
        searchInput.placeholder = `Поиск по имени (доступно ${MONSTERS_DATA.length})...`;
    } else {
        searchInput.placeholder = "Ошибка загрузки базы данных!";
        return;
    }

// Вспомогательная функция для преобразования CR (включая дроби 1/8, 1/4) в числа для сортировки
    function parseCR(crString) {
        if (!crString) return 999; // Если CR нет, отправляем в конец списка
        if (crString.includes('/')) {
            const [num, den] = crString.split('/');
            return parseInt(num) / parseInt(den);
        }
        return parseFloat(crString);
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        resultsList.innerHTML = '';

        if (query === '') return;

        // 1. Поиск: фильтруем по русскому (в name) и английскому (извлекаем из raw_html)
        let filtered = MONSTERS_DATA.filter(item => {
            const inRussianName = item.name.toLowerCase().includes(query);

            // Ищем английское имя в атрибуте data-copy="Русское [English]" или просто в скобках [English]
            const copyMatch = item.raw_html.match(/data-copy="([^"]+)"/i);
            const inCopyAttr = copyMatch ? copyMatch[1].toLowerCase().includes(query) : false;

            const engBracketMatch = item.raw_html.match(/\[([A-Za-z\s\-']+)\]/);
            const inBrackets = engBracketMatch ? engBracketMatch[1].toLowerCase().includes(query) : false;

            return inRussianName || inCopyAttr || inBrackets;
        });

        // 2. Сортировка: сначала по уровню опасности (CR), затем по алфавиту
        filtered.sort((a, b) => {
            // Извлекаем CR из строк вида "[1/4] Гоблин" -> "1/4"
            const matchA = a.name.match(/^\[(.*?)\]/);
            const matchB = b.name.match(/^\[(.*?)\]/);

            const crA = matchA ? parseCR(matchA[1]) : 999;
            const crB = matchB ? parseCR(matchB[1]) : 999;

            // Сравниваем уровни опасности
            if (crA !== crB) {
                return crA - crB;
            }

            // Если CR равны, очищаем имя от "[CR] " для корректной сортировки по алфавиту
            const cleanNameA = a.name.replace(/^\[.*?\]\s*/, '');
            const cleanNameB = b.name.replace(/^\[.*?\]\s*/, '');

            // Сортируем по русскому алфавиту
            return cleanNameA.localeCompare(cleanNameB, 'ru');
        });

        // Ограничиваем вывод (например, до 50), чтобы браузер не вис на коротких запросах
        filtered.slice(0, 50).forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.title = item.name;

            // Клик по результату: сохраняем существо и сразу открываем его справа
            li.addEventListener('click', () => {
                addSavedMonster(item);
                openMonster(item);
            });

            resultsList.appendChild(li);
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target !== searchInput) {
            resultsList.innerHTML = '';
        }
    });
}

// --- Правая панель: карточка существа ---
function openMonster(item, skipSave = false) {
    emptyState.style.display = 'none';
    monsterDisplay.style.display = 'block';

    // Готовая верстка из базы
    monsterDisplay.innerHTML = item.raw_html;
    polishMonster(monsterDisplay);
    addBattleButton(monsterDisplay, item);
    contentPanel.scrollTop = 0;

    currentUrl = item.url;
    markActive();
    if (!skipSave) localStorage.setItem(SELECTED_KEY, item.url);
}

function closeMonster() {
    currentUrl = null;
    monsterDisplay.innerHTML = '';
    monsterDisplay.style.display = 'none';
    emptyState.style.display = '';
    localStorage.removeItem(SELECTED_KEY);
    markActive();
}

function markActive() {
    document.querySelectorAll('#saved-list .saved-item').forEach(li => {
        li.classList.toggle('active', li.dataset.url === currentUrl);
    });
}

// --- Приведение листа монстра в порядок ---
// В базе между подписью и значением часто нет пробела или двоеточия
// («Скорость30 футов», «оружием:+4 к попаданию», «побег.Гоблин может…»).
// Правим только пробелы и двоеточия, буквы и цифры не меняем.
const NO_SPACE_BEFORE = /^[\s,.;:!?)\]»”%]/;          // после такого начала пробел не нужен
const SPACE_BEFORE    = /^[A-Za-zА-Яа-яЁё0-9+\-−–(«"“\[]/;   // а перед таким началом после «.», «:» его нужно поставить

function polishMonster(root) {
    // 1) строки параметров: «Подпись значение» → «Подпись: значение»
    root.querySelectorAll('ul.params > li').forEach(li => {
        if (li.classList.contains('abilities') || li.classList.contains('subsection') || li.classList.contains('size-type-alignment')) return;
        const label = li.firstChild;
        if (!label || label.nodeType !== 1 || label.tagName !== 'STRONG') return;
        const rest = li.textContent.slice(label.textContent.length);
        if (!rest.trim()) return;                                   // всё в подписи («Бонус мастерства +2») — значения нет
        const next = label.nextSibling;
        const colonOutside = next && next.nodeType === 3 && /^\s*:/.test(next.nodeValue);
        if (!/[:.!?]\s*$/.test(label.textContent) && !colonOutside) label.appendChild(document.createTextNode(':'));
    });

    // 2) стык двух соседних текстовых кусков: «…оружием:» + «+4 к попаданию», «…побег.» + «Гоблин может…»
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(n => {                                            // двоеточие и точка слипшиеся с текстом внутри одного куска
        n.nodeValue = n.nodeValue
            .replace(/([^\s\d:]):(?=[^\s:\/])/g, '$1: ')
            .replace(/([а-яё]{2,})\.(?=[А-ЯЁ])/g, '$1. ')
            .replace(/([а-яё]),(?=[А-Яа-яЁё])/g, '$1, ');
    });
    for (let i = 0; i < nodes.length - 1; i++) {
        const a = nodes[i], b = nodes[i + 1];
        if (!a.nodeValue || !b.nodeValue) continue;
        if (!/[:.;,]$/.test(a.nodeValue)) continue;                 // конец куска без пробела и со знаком препинания
        if (/\s$/.test(a.nodeValue) || /^\s/.test(b.nodeValue)) continue;
        if (!SPACE_BEFORE.test(b.nodeValue) || NO_SPACE_BEFORE.test(b.nodeValue)) continue;
        a.nodeValue += ' ';
    }

    // 3) подпись, вынесенная в отдельный элемент, и значение сразу за ней («Скорость» + <strong>30 футов</strong>)
    root.querySelectorAll('ul.params > li > strong:first-child').forEach(label => {
        const t = label.textContent;
        const next = label.nextSibling;
        if (!next || /\s$/.test(t)) return;
        const nextText = next.textContent || '';
        if (!nextText.trim() || /^\s/.test(nextText) || NO_SPACE_BEFORE.test(nextText)) return;
        label.after(document.createTextNode(' '));
    });
}

// --- Кнопка «Добавить в битву» ---
// Берёт из листа русское имя, КД и максимум хитов и отправляет их в Боевой трекер (через оболочку D&D Desktop).
function readStat(root, labelRe) {
    for (const li of root.querySelectorAll('ul.params > li')) {
        const strong = li.firstChild;
        if (!strong || strong.nodeType !== 1 || strong.tagName !== 'STRONG') continue;
        if (!labelRe.test(strong.textContent.replace(/[:\s]+$/, ''))) continue;
        const rest = li.textContent.slice(strong.textContent.length);
        const m = rest.match(/\d+/);
        if (m) return parseInt(m[0], 10);
    }
    return null;
}

function russianName(item) {
    return item.name.replace(/^\[.*?\]\s*/, '').replace(/\s*\[[^\]]*\]\s*$/, '').trim();
}

function addBattleButton(root, item) {
    const title = root.querySelector('.card-title');
    if (!title) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'add-battle-btn';
    btn.textContent = '⚔ Добавить в битву';
    btn.title = 'Добавить в Боевой трекер: имя, КД и макс. хиты из листа, инициатива 0';
    let added = 0, timer = null;

    btn.addEventListener('click', () => {
        const ac = readStat(root, /^Класс Доспеха$/i);
        const hp = readStat(root, /^Хиты$/i);
        const flash = (text, cls) => {
            btn.textContent = text;
            btn.classList.remove('ok', 'err');
            if (cls) btn.classList.add(cls);
            clearTimeout(timer);
            timer = setTimeout(() => { btn.textContent = '⚔ Добавить в битву'; btn.classList.remove('ok', 'err'); }, 1800);
        };
        if (hp === null) { flash('Не нашёл хиты', 'err'); return; }
        if (window.parent === window) { flash('Только в D&D Desktop', 'err'); return; }

        window.parent.postMessage({
            type: 'dnd-desktop-add-combatant',
            combatant: { name: russianName(item), ac: ac === null ? 0 : ac, hp, maxHp: hp, initiative: 0 }
        }, '*');
        added++;
        flash(added > 1 ? `✓ Добавлено (×${added})` : '✓ Добавлено', 'ok');
    });
    title.appendChild(btn);
}

// --- Управление сохранёнными существами ---
function persistSaved() {
    try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(savedMonsters));
    } catch (e) {
        console.warn("Не удалось сохранить список существ:", e);
    }
}

function loadSavedMonsters() {
    try {
        const rawData = localStorage.getItem(SAVED_KEY);
        if (rawData) {
            savedMonsters = JSON.parse(rawData);
        }
        renderSavedMonsters();

        // Восстанавливаем открытое существо после перезагрузки
        const selectedUrl = localStorage.getItem(SELECTED_KEY);
        const selected = selectedUrl && savedMonsters.find(m => m.url === selectedUrl);
        if (selected) openMonster(selected, true);
    } catch (e) {
        console.error("Не удалось восстановить список существ:", e);
    }
}

function addSavedMonster(item) {
    if (!savedMonsters.some(m => m.url === item.url)) {
        savedMonsters.push(item);
        persistSaved();
        renderSavedMonsters();
    }

    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('results-list');
    if (searchInput) searchInput.value = '';
    if (resultsList) resultsList.innerHTML = '';
}

function removeSavedMonster(url) {
    savedMonsters = savedMonsters.filter(m => m.url !== url);
    persistSaved();
    if (url === currentUrl) closeMonster();
    renderSavedMonsters();
}

function renderSavedMonsters() {
    const savedList = document.getElementById('saved-list');
    if (!savedList) return;
    savedList.innerHTML = '';

    savedMonsters.forEach(item => {
        const li = document.createElement('li');
        li.className = 'saved-item';
        li.dataset.url = item.url;
        if (item.url === currentUrl) li.classList.add('active');

        const nameSpan = document.createElement('span');
        nameSpan.className = 'monster-name';
        nameSpan.textContent = item.name;
        nameSpan.title = item.name;

        // Клик по существу — карточка открывается справа, без новых окон
        li.addEventListener('click', () => openMonster(item));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.title = 'Удалить';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeSavedMonster(item.url);
        });

        li.appendChild(nameSpan);
        li.appendChild(deleteBtn);
        savedList.appendChild(li);
    });
}
