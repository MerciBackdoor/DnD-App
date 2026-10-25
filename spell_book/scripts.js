let spellsData = [];
let currentSpellName = null; // Для сохранения выбранного заклинания

const searchInput  = document.getElementById('search-input');
const levelFilter  = document.getElementById('level-filter');
const spellList    = document.getElementById('spell-list');
const spellDisplay = document.getElementById('spell-display');
const emptyState   = document.getElementById('empty-state');

// Загрузка базы данных (теперь берется из подключенного spells_db.js)
function loadDatabase() {
  if (typeof spellsDatabase === 'undefined') {
    spellList.innerHTML = `<div style="padding: 10px; color: #e74c3c; text-align: center;">
      Критическая ошибка: База заклинаний (spells_db.js) не найдена или повреждена.
    </div>`;
    return;
  }

  // Передаем данные из глобальной переменной в нашу рабочую
  spellsData = spellsDatabase;
  
  // Сортировка: сначала по уровню [число], затем по алфавиту
  spellsData.sort((a, b) => {
    // Функция для извлечения уровня из строки вида "[3] Имя"
    const getLevel = (name) => {
      const match = name.match(/\[(\d+)\]/);
      return match ? parseInt(match[1], 10) : 99; // Если уровня нет, ставим 99, чтобы оно было в конце
    };

    const levelA = getLevel(a.name);
    const levelB = getLevel(b.name);

    // Сначала сравниваем уровни
    if (levelA !== levelB) {
      return levelA - levelB;
    }

    // Если уровни равны, сортируем по алфавиту
    // Также отрезаем уровень спереди и возможное англ. название в скобках сзади для честной сортировки
    const nameA = a.name.replace(/\[\d+\]\s*/, '').replace(/\s*\[.*?\]$/, '').toLowerCase();
    const nameB = b.name.replace(/\[\d+\]\s*/, '').replace(/\s*\[.*?\]$/, '').toLowerCase();
    return nameA.localeCompare(nameB);
  });

  restoreState();
  renderList();
}

// Восстановление состояния из localStorage
function restoreState() {
  const saved = localStorage.getItem('dnd_spellbook_state');
  if (saved) {
    try {
      const state = JSON.parse(saved);
      if (state.search) searchInput.value = state.search;
      if (state.level)  levelFilter.value = state.level;
      if (state.selected) currentSpellName = state.selected;
    } catch (e) {}
  }
}

// Сохранение состояния
function saveState() {
  const state = {
    search: searchInput.value.trim(),
    level: levelFilter.value,
    selected: currentSpellName
  };
  localStorage.setItem('dnd_spellbook_state', JSON.stringify(state));
}

// Отрисовка списка с учетом фильтров
function renderList() {
  spellList.innerHTML = '';
  const query = searchInput.value.toLowerCase().trim();
  const lvl = levelFilter.value;

  const filtered = spellsData.filter(spell => {
    // Проверка уровня
    let matchLevel = true;
    if (lvl !== 'all') {
      matchLevel = spell.name.startsWith(`[${lvl}]`);
    }

    // Ищем соответствие в названии (и русское, и английское)
    let matchText = true;
    if (query !== '') {
      // Ищем по первой строке text_content, т.к. в ней содержится "Русское название [English name]"
      const fullTitleForSearch = spell.text_content.split('\n')[0].toLowerCase();
      matchText = fullTitleForSearch.includes(query);
    }

    return matchLevel && matchText;
  });

  if (filtered.length === 0) {
    spellList.innerHTML = `<div style="padding:15px; text-align:center; color:var(--text-dim);">Заклинания не найдены</div>`;
    return;
  }

  filtered.forEach(spell => {
    // Извлекаем уровень из строки "[1] Название"
    const lvlMatch = spell.name.match(/\[(\d+)\]/);
    const spellLevel = lvlMatch ? lvlMatch[1] : '?';
    
    // Очищаем название: убираем "[1] " в начале и "[English name]" в конце (если оно вдруг есть в spell.name)
    const cleanName = spell.name
      .replace(/\[\d+\]\s*/, '') // удаляет уровень
      .replace(/\s*\[.*?\]$/, ''); // удаляет английское название в конце

    const btn = document.createElement('button');
    btn.className = 'spell-item';
    if (spell.name === currentSpellName) btn.classList.add('active');
    
    btn.innerHTML = `
      <span class="spell-lvl-badge">${spellLevel}</span>
      <span>${cleanName}</span>
    `;

    btn.onclick = () => {
      document.querySelectorAll('.spell-item').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      openSpell(spell);
    };

    spellList.appendChild(btn);
  });

  // Если при загрузке было сохранено активное заклинание - открываем его
  if (currentSpellName) {
    const spellToOpen = spellsData.find(s => s.name === currentSpellName);
    if (spellToOpen) openSpell(spellToOpen, true);
  }
}

// Открытие заклинания в правой панели
function openSpell(spell, skipSave = false) {
  emptyState.style.display = 'none';
  spellDisplay.style.display = 'block';
  
  // Вставляем готовую верстку из базы
  spellDisplay.innerHTML = spell.html_content;

  // ─── ДОБАВЛЕНИЕ ИЛЛЮСТРАЦИИ ──────────────────────────────────────────
  // Вытаскиваем английское название из URL (например, из "204-fire-bolt/" делаем "fire_bolt")
  const urlMatch = spell.url.match(/\/spells\/\d+-(.+?)\/?$/);
  
  if (urlMatch) {
    const engName = urlMatch[1].replace(/-/g, '_'); // Заменяем дефисы на нижнее подчеркивание
    
    // Находим заголовок внутри карточки заклинания, чтобы вставить картинку сразу под ним
    const headerEl = spellDisplay.querySelector('.card__header');
    if (headerEl) {
      // Трюк с onerror: пробуем .jpg -> если ошибка, пробуем .jpeg -> если ошибка, прячем img.
      const imgHTML = `<img 
        src="Ilustrations eng/${engName}.jpg" 
        onerror="if(this.src.endsWith('.jpg')) { this.src='Ilustrations eng/${engName}.jpeg'; } else { this.style.display='none'; }" 
        class="spell-illustration" 
        alt="Иллюстрация: ${spell.name}">`;
      
      // Вставляем картинку сразу после заголовка, перед основным текстом
      headerEl.insertAdjacentHTML('afterend', imgHTML);
    }
  }
  // ───────────────────────────────────────────────────────────────────

  currentSpellName = spell.name;
  if (!skipSave) saveState();
}

// Обработчики событий поиска
searchInput.addEventListener('input', () => {
  renderList();
  saveState();
});

levelFilter.addEventListener('change', () => {
  renderList();
  saveState();
});

// Запуск
loadDatabase();