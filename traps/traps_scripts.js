// ── Данные справочника ──────────────────────────────────────────
const trapReference = [
  {
    name: 'Арбалет-ловушка', danger: 'Опасная',
    type: 'Простая ловушка (уровень 1-4)', trigger: 'Существо задевает растяжку, поставленную поперек коридора.',
    effect: 'Две атаки по цели. Бонус +8, 5 (1к10) колющего урона каждая. Без преимущества или помехи.',
    detect: 'Внимательность Сл 15', disable: 'Вор. инструменты Сл 15',
    note: 'Провал проверки обезвреживания на 5 или более активирует ловушку.'
  },
  {
    name: 'Вековой сон', danger: 'Смертельная',
    type: 'Простая ловушка (уровень 11-16)', trigger: 'Наступание на нажимную плиту.',
    effect: 'Накладывает заклинание усыпление 9-го уровня с центром на плите.',
    detect: 'Внимательность Сл 20', disable: 'Магия Сл 20 или Рассеивание магии Сл 19',
    note: 'Отключение магией проводится в пределах 5 фт. Провал на 10 и более активирует ловушку.'
  },
  {
    name: 'Испепеляющий поток', danger: 'Опасная',
    type: 'Простая ловушка (уровень 5-10)', trigger: 'Наступание на мозаику. Открытый святой символ Пиремия не активирует ловушку.',
    effect: '15-футовый куб огня над плитой. Спасбросок Ловкости Сл 15, 24 (7к6) урона огнем при провале.',
    detect: 'Внимательность Сл 15', disable: 'Религия Сл 15 или Рассеивание магии Сл 15',
    note: 'Провал проверки отключения активирует ловушку.'
  },
  {
    name: 'Катящийся шар', danger: 'Смертельная',
    type: 'Механическая', trigger: '20 и более фунтов веса на нажимной плите.',
    effect: 'Каменный шар катится на 60 фт с инициативой +8. Спасбросок Ловкости Сл 15, 55 (10к10) дробящего урона и сбивание с ног.',
    detect: 'Внимательность Сл 15 или Анализ Сл 15', disable: 'Железный шип под плиту',
    note: 'Существо в пределах 5 фт может попытаться замедлить шар (Сила Сл 20), снизив его скорость на 15 фт.'
  },
  {
    name: 'Косящее лезвие', danger: 'Опасная',
    type: 'Простая ловушка (уровень 5-10)', trigger: 'Активация рычагом.',
    effect: 'Лезвие проходит по области 5 на 20 фт. Спасбросок Ловкости Сл 15, 14 (4к6) рубящего урона при провале.',
    detect: 'Внимательность Сл 15', disable: 'Вор. инструменты Сл 15',
    note: 'Рычаг не скрыт. На стенах можно заметить царапины и кровь.'
  },
  {
    name: 'Ловчая яма', danger: 'Умеренная',
    type: 'Простая ловушка (уровень 1-4)', trigger: 'Наступание на полотно, скрывающее яму.',
    effect: 'Падение в яму глубиной 10 фт. Спасбросок Ловкости Сл 10, при провале 3 (1к6) дробящего урона.',
    detect: 'Внимательность Сл 10', disable: 'Обход по краю',
    note: 'Вдоль стен по краям оставлены выступы для обхода.'
  },
  {
    name: 'Медвежий капкан', danger: 'Опасная',
    type: 'Простая ловушка (уровень 1-4)', trigger: 'Наступание на капкан.',
    effect: 'Атака +8, 5 (1к10) колющего урона. Скорость существа падает до 0.',
    detect: 'Внимательность Сл 10', disable: 'Вор. инструменты Сл 10 или Сила Сл 15',
    note: 'Существо обездвижено до успешного освобождения.'
  },
  {
    name: 'Обрушивающийся потолок', danger: 'Смертельная',
    type: 'Механическая', trigger: 'Натяжная веревка ломает опору потолка.',
    effect: 'Спасбросок Ловкости Сл 15, 22 (4к10) дробящего урона при провале. Область становится труднопроходимой.',
    detect: 'Внимательность Сл 10', disable: 'Вор. инструменты Сл 15',
    note: 'Проверка без инструментов совершается с помехой. Провал активирует ловушку.'
  },
  {
    name: 'Огнедышащая статуя', danger: 'Опасная',
    type: 'Магическая', trigger: 'Больше 20 фунтов веса на потайной нажимной плите.',
    effect: 'Статуя испускает 30-футовый конус огня. Спасбросок Ловкости Сл 13, 22 (4к10) урона огнем при провале.',
    detect: 'Внимательность Сл 15 или Обнаружение магии', disable: 'Железный шип под плиту или Рассеивание магии Сл 13',
    note: ''
  },
  {
    name: 'Отравленная игла', danger: 'Опасная',
    type: 'Механическая', trigger: 'Попытка открыть замок без ключа или взломать его.',
    effect: '1 колющего урона и 11 (2к10) урона ядом. Спасбросок Телосложения Сл 15 или отравление на 1 час.',
    detect: 'Анализ Сл 20', disable: 'Вор. инструменты Сл 15',
    note: 'Неудачный взлом также активирует ловушку.'
  },
  {
    name: 'Ядовитый шип', danger: 'Смертельная',
    type: 'Простая ловушка (уровень 1-4)', trigger: 'Попытка открыть или взломать замок.',
    effect: 'Спасбросок Телосложения Сл 20. Провал: 14 (4к6) урона ядом и парализующее отравление на 10 минут.',
    detect: 'Внимательность Сл 20', disable: 'Вор. инструменты Сл 20',
    note: 'Провал обезвреживания на 10 и более активирует ловушку.'
  },
  {
    name: 'Отравленные дротики', danger: 'Опасная',
    type: 'Механическая', trigger: 'Больше 20 фунтов веса на потайной нажимной плите.',
    effect: 'Четыре дротика (+8 атака). При попадании 2 (1к4) колющего урона и Спасбросок Телосложения Сл 15 (11 урона ядом при провале).',
    detect: 'Внимательность Сл 15 или Анализ Сл 15', disable: 'Железный шип под плиту или воск в отверстия',
    note: 'Атака совершается по случайной цели в пределах 10 фт.'
  },
  {
    name: 'Падающая решетка', danger: 'Умеренная',
    type: 'Простая ловушка (уровень 1-4)', trigger: 'Наступание на нажимную плиту.',
    effect: 'Железная решетка падает с потолка, блокируя выход или проход.',
    detect: 'Внимательность Сл 20', disable: 'Вор. инструменты Сл 20',
    note: 'Провал отключения на 5 или больше активирует ловушку.'
  },
  {
    name: 'Падающая сеть', danger: 'Умеренная',
    type: 'Механическая', trigger: 'Натяжная веревка сбрасывает подвешенную сеть.',
    effect: 'Сеть накрывает квадрат 10х10 фт. Существа опутаны, Спасбросок Силы Сл 10 или сбивание с ног.',
    detect: 'Внимательность Сл 10', disable: 'Вор. инструменты Сл 15',
    note: 'Сеть: КД 10, 20 хитов. Проверка без инструментов идет с помехой.'
  },
  {
    name: 'Путь клинков', danger: 'Опасная',
    type: 'Сложная ловушка (уровень 1-4)', trigger: 'Вход живого существа в коридор 160 фт.',
    effect: 'Инициатива 20: лезвия (+5 атака). Инициатива 10: падающие столбы (Сл 15) и руна страха (Сл 15).',
    detect: 'Анализ Сл 15', disable: 'Анализ Сл 15, Вор. инструменты Сл 15, Магия Сл 15',
    note: 'Лезвия ускоряются при промахах (урон и атака растут).'
  },
  {
    name: 'Сеть', danger: 'Опасная',
    type: 'Простая ловушка (уровень 1-4)', trigger: 'Растяжка в коридоре.',
    effect: 'Сеть 10х10 фт. Спасбросок Ловкости Сл 15 или опутывание. Колокольчик предупреждает охрану.',
    detect: 'Внимательность Сл 15', disable: 'Вор. инструменты Сл 15',
    note: 'Провал отключения активирует ловушку.'
  },
  {
    name: 'Сфера аннигиляции', danger: 'Смертельная',
    type: 'Магическая', trigger: 'Контакт с материей внутри рта каменного лица.',
    effect: 'Мгновенное уничтожение любой входящей материи.',
    detect: 'Анализ Сл 20', disable: 'Рассеивание магии Сл 18 (от чар симпатии)',
    note: 'Может быть усилена эффектом притяжения (симпатия).'
  },
  {
    name: 'Сфера сокрушающей участи', danger: 'Смертельная',
    type: 'Сложная ловушка (уровень 5-10)', trigger: 'Открытие двери к гробу.',
    effect: 'Инициатива 10: сфера катится по уклону. Спасбросок Силы Сл 20, 22 (4к10) дробящего урона и сбивание с ног.',
    detect: 'Очевидно при срабатывании', disable: 'Магия Сл 20, Рассеивание магии Сл 19 или Силовая стена',
    note: 'Урон сферы увеличивается каждый раунд.'
  },
  {
    name: 'Ядовитая буря', danger: 'Смертельная',
    type: 'Сложная ловушка (уровень 11-16)', trigger: 'Внимательное рассматривание рубинов.',
    effect: 'Инициатива 20: двери закрываются, ядовитый газ (Телосложение Сл 20). Инициатива 10: случайный эффект бури (к6).',
    detect: 'Внимательность Сл 20', disable: 'Вор. инструменты Сл 20, Магия Сл 20, Сила Сл 20',
    note: 'Урон газа увеличивается на 11 (2к10) каждый раунд.'
  },
  {
    name: 'Ямы (разновидности)', danger: 'Вариативная',
    type: 'Механическая', trigger: 'Наступание на ткань или люк.',
    effect: 'Падение. Запирающаяся яма требует Силу Сл 20. Яма с шипами: 11 колющего. Отравленная: Телосложение Сл 13, 22 урона ядом.',
    detect: 'Внимательность Сл 10-15 или Анализ Сл 15', disable: 'Железный шип или Волшебный замок',
    note: ''
  }
];

function openTrapReference() {
  window.parent.postMessage({
    type: 'dnd-desktop-show-trap-ref',
    traps: trapReference
  }, '*');
}

// ── Логика генератора ────────────────────────────────────────────
const rules = {
    medium:    { dcRange: [10, 11], atkRange: [3, 5],  damageDice: { "1":"1d10",  "2":"2d10",  "3":"4d10",  "4":"10d10" } },
    dangerous: { dcRange: [12, 15], atkRange: [6, 8],  damageDice: { "1":"2d10",  "2":"4d10",  "3":"10d10", "4":"18d10" } },
    deadly:    { dcRange: [16, 20], atkRange: [9, 12], damageDice: { "1":"4d10",  "2":"10d10", "3":"18d10", "4":"24d10" } }
};

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

document.getElementById('mechType').addEventListener('change', function() {
    document.getElementById('saveAttrGroup').style.display = this.value === 'save' ? 'flex' : 'none';
});

document.getElementById('generateBtn').addEventListener('click', () => {
    const name     = document.getElementById('trapName').value    || "Неизвестная ловушка";
    const trigger  = document.getElementById('trapTrigger').value || "Не указан.";
    const effect   = document.getElementById('trapEffect').value  || "Не указан.";
    const level    = document.getElementById('level').value;
    const danger   = document.getElementById('danger').value;
    const isMagic  = document.getElementById('isMagic').checked;
    const mechType = document.getElementById('mechType').value;
    const saveAttr = document.getElementById('saveAttr').value;

    const ruleSet   = rules[danger];
    const detectDC  = getRandomInt(ruleSet.dcRange[0], ruleSet.dcRange[1]);
    const disableDC = detectDC + getRandomInt(-1, 2);
    const atkBonus  = getRandomInt(ruleSet.atkRange[0], ruleSet.atkRange[1]);
    const saveDC    = detectDC;
    const damage    = ruleSet.damageDice[level];
    const ac        = getRandomInt(12, 18);
    const hp        = getRandomInt(10, 30);

    const trapData = {
        name, trigger, effect, detectDC,
        disableDC: isMagic ? `${disableDC} (Интеллект/Магия или Рассеивание магии)` : `${disableDC} (Ловкость/Вор. инструменты)`,
        ac, hp: isMagic ? `${hp} (неприменимо к магии)` : hp,
        combatStat: mechType === 'attack' ? `Атака: +${atkBonus} к попаданию` : `Спасбросок: СЛ ${saveDC} (${saveAttr})`,
        damage
    };

    if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'dnd-desktop-create-trap-card', trap: trapData }, '*');
    } else {
        alert("Окно генерируется только внутри рабочего стола D&D.");
    }
});

// ── Логика книги-справочника ─────────────────────────────────────
const bookOverlay  = document.getElementById('bookOverlay');
const trapList     = document.getElementById('trapList');
const trapDetail   = document.getElementById('trapDetail');
const trapDetailContent = document.getElementById('trapDetailContent');

// Построить список кнопок
trapReference.forEach((trap, idx) => {
    const btn = document.createElement('button');
    btn.className = 'trap-item-btn';
    btn.innerHTML = `
        <span class="trap-icon">${trap.icon}</span>
        <span class="trap-label">${trap.name}</span>
        <span class="trap-danger">${trap.danger}</span>
    `;
    btn.addEventListener('click', () => showTrapDetail(idx));
    trapList.appendChild(btn);
});

function showTrapDetail(idx) {
    const t = trapReference[idx];
    trapList.classList.add('hidden');
    trapDetail.classList.remove('hidden');
    trapDetailContent.innerHTML = `
        <div class="trap-card">
            <h3>${t.icon} ${t.name}</h3>
            <div class="tc-meta">${t.type} · ${t.danger}</div>
            <div class="tc-row"><span class="tc-label">Триггер:</span><span class="tc-val">${t.trigger}</span></div>
            <div class="tc-row"><span class="tc-label">Эффект:</span><span class="tc-val">${t.effect}</span></div>
            <div class="tc-row"><span class="tc-label">Обнаружение:</span><span class="tc-val">${t.detect}</span></div>
            <div class="tc-row"><span class="tc-label">Обезвреживание:</span><span class="tc-val">${t.disable}</span></div>
            ${t.note ? `<div class="tc-row"><span class="tc-label">Примечание:</span><span class="tc-val">${t.note}</span></div>` : ''}
        </div>
    `;
}

document.getElementById('openBookBtn').addEventListener('click', openTrapReference);

document.getElementById('closeBookBtn').addEventListener('click', () => bookOverlay.classList.add('hidden'));

document.getElementById('backBtn').addEventListener('click', () => {
    trapDetail.classList.add('hidden');
    trapList.classList.remove('hidden');
});

bookOverlay.addEventListener('click', (e) => { if (e.target === bookOverlay) bookOverlay.classList.add('hidden'); });
