let combatants = [];
let currentTurnIndex = 0;
let rounds = 0;   // полностью пройденные круги инициативы (1 круг = 6 секунд боя)
const deathBell = new Audio('Bell.mp3');
deathBell.volume = 0.3; // Значение от 0.0 (тишина) до 1.0 (максимум)

const CONDITION_DB = {
"БЕССОЗНАТЕЛЬНЫЙ": `Неподвижность - Вы получаете состояния «Недееспособный» и «Сбитый с ног» и роняете всё, что держите. Когда это состояние оканчивается, вы остаётесь сбитым с ног.
Скорость 0 - Ваша Скорость равна 0 и не может увеличиться.
Затронуты атаки - Броски атаки по вам совершаются с Преимуществом.
Затронуты спасброски - Вы автоматически проваливаете спасброски Силы и Ловкости.
Автоматические критические попадания - Каждый успешный бросок атаки по вам становится Критическим попаданием, если атакующий находится в пределах 5 футов от вас.
Неосведомлённость - Вы не осознаёте своё окружение.`,

    "ИСПУГАННЫЙ": `Затронуты проверки характеристик и атаки - Вы совершаете с Помехой проверки характеристик и броски атаки, пока источник страха находится в пределах вашей линии обзора.
Не можете приблизиться - Вы не способны добровольно приблизиться к источнику своего страха.`,

    "НЕВИДИМЫЙ": `Застигнуть врасплох - Вы получаете Преимущество к броску Инициативы.
Скрыт - Вы не подвержены никаким эффектам, требующим, чтобы цель быть видна, если у создателя эффекта нет какого-нибудь способа вас видеть. Всё снаряжение, которое вы носите или несёте, также скрыто.
Затронуты атаки - Броски атаки по вам совершаются с Помехой, а ваши броски атаки — с Преимуществом. Если существо каким-то образом может вас видеть, эти эффекты не действуют на него.`,

    "НЕДЕЕСПОСОБНЫЙ": `Бездействие - Вы не можете совершать Действия и Реакции.
Без Концентрации - Ваша Концентрация нарушена.
Немота - Вы не можете говорить.
Застигнут врасплох - Вы получаете Помеху к броску Инициативы.`,

    "ОГЛОХШИЙ": `Потеря слуха - Вы ничего не слышите и автоматически проваливаете все проверки характеристик, связанные со слухом.`,

    "ОКАМЕНЕВШИЙ": `Обращение в неодушевлённую материю - Вы и все немагические предметы, которые вы носите или несёте, превращаетесь в твёрдую неодушевлённую материю (обычно, камень). Ваш вес увеличивается в 10 раз, и вы перестаёте стареть.
Недееспособность - Вы получаете состояние «Недееспособный».
Скорость 0 - Ваша Скорость равна 0 и не может увеличиться.
Затронуты атаки - Броски атаки по вам совершаются с Преимуществом.
Затронуты спасброски - Вы автоматически проваливаете спасброски Силы и Ловкости.
Сопротивление к урону - У вас Сопротивление ко всем видам урона.
Иммунитет к яду - У вас Иммунитет к состоянию «Отравленный».`,

    "ОПУТАННЫЙ": `Скорость 0 - Ваша Скорость равна 0 и не может увеличиться.
Затронуты атаки - Броски атаки по вам совершаются с Преимуществом, а ваши броски атаки — с Помехой.
Затронуты спасброски - Вы совершаете спасброски Ловкости с Помехой.`,

    "ОСЛЕПЛЁННЫЙ": `Потеря зрения - Вы ничего не видите и автоматически проваливаете все проверки характеристик, связанные со зрением.
Затронуты атаки - Броски атаки по вам совершаются с Преимуществом, а ваши броски атаки — с Помехой.`,

    "ОТРАВЛЕННЫЙ": `Затронуты проверки характеристик и атаки - Вы совершаете с Помехой проверки характеристик и броски атаки.`,

    "ОЧАРОВАННЫЙ": `Не можете навредить очарователю - Вы не можете атаковать того, кто вас очаровал, а также сделать его целью умения или магического эффекта, причиняющего вред.
Социальное Преимущество - Очарователь совершает с Преимуществом все проверки характеристик при социальном взаимодействии с вами.`,

    "ОШЕЛОМЛЁННЫЙ": `Недееспособность - Вы получаете состояние «Недееспособный».
Затронуты спасброски - Вы автоматически проваливаете спасброски Силы и Ловкости.
Затронуты атаки - Броски атаки по вам совершаются с Преимуществом.`,

    "ПАРАЛИЗОВАННЫЙ": `Недееспособность - Вы получаете состояние «Недееспособный».
Скорость 0 - Ваша Скорость равна 0 и не может увеличиться.
Затронуты спасброски - Вы автоматически проваливаете спасброски Силы и Ловкости.
Затронуты атаки - Броски атаки по вам совершаются с Преимуществом.
Автоматические критические попадания - Каждый успешный бросок атаки по вам становится Критическим попаданием, если атакующий находится в пределах 5 футов от вас.`,

    "СБИТЫЙ С НОГ": `Ограниченная подвижность - Вы способны перемещаться только ползком и можете потратить половину своей Скорости (с округлением вниз), чтобы подняться, оканчивая тем самым это состояние. Если ваша Скорость равна 0, вы не можете подняться.
Затронуты атаки - Ваши броски атаки совершаются с Помехой. Броски атаки по вам совершаются с Преимуществом, если атакующий находится 5 футах от вас. В противном случае этот бросок атаки совершается с Помехой.`,

    "СХВАЧЕННЫЙ": `Скорость 0 - Ваша Скорость равна 0 и не может увеличиться.
Затронуты атаки - Ваши броски атаки совершаются с Помехой по любой цели, кроме схватившего вас существа.
Перемещаемость - Схватившее вас существо может тянуть или переносить вас во время своего движения, но каждый фут перемещения будет стоить ему 1 дополнительный фут, если вы не Крошечный или на два и более размеров меньше этого существа.`
};

const EXHAUSTION_EFFECTS = [
    "",
    "ИСТОЩЕНИЕ (УР 1) - Помеха при проверках характеристик.",
    "ИСТОЩЕНИЕ (УР 2) - Скорость уменьшается вдвое.",
    "ИСТОЩЕНИЕ (УР 3) - Помеха при бросках атаки и спасбросках.",
    "ИСТОЩЕНИЕ (УР 4) - Максимум хитов уменьшается вдвое.",
    "ИСТОЩЕНИЕ (УР 5) - Скорость снижается до 0.",
    "ИСТОЩЕНИЕ (УР 6) - Смерть."
];

// ===== Состояния: связи между ними, иммунитеты, концентрация =====
// Какие ещё состояния существо получает вместе с данным (по текстам описаний выше)
const CONDITION_GRANTS = {
    "БЕССОЗНАТЕЛЬНЫЙ": ["НЕДЕЕСПОСОБНЫЙ", "СБИТЫЙ С НОГ"],
    "ОКАМЕНЕВШИЙ":     ["НЕДЕЕСПОСОБНЫЙ"],
    "ОШЕЛОМЛЁННЫЙ":    ["НЕДЕЕСПОСОБНЫЙ"],
    "ПАРАЛИЗОВАННЫЙ":  ["НЕДЕЕСПОСОБНЫЙ"]
};
// Что остаётся, когда состояние оканчивается («...вы остаётесь сбитым с ног»)
const CONDITION_REMAINS = { "БЕССОЗНАТЕЛЬНЫЙ": ["СБИТЫЙ С НОГ"] };
// Иммунитеты, которые даёт состояние
const CONDITION_IMMUNITIES = { "ОКАМЕНЕВШИЙ": ["ОТРАВЛЕННЫЙ"] };
// Состояния, при которых концентрация нарушена и невозможна
const CONC_BREAKING = ["НЕДЕЕСПОСОБНЫЙ"];

const CONC_REMINDER = "Получен урон, спасбросок для поддержания концентрации";
const ROUNDS_PER_MINUTE = 10;   // раунд = 6 секунд

// Явно выбранные состояния + те, что они за собой влекут
function effectiveConditions(c) {
    const out = [...c.conditions];
    c.conditions.forEach(src => (CONDITION_GRANTS[src] || []).forEach(g => { if (!out.includes(g)) out.push(g); }));
    return out;
}
function conditionBlock(cond) { return cond + "\n" + CONDITION_DB[cond].trim(); }
function addConditionBlock(c, cond) {
    c.showNotes = true;
    c.notes = (c.notes.trim() + (c.notes.trim() ? '\n\n' : '') + conditionBlock(cond)).trim();
}
function removeConditionBlock(c, cond) {
    c.notes = c.notes.replace(conditionBlock(cond), "").trim();
}
function grantedBy(c, cond) { return c.conditions.filter(src => (CONDITION_GRANTS[src] || []).includes(cond)); }
function immuneSource(c, cond) { return c.conditions.find(src => (CONDITION_IMMUNITIES[src] || []).includes(cond)); }

function renderConditionOptions(index, c) {
    const eff = effectiveConditions(c);
    return Object.keys(CONDITION_DB).map(cond => {
        const by = grantedBy(c, cond)[0];
        const imm = immuneSource(c, cond);
        const lock = by ? 'Следствие состояния: ' + by : imm ? 'Иммунитет: ' + imm : '';
        return `<label class="${lock ? 'locked' : ''}"${lock ? ` title="${lock}"` : ''}><input type="checkbox" ${eff.includes(cond) ? 'checked' : ''} ${lock ? 'disabled' : ''} onchange="toggleCondition(${index}, '${cond}')"> ${cond}</label>`;
    }).join('');
}

// Концентрация привязана к счётчику боя: хранится раунд, на котором она заканчивается
function concRemaining(c) { return Math.max(0, (c.concentrationEnd || 0) - rounds); }
function concTitle(c) {
    if (!c.concentration) return 'Начать концентрацию';
    const r = concRemaining(c);
    return `Концентрация: осталось ${r} р. (${r * 6} сек.). Нажмите, чтобы прервать`;
}
function concentrationBlocker(c) {
    if (c.isDead || c.hp <= 0) return "Существо без сознания, концентрироваться оно не может.";
    if (effectiveConditions(c).some(x => CONC_BREAKING.includes(x))) return "Недееспособное существо не может поддерживать концентрацию.";
    return null;
}
function breakConcentration(c, reason) {
    c.concentration = false;
    c.concentrationEnd = 0;
    c.showNotes = true;
    const msg = "Концентрация нарушена: " + reason;
    c.notes = (c.notes.trim() + (c.notes.trim() ? "\n\n" : "") + msg).trim();
}
function addConcentrationReminder(c) {
    c.showNotes = true;
    c.notes = (c.notes.trim() + (c.notes.trim() ? "\n\n" : "") + CONC_REMINDER).trim();
}
function expireConcentrations() {
    combatants.forEach(c => {
        if (c.concentration && rounds >= c.concentrationEnd) {
            c.concentration = false;
            c.concentrationEnd = 0;
        }
    });
}
// Старые сохранения считали «раунды» по ходам: переводим остаток в конечный раунд
function normalizeConcentration() {
    combatants.forEach(c => {
        if (c.concentration && typeof c.concentrationEnd !== 'number') {
            c.concentrationEnd = rounds + (c.concentrationCounter > 0 ? c.concentrationCounter : ROUNDS_PER_MINUTE);
        }
        if (typeof c.concentrationEnd !== 'number') c.concentrationEnd = 0;
        delete c.concentrationCounter;
        delete c.maxConcentration;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCombatants();
    document.getElementById('addForm').addEventListener('submit', handleAdd);
    
    document.getElementById('importFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = JSON.parse(event.target.result);
            if (data.combatants) {
                combatants = data.combatants;
                currentTurnIndex = data.currentTurnIndex || 0;
                rounds = data.rounds || 0;
            } else {
                combatants = data;
                currentTurnIndex = 0;
                rounds = 0;
            }
            normalizeConcentration();
            saveCombatants();
            render();
        };
        reader.readAsText(file);
    });

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (!e.target.closest('.cond-box') && !e.target.closest('.exhaust-box')) {
            let changed = false;
            combatants.forEach(c => {
                if (c.showCondMenu || c.showExhaustMenu) {
                    c.showCondMenu = false;
                    c.showExhaustMenu = false;
                    changed = true;
                }
            });
            if (changed) render();
        }
    });
});

function formatRichText(text) {
    if (!text) return "";
    let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(/(.+ угас от истощения)/gi, '<span class="death-exhaustion">$1</span>');
    html = html.replace(/(.+ умер от потери крови)/gi, '<span class="death-blood">$1</span>');
    html = html.replace(/(преимущ[а-яё]*)/gi, '<span class="text-adv">$1</span>');
    html = html.replace(/(помех[а-яё]*)/gi, '<span class="text-disadv">$1</span>');
    html = html.replace(/(Получен урон, спасбросок для поддержания концентрации)/g, '<span class="text-disadv"><b>$1</b></span>');
    html = html.replace(/(СМЕРТЬ ОТ МАССИВНОГО УРОНА)/g, '<span class="text-disadv"><b>$1</b></span>');
    Object.keys(CONDITION_DB).forEach(cond => {
        const regex = new RegExp(`(${cond})`, 'gi');
        html = html.replace(regex, '<b>$1</b>');
    });
    for(let i=1; i<=6; i++) {
        const regex = new RegExp(`(ИСТОЩЕНИЕ \\(УР ${i}\\))`, 'gi');
        html = html.replace(regex, '<b>$1</b>');
    }
    return html.replace(/\n/g, '<br>');
}

function handleAdd(e) {
    e.preventDefault();
    const maxHpVal = parseInt(document.getElementById('maxHp').value) || 10;
    const hpInput = document.getElementById('hp').value;
    const initVal = parseInt(document.getElementById('initiative').value) || 0;
    const acVal = parseInt(document.getElementById('ac').value) || 0;
    const newChar = {
        id: Date.now(),
        name: document.getElementById('name').value,
        ac: Math.max(0, acVal),
        hp: hpInput === "" ? maxHpVal : parseInt(hpInput),
        tempHp: 0,
        maxHp: maxHpVal,
        baseMaxHp: maxHpVal,
        initiative: Math.max(-5, initVal),
        notes: "",
        isCollapsed: false,
        showNotes: false,
        deathSaves: { success: 0, failure: 0 },
        isDead: false,
        inspiration: false,
        concentration: false,
        concentrationEnd: 0,
        conditions: [],
        exhaustion: 0,
        showCondMenu: false,
        showExhaustMenu: false,
        reaction: true
    };
    combatants.push(newChar);
    sortAndRender();
    e.target.reset();
}

function render() {
    const container = document.getElementById('combatants');
    container.innerHTML = '';
    renderRounds();
    combatants.forEach((c, index) => {
        const div = document.createElement('div');
        div.className = `combatant ${index === currentTurnIndex ? 'active' : ''} ${c.isDead ? 'dead' : ''} ${c.isCollapsed ? 'collapsed' : ''} ${c.showNotes ? 'notes-open' : ''}`;
        const hpPct = Math.min(Math.max((c.hp / c.maxHp) * 100, 0), 100);
        const tempPct = Math.min((c.tempHp / c.maxHp) * 100, 100);
        div.innerHTML = `
            <div class="combatant-main-row">
                <button class="icon-btn" onclick="toggleCollapse(${index})">${c.isCollapsed ? '▶' : '▼'}</button>
                <div class="combatant-name hide-on-collapse" onclick="editName(${index})" style="cursor: pointer;"><b>${c.name} ${c.isDead ? '💀' : ''}</b></div>
                <div class="reaction-box hide-on-collapse ${c.reaction !== false ? 'reaction-active' : 'reaction-spent'}" onclick="toggleReaction(${index})" title="Реакция (Нажмите, чтобы потратить)">⚡</div>
                <div class="inspiration-box hide-on-collapse" onclick="toggleInspiration(${index})" title="Геройское Вдохновение">
                    ${c.inspiration ? '⭐' : '<div class="insp-checkbox"></div>'}
                </div>
                <div class="ac-box hide-on-collapse">🛡️ <input type="number" value="${c.ac}" onchange="updateProp(${index}, 'ac', this.value)" style="width:35px"></div>
                <div class="hp-control hide-on-collapse">
                    <button class="icon-btn" onclick="changeHp(${index}, -1)">⚔️</button>
                    <input type="number" id="hp-mod-${index}" placeholder="0" style="width:40px">
                    <button class="icon-btn" onclick="changeHp(${index}, 1)">❤️</button>
                </div>
                <div class="exhaust-box hide-on-collapse">
                    <button class="icon-btn" onclick="toggleExhaustMenu(${index})">🤕<sup>${c.exhaustion}</sup></button>
                    <div class="exhaust-menu ${c.showExhaustMenu ? 'open' : ''}">
                    <div style="text-align: center; font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #ffffff;">СТЕПЕНЬ ИСТОЩЕНИЯ</div>
                        <div class="exhaust-row">
                            ${[1, 2, 3, 4, 5, 6].map(lvl => `
                                <div class="exhaust-item">
                                    <input type="checkbox" ${c.exhaustion >= lvl ? 'checked' : ''} onchange="updateExhaustion(${index}, ${c.exhaustion === lvl ? lvl - 1 : lvl})">
                                    <span>${lvl}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="cond-box hide-on-collapse">
                    <button class="icon-btn" onclick="toggleCondMenu(${index})">✨</button>
                    <div class="condition-menu ${c.showCondMenu ? 'open' : ''}">
                        ${renderConditionOptions(index, c)}
                    </div>
                </div>
                <div class="conc-box hide-on-collapse">
                    <button class="icon-btn" onclick="setConcentration(${index})" title="${concTitle(c)}">${c.concentration ? '🌀<span class="conc-counter">' + concRemaining(c) + '</span>' : '💤'}</button>
                </div>
                <div class="init-box hide-on-collapse">⏳ <input type="number" value="${c.initiative}" onchange="updateProp(${index}, 'initiative', this.value)" style="width:35px"></div>
                <div class="health-bar hide-on-collapse">
                    <div class="health-text">
                        ${c.hp <= 0 && !c.isDead ? 'СПАСБРОСКИ' : 
                            `<span onclick="setTempHp(${index})">${(c.tempHp > 0 ? `(${c.tempHp}) + ` : '') + c.hp}</span> / <span onclick="editMaxHp(${index})">${c.maxHp}</span>`
                        }
                    </div>
                    <div class="health-bar-inner" style="width: ${hpPct}%; background: ${getHpColor(hpPct)}"></div>
                    <div class="health-bar-temp" style="width: ${tempPct}%;"></div>
                </div>
                <div class="actions hide-on-collapse">
                    <button class="icon-btn" onclick="toggleNotes(${index})">📝</button>
                    <button class="icon-btn" onclick="copyCombatant(${index})">📑</button>
                    <button class="icon-btn remove-btn" onclick="removeCombatant(${index})">🗑️</button>
                </div>
            </div>
            <div class="notes-area">
                <div class="notes-view" id="view-${index}" onclick="editNotes(${index})">${formatRichText(c.notes) || '...'}</div>
                <textarea class="notes-input" id="input-${index}" style="display:none" onblur="saveNotes(${index})">${c.notes}</textarea>
            </div>
            ${c.hp <= 0 && !c.isDead ? renderDeathSaves(index, c) : ''}
        `;
        container.appendChild(div);
    });
}

window.changeHp = (index, sign) => {
    let modInput = document.getElementById(`hp-mod-${index}`);
    let mod = parseInt(modInput.value) || 0;
    const c = combatants[index];

    if (sign > 0) {
        c.hp = Math.min(c.maxHp, c.hp + mod);
        if (c.hp > 0 && c.exhaustion < 6) {
            c.isDead = false;
            c.deathSaves = {success: 0, failure: 0};
        }
    } else {
        const damageTaken = mod;
        if (c.tempHp > 0) {
            if (mod <= c.tempHp) {
                c.tempHp -= mod;
                mod = 0;
            } else {
                mod -= c.tempHp;
                c.tempHp = 0;
            }
        }

        const overkill = Math.floor(c.maxHp / 2);
        const deathThreshold = c.hp + overkill;

        if (mod > 0) {
            if (mod >= deathThreshold) {
                c.hp = 0;
                c.isDead = true;
                c.showNotes = true;
                deathBell.currentTime = 0;
                deathBell.play().catch(e => console.log("Аудио заблокировано браузером:", e));
                const msg = `СМЕРТЬ ОТ МАССИВНОГО УРОНА (Получено ${mod} при пороге ${deathThreshold})`;
                if (!c.notes.includes("СМЕРТЬ ОТ МАССИВНОГО УРОНА")) {
                    c.notes = (msg + "\n" + c.notes).trim();
                }
            } else {
                c.hp = Math.max(0, c.hp - mod);
            }
        }
        if (c.hp <= 0) c.concentration = false;
        if (damageTaken > 0 && c.concentration) addConcentrationReminder(c);
    }
    sortAndRender();
};

window.nextTurn = () => {
    if (!combatants.length) return;
    let nextIndex = (currentTurnIndex + 1) % combatants.length;
    while ((combatants[nextIndex].isDead || combatants[nextIndex].isCollapsed) && combatants.some(x => !x.isDead && !x.isCollapsed)) {
        nextIndex = (nextIndex + 1) % combatants.length;
    }
    // Полный круг: ход перешёл через конец списка к началу. Мёртвые и свёрнутые пропускаются циклом выше,
    // поэтому в круге участвуют только активные бойцы.
    if (combatants.some(x => !x.isDead && !x.isCollapsed) && nextIndex <= currentTurnIndex) { rounds++; expireConcentrations(); }
    currentTurnIndex = nextIndex;
    if (combatants[currentTurnIndex]) {
        combatants[currentTurnIndex].reaction = true;
    }
    saveCombatants();
    render();
};

window.prevTurn = () => {
    if (!combatants.length) return;
    let prevIndex = (currentTurnIndex - 1 + combatants.length) % combatants.length;
    while ((combatants[prevIndex].isDead || combatants[prevIndex].isCollapsed) && combatants.some(x => !x.isDead && !x.isCollapsed)) {
        prevIndex = (prevIndex - 1 + combatants.length) % combatants.length;
    }
    // Шаг назад через начало списка отменяет последний засчитанный круг
    if (combatants.some(x => !x.isDead && !x.isCollapsed) && prevIndex >= currentTurnIndex && rounds > 0) rounds--;
    currentTurnIndex = prevIndex;
    if (combatants[currentTurnIndex]) {
        combatants[currentTurnIndex].reaction = true;
    }
    
    saveCombatants();
    render();
};

window.updateExhaustion = (i, level) => {
    const c = combatants[i];
    EXHAUSTION_EFFECTS.forEach(eff => { if(eff) c.notes = c.notes.replace(eff, "").trim(); });
    c.exhaustion = level;
    c.maxHp = (level >= 4) ? Math.floor(c.baseMaxHp / 2) : c.baseMaxHp;
    if (c.hp > c.maxHp) c.hp = c.maxHp;
    for(let j=1; j<=level; j++) {
        const eff = EXHAUSTION_EFFECTS[j];
        if(!c.notes.includes(eff)) c.notes = (c.notes.trim() + (c.notes.trim() ? '\n' : '') + eff).trim();
    }
    if(level === 6) { 
        c.isDead = true; c.hp = 0; c.concentration = false; 
        c.showNotes = true;
        deathBell.currentTime = 0;
        deathBell.play().catch(e => console.log("Аудио заблокировано браузером:", e));
        const fadeMsg = `${c.name} угас от истощения`;
        if (!c.notes.includes(fadeMsg)) c.notes = (fadeMsg + "\n" + c.notes).trim();
    }
    c.notes = c.notes.replace(/\n{3,}/g, '\n\n').trim();
    saveCombatants();
    render();
};

window.toggleCondition = (i, cond) => {
    const c = combatants[i];
    const before = new Set(effectiveConditions(c));
    const adding = !c.conditions.includes(cond);

    if (adding) {
        if (immuneSource(c, cond)) { render(); return; }
        c.conditions.push(cond);
        // иммунитеты: состояния, к которым новое состояние даёт иммунитет, снимаются
        (CONDITION_IMMUNITIES[cond] || []).forEach(x => { c.conditions = c.conditions.filter(y => y !== x); });
    } else {
        c.conditions = c.conditions.filter(x => x !== cond);
        // то, что остаётся после окончания состояния (Бессознательный → остаёмся сбитыми с ног)
        (CONDITION_REMAINS[cond] || []).forEach(r => {
            if (before.has(r) && !c.conditions.includes(r)) c.conditions.push(r);
        });
    }

    const after = new Set(effectiveConditions(c));
    before.forEach(x => { if (!after.has(x)) removeConditionBlock(c, x); });
    after.forEach(x => { if (!before.has(x)) addConditionBlock(c, x); });

    if (adding && c.concentration && [...after].some(x => CONC_BREAKING.includes(x))) {
        breakConcentration(c, cond);
    }

    c.notes = c.notes.replace(/\n{3,}/g, '\n\n').trim();
    saveCombatants();
    render();
};

window.updateProp = (i, p, v) => {
    combatants[i][p] = parseInt(v) || 0;
    if (p === 'initiative') combatants.sort((a, b) => b.initiative - a.initiative);
    saveCombatants();
    render();
};

window.setConcentration = (i) => {
    const c = combatants[i];
    if (!c.concentration) {
        const blocked = concentrationBlocker(c);
        if (blocked) { alert(blocked); return; }
        const val = prompt("Длительность концентрации (минуты; 1 минута = 10 раундов):", "1");
        if (val === null) return;
        const minutes = parseFloat(String(val).replace(',', '.'));
        if (!(minutes > 0)) return;
        c.concentration = true;
        c.concentrationEnd = rounds + Math.max(1, Math.round(minutes * ROUNDS_PER_MINUTE));
    } else {
        c.concentration = false;
        c.concentrationEnd = 0;
    }
    saveCombatants();
    render();
};

window.toggleCondMenu = (i) => {
    const s = !combatants[i].showCondMenu;
    combatants.forEach(c => { c.showCondMenu = false; c.showExhaustMenu = false; });
    combatants[i].showCondMenu = s;
    render();
};

window.toggleExhaustMenu = (i) => {
    const s = !combatants[i].showExhaustMenu;
    combatants.forEach(c => { c.showCondMenu = false; c.showExhaustMenu = false; });
    combatants[i].showExhaustMenu = s;
    render();
};

window.toggleCollapse = (i) => { combatants[i].isCollapsed = !combatants[i].isCollapsed; saveCombatants(); render(); };
window.toggleNotes = (i) => { combatants[i].showNotes = !combatants[i].showNotes; saveCombatants(); render(); };
window.removeCombatant = (i) => { combatants.splice(i, 1); saveCombatants(); render(); };
window.editNotes = (i) => {
    const v = document.getElementById(`view-${i}`);
    const inp = document.getElementById(`input-${i}`);
    v.style.display = 'none'; inp.style.display = 'block'; inp.focus();
};
window.saveNotes = (i) => {
    const inp = document.getElementById(`input-${i}`);
    combatants[i].notes = inp.value;
    saveCombatants();
    render();
};
window.toggleInspiration = (i) => { combatants[i].inspiration = !combatants[i].inspiration; saveCombatants(); render(); };
window.editName = (i) => { 
    const n = prompt("Имя:", combatants[i].name); 
    if(n) { combatants[i].name = n; saveCombatants(); render(); } 
};
window.toggleReaction = (i) => { 
    // Если свойства нет (старое сохранение), считаем что оно было true и меняем на false
    combatants[i].reaction = combatants[i].reaction === false ? true : false; 
    saveCombatants(); 
    render(); 
};
window.editMaxHp = (i) => {
    const n = prompt("Макс ХП:", combatants[i].maxHp);
    if(n) { combatants[i].baseMaxHp = parseInt(n); updateExhaustion(i, combatants[i].exhaustion); }
};
window.setTempHp = (i) => {
    const n = prompt("Временные ХП:", combatants[i].tempHp);
    if(n !== null) { combatants[i].tempHp = parseInt(n) || 0; saveCombatants(); render(); }
};
window.copyCombatant = (i) => {
    const copy = JSON.parse(JSON.stringify(combatants[i]));
    copy.id = Date.now();
    copy.name += " (копия)";
    combatants.push(copy);
    sortAndRender();
};

window.longRest = () => {
    if (confirm("Вы уверены, что хотите выполнить Долгий отдых для всех?")) {
        combatants.forEach((c, index) => {
            if (c.isDead) {
                return;
            }
            c.hp = c.maxHp;
            c.tempHp = 0;
            c.isDead = false;
            c.reaction = true;
            c.deathSaves = { success: 0, failure: 0 };
            if (c.exhaustion > 0) {
                updateExhaustion(index, Math.max(0, c.exhaustion - 1));
            }
        });
        saveCombatants();
        render();
    }
};

window.exportCombatants = () => {
    const data = { combatants, currentTurnIndex, rounds };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dnd-battle-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
};

window.fixLeadingZeros = (e) => {
    if (e.target.type === 'number') {
        e.target.value = e.target.value.replace(/^0+(?=\d)/, '');
    }
};

function sortAndRender() { combatants.sort((a, b) => b.initiative - a.initiative); saveCombatants(); render(); }
function getHpColor(p) { return p > 70 ? '#2ecc71' : p > 30 ? '#f1c40f' : '#e74c3c'; }

function saveCombatants() { 
    const data = { combatants, currentTurnIndex, rounds };
    localStorage.setItem('dnd_v5_data', JSON.stringify(data)); 
}

function loadCombatants() { 
    const d = localStorage.getItem('dnd_v5_data'); 
    if(d) {
        const parsed = JSON.parse(d);
        if (parsed.combatants) {
            combatants = parsed.combatants;
            currentTurnIndex = parsed.currentTurnIndex || 0;
            rounds = parsed.rounds || 0;
        } else {
            combatants = parsed;
        }
    }
    normalizeConcentration();
    render();
}

function renderDeathSaves(index, c) {
    const dot = (type, step, active) => `<div class="death-dot ${type} ${active ? 'active' : ''}" onclick="handleDeathSave(${index}, '${type}', ${step})"></div>`;
    return `<div class="death-saves-row hide-on-collapse">
            <div class="death-save-group"><span>Успех:</span> ${[0,1,2].map(i => dot('success', i, i < c.deathSaves.success)).join('')}</div>
            <div class="death-save-group"><span>Провал:</span> ${[0,1,2].map(i => dot('failure', i, i < c.deathSaves.failure)).join('')}</div>
        </div>`;
}

window.handleDeathSave = (i, t, s) => {
    const c = combatants[i];
    if (c.deathSaves[t] === s + 1) c.deathSaves[t] = s;
    else c.deathSaves[t] = s + 1;
    if (t === 'success' && c.deathSaves.success >= 3) { c.hp = 1; c.deathSaves = {success:0, failure:0}; }
    else if (t === 'failure' && c.deathSaves.failure >= 3) { 
        c.isDead = true; 
        c.showNotes = true;
        deathBell.currentTime = 0;
        deathBell.play().catch(e => console.log("Аудио заблокировано браузером:", e));
        const msg = `${c.name} умер от потери крови`;
        if(!c.notes.includes(msg)) c.notes = (msg + "\n" + c.notes).trim();
    }
    saveCombatants();
    render();
};

// ===== Счётчик боя: время (6 сек. на круг) и количество раундов =====
function renderRounds() {
    const sec = document.getElementById('rc-seconds');
    const rnd = document.getElementById('rc-rounds');
    if (sec) sec.textContent = (rounds * 6) + ' сек.';
    if (rnd) rnd.textContent = rounds;
}

window.resetRounds = () => {
    if (rounds === 0) return;
    if (confirm("Сбросить счётчик боя (время и раунды)?")) {
        // у активных концентраций остаток времени сохраняется
        combatants.forEach(c => { if (c.concentration) c.concentrationEnd = Math.max(1, c.concentrationEnd - rounds); });
        rounds = 0;
        saveCombatants();
        render();
    }
};
