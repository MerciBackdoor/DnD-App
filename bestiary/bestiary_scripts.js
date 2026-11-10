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
