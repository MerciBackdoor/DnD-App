// Старый массив bestiaryData удален. Мы используем глобальный MONSTERS_DATA из database.js

let savedMonsters = [];

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

            li.addEventListener('click', () => {
                addSavedMonster(item);
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

// --- Управление сохранёнными существами ---
function loadSavedMonsters() {
    try {
        const rawData = localStorage.getItem('bestiary_saved_monsters');
        if (rawData) {
            savedMonsters = JSON.parse(rawData);
        }
        renderSavedMonsters();
    } catch (e) {
        console.error("Не удалось восстановить список существ:", e);
    }
}

function addSavedMonster(item) {
    if (!savedMonsters.some(m => m.url === item.url)) {
        savedMonsters.push(item);
        localStorage.setItem('bestiary_saved_monsters', JSON.stringify(savedMonsters));
        renderSavedMonsters();
    }

    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('results-list');
    if (searchInput) searchInput.value = '';
    if (resultsList) resultsList.innerHTML = '';
}

function removeSavedMonster(url) {
    savedMonsters = savedMonsters.filter(m => m.url !== url);
    localStorage.setItem('bestiary_saved_monsters', JSON.stringify(savedMonsters));
    renderSavedMonsters();
}

function renderSavedMonsters() {
    const savedList = document.getElementById('saved-list');
    if (!savedList) return;
    savedList.innerHTML = '';

    savedMonsters.forEach(item => {
        const li = document.createElement('li');
        li.className = 'saved-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'monster-name';
        nameSpan.textContent = item.name;
        nameSpan.title = item.name;
        
// --- ОТПРАВКА ОФФЛАЙН КАРТОЧКИ ---
        nameSpan.addEventListener('click', () => {
            // Оборачиваем сырой HTML в D&D стили
            const styledHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body {
                        background-color: #fdf6e3;
                        color: #333;
                        font-family: 'Georgia', serif;
                        padding: 20px;
                        line-height: 1.4;
                    }
                    h2 { color: #8a1a1b; border-bottom: 2px solid #c9ad6a; padding-bottom: 5px; margin-top: 0; }
                    ul.params { list-style: none; padding: 0; margin: 0;}
                    
                    ul.params li {
                        margin-top: 0;
                        margin-bottom: 8px;
                        padding: 0;
                        line-height: 1.2;
                    }

                    /* --- НОВОЕ: ФИКС ОГРОМНЫХ ПРОБЕЛОВ --- */
                    /* Жестко ограничиваем высоту SVG-разделителей */
                    svg {
                        height: 5px !important;
                        width: 100% !important;
                        margin: 10px 0 !important;
                        display: block;
                    }
                    
                    /* Скрываем пустые абзацы-распорки, если они есть */
                    p:empty, div:empty {
                        display: none !important;
                    }
                    /* -------------------------------------- */
                    
                    .abilities { display: flex; gap: 15px; text-align: center; margin: 15px 0; color: #8a1a1b; font-weight: bold;}
                    .stat div:first-child { font-size: 0.85em; text-transform: uppercase; color: #555; }
                    .subsection-title { color: #8a1a1b; border-bottom: 1px solid #c9ad6a; margin-top: 15px; }
                    strong { color: #000; }
                    .card-menu, .source-plaque { display: none !important; }
                </style>
            </head>
            <body>
                ${item.raw_html}
            </body>
            </html>
            `;

            window.parent.postMessage({
                type: 'OPEN_MONSTER_TAB',
                title: item.name,
                html: styledHtml, 
                url: item.url
            }, '*');
        });

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