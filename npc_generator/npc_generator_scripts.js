let squad = [null, null, null];

window.onload = function() {
    const savedSquad = localStorage.getItem('npcSquad');
    if (savedSquad) {
        try {
            squad = JSON.parse(savedSquad);
            renderSquad();
        } catch (e) {
            console.error("Ошибка при чтении сохраненного отряда:", e);
        }
    }
};

function generateNPC() {
    if (typeof npcData === 'undefined') {
        alert("Ошибка: файл npc_data.js не загружен.");
        return;
    }

    // Проверяем, есть ли вообще хотя бы один незаблокированный слот
    const hasUnlockedSlot = squad.some((npc, idx) => npc === null || !npc.locked);
    if (!hasUnlockedSlot) {
        alert("Все ячейки закреплены! Снимите замочки, чтобы обновить NPC.");
        return;
    }

    const selectedGender = document.getElementById('filter-gender').value;
    const selectedRace = document.getElementById('filter-race').value;

    let gender = selectedGender;
    if (!gender) {
        gender = npcData.genders[Math.floor(Math.random() * npcData.genders.length)];
    }

    let race = selectedRace;
    if (!race) {
        race = npcData.races[Math.floor(Math.random() * npcData.races.length)];
    }

    const traits = npcData.traits;
    const namesSource = gender === 'Мужчина' ? npcData.maleNames : npcData.femaleNames;

    const name = namesSource[Math.floor(Math.random() * namesSource.length)];
    const trait = traits[Math.floor(Math.random() * traits.length)];

    const newNpc = {
        name: name,
        gender: gender,
        race: race,
        trait: trait,
        locked: false // По умолчанию новый персонаж не заблокирован
    };

    let targetIndex = -1;

    // Сценарий 1: Ищем пустые (null) места, которые физически не могут быть заблокированы
    for (let i = 0; i < 3; i++) {
        if (squad[i] === null) {
            targetIndex = i;
            break;
        }
    }

    // Сценарий 2: Все места заняты, ищем куда перезаписать, пропуская залоканные
    if (targetIndex === -1) {
        if (typeof window.replaceIndex === 'undefined') {
            window.replaceIndex = 0; 
        }

        let checkIndex = window.replaceIndex;
        for (let i = 0; i < 3; i++) {
            if (squad[checkIndex] && !squad[checkIndex].locked) {
                targetIndex = checkIndex;
                window.replaceIndex = (checkIndex + 1) % 3;
                break;
            }
            checkIndex = (checkIndex + 1) % 3; // Переходим по кругу к следующему
        }
    }

    if (targetIndex !== -1) {
        squad[targetIndex] = newNpc;
        renderSquad();
        localStorage.setItem('npcSquad', JSON.stringify(squad));

        const slotElement = document.getElementById(`npc-slot-${targetIndex + 1}`);
        if (slotElement) {
            slotElement.classList.remove('flash');
            void slotElement.offsetWidth;
            slotElement.classList.add('flash');
        }
    }
}

// Переключение состояния замочка
function toggleLock(index, event) {
    if (event) event.stopPropagation(); // Защита от лишних срабатываний клика по карточке
    if (squad[index] !== null) {
        squad[index].locked = !squad[index].locked;
        localStorage.setItem('npcSquad', JSON.stringify(squad));
        renderSquad();
    }
}

function clearAllSlots() {
    // При полной очистке удаляем абсолютно все карты
    squad = [null, null, null];
    renderSquad();
    localStorage.setItem('npcSquad', JSON.stringify(squad));
}

function renderSquad() {
    for (let i = 0; i < 3; i++) {
        const slotElement = document.getElementById(`npc-slot-${i + 1}`);
        if (!slotElement) continue;

        if (squad[i] !== null) {
            const isLocked = squad[i].locked || false;
            slotElement.innerHTML = `
                <button class="npc-lock-btn ${isLocked ? 'is-locked' : ''}" onclick="toggleLock(${i}, event)" title="${isLocked ? 'Разблокировать карту' : 'Закрепить карту'}">
                    ${isLocked ? '🔒' : '🔓'}
                </button>
                <span class="npc-name" title="${squad[i].name}">${squad[i].name}</span>
                <span class="npc-meta">${squad[i].gender}, ${squad[i].race}</span>
                <div class="npc-trait"><strong>Особенность:</strong> ${squad[i].trait}</div>
            `;
            
            // НОВОЕ: Делаем карточку кликабельной
            slotElement.onclick = () => showPortrait(i);
            slotElement.style.cursor = 'pointer'; 
            
            slotElement.classList.remove('empty');
            if (isLocked) {
                slotElement.classList.add('locked-card');
            } else {
                slotElement.classList.remove('locked-card');
            }
        } else {
            slotElement.innerHTML = `<p class="placeholder">🎲</p>`;
            slotElement.classList.add('empty');
            slotElement.classList.remove('locked-card');
            slotElement.onclick = null; // Clear click handler for empty slots
            slotElement.style.cursor = 'default'; // Reset cursor back to default
        }
    }
}

// ==========================================
// ФУНКЦИЯ ОТКРЫТИЯ ПОРТРЕТА
// ==========================================
function showPortrait(index) {
    const npc = squad[index];
    if (!npc) return;

    const modal = document.getElementById('portrait-modal');
    const nameLabel = document.getElementById('modal-npc-name');
    const svgContainer = document.getElementById('modal-npc-svg-container');

    nameLabel.textContent = `${npc.name} (${npc.race})`;
    const raceLower = npc.race.toLowerCase().trim();

    // Логика для Изменяющегося
    if (raceLower === 'изменяющийся') {
        if (!npc.changelingTrueForm) {
            // Инициализация форм
            npc.changelingTrueForm = generateChangelingTrueSVG(npc.gender);
            
            const availableRaces = Object.keys(raceGenerators).filter(r => r !== 'изменяющийся');
            const randomDisguiseRace = availableRaces[Math.floor(Math.random() * availableRaces.length)];
            npc.changelingDisguiseForm = raceGenerators[randomDisguiseRace](npc.gender);
            
            npc.showTrueForm = true; 
        } else {
            // Переключение при клике
            npc.showTrueForm = !npc.showTrueForm;
        }
        npc.visual = npc.showTrueForm ? npc.changelingTrueForm : npc.changelingDisguiseForm;
    } 
    // Логика для всех остальных
    else if (!npc.visual) {
        npc.visual = generateVisualForRace(npc);
    }

    // Сохраняем результат в NPC и в LocalStorage
    squad[index] = npc;
    localStorage.setItem('npcSquad', JSON.stringify(squad));

    // Вставляем SVG
    svgContainer.innerHTML = npc.visual;

    // Показываем модальное окно
    modal.classList.remove('modal-hidden');
    modal.classList.add('modal-visible');
}

// ==========================================
// ФУНКЦИЯ ЗАКРЫТИЯ (ВЫНЕСЕНА НАРУЖУ!)
// ==========================================
function closePortrait() {
    const modal = document.getElementById('portrait-modal');
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
}

