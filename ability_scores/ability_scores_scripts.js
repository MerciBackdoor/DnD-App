// Map mapping skills and saves to their primary core attribute keyword
const skillToAbilityMap = {
  'STR-save': 'STR', 'athletics': 'STR',
  'DEX-save': 'DEX', 'acrobatic': 'DEX', 'sleight': 'DEX', 'stealth': 'DEX',
  'CON-save': 'CON',
  'INT-save': 'INT', 'investigation': 'INT', 'history': 'INT', 'arcana': 'INT', 'nature': 'INT', 'religion': 'INT',
  'WIS-save': 'WIS', 'perception': 'WIS', 'survival': 'WIS', 'medicine': 'WIS', 'insight': 'WIS', 'animal': 'WIS',
  'CHA-save': 'CHA', 'performance': 'CHA', 'intimidation': 'CHA', 'deception': 'CHA', 'persuasion': 'CHA'
};

// Formats a calculation number cleanly with a prefixing sign symbol
function formatMod(val) {
  return val >= 0 ? `+${val}` : `${val}`;
}

// Obtains the explicit D&D rule value modifier from an attribute score
function getModifier(score) {
  return Math.floor((score - 10) / 2);
}

// Maps level brackets to respective competency bonus limits
function getProficiencyBonus(level) {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9)  return 4;
  if (level >= 5)  return 3;
  return 2;
}

// Evaluates the full character sheet data changes on the fly
function calculateSheet() {
  const level = parseInt(document.getElementById('char-level').value) || 1;
  const profBonus = getProficiencyBonus(level);
  
  document.getElementById('prof-bonus').textContent = `+${profBonus}`;

  const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  const mods = {};

  // Process core attribute blocks
  abilities.forEach(ab => {
    const scoreEl = document.getElementById(`score-${ab}`);
    let score = parseInt(scoreEl.value);
    if (isNaN(score)) score = 10;
    
    const mod = getModifier(score);
    mods[ab] = mod;
    
    document.getElementById(`mod-${ab}`).textContent = formatMod(mod);
  });

  // Evaluate skills using their tri-state tracker value
  Object.keys(skillToAbilityMap).forEach(skillId => {
    const coreAbility = skillToAbilityMap[skillId];
    const baseMod = mods[coreAbility];
    const dotEl = document.getElementById(`prof-${skillId}`);
    const state = parseInt(dotEl.getAttribute('data-state')) || 0;
    
    // state 0 = none, state 1 = single proficiency, state 2 = double proficiency (expertise)
    const finalValue = baseMod + (state * profBonus);
    document.getElementById(`val-${skillId}`).textContent = formatMod(finalValue);
  });

  // Passive Perception computation
  const wisMod = mods['WIS'];
  const perceptionDot = document.getElementById('prof-perception');
  const perceptionState = parseInt(perceptionDot.getAttribute('data-state')) || 0;
  const passivePerceptionVal = 10 + wisMod + (perceptionState * profBonus);
  document.getElementById('passive-perception').textContent = passivePerceptionVal;

  // Spellcasting calculation adjustments
  const spellAb = document.getElementById('spell-ability').value;
  const spellModEl = document.getElementById('spell-mod');
  const spellDcEl = document.getElementById('spell-dc');
  const spellAttackEl = document.getElementById('spell-attack');

  if (spellAb === 'NONE') {
    spellModEl.textContent = "+0";
    spellDcEl.textContent = "10";
    spellAttackEl.textContent = "+2";
  } else {
    const sMod = mods[spellAb];
    spellModEl.textContent = formatMod(sMod);
    spellDcEl.textContent = 8 + profBonus + sMod;
    spellAttackEl.textContent = formatMod(profBonus + sMod);
  }

  saveDataToStorage();
}

// Mapping of display names for the exported character card
const skillDisplayNames = {
  'STR-save': 'Спасбросок (STR)', 'athletics': 'Атлетика',
  'DEX-save': 'Спасбросок (DEX)', 'acrobatic': 'Акробатика', 'sleight': 'Ловкость рук', 'stealth': 'Скрытность',
  'CON-save': 'Спасбросок (CON)',
  'INT-save': 'Спасбросок (INT)', 'investigation': 'Анализ', 'history': 'История', 'arcana': 'Магия', 'nature': 'Природа', 'religion': 'Религия',
  'WIS-save': 'Спасбросок (WIS)', 'perception': 'Восприятие', 'survival': 'Выживание', 'medicine': 'Медицина', 'insight': 'Проницательность', 'animal': 'Уход за животными',
  'CHA-save': 'Спасбросок (CHA)', 'performance': 'Выступление', 'intimidation': 'Запугивание', 'deception': 'Обман', 'persuasion': 'Убеждение'
};

// Assembles a payload object structure to broadcast to the desktop shell environment
function buildCharacterCard() {
  // Extract all skills and their computed values based on current DOM state
  const extractedSkills = Object.keys(skillToAbilityMap).map(skillId => {
    const dotEl = document.getElementById(`prof-${skillId}`);
    return {
      id: skillId,
      name: skillDisplayNames[skillId],
      val: document.getElementById(`val-${skillId}`).textContent,
      state: parseInt(dotEl.getAttribute('data-state')) || 0
    };
  });

  const data = {
    name: document.getElementById('char-name').value.trim() || "Безымянный Герой",
    class: document.getElementById('char-class').value.trim() || "Обыватель",
    subclass: document.getElementById('char-subclass').value.trim() || "",
    race: document.getElementById('char-race').value.trim() || "Человек",
    level: document.getElementById('char-level').value,
    profBonus: document.getElementById('prof-bonus').textContent,
    passivePerception: document.getElementById('passive-perception').textContent,
    spellDC: document.getElementById('spell-dc').textContent,
    spellAttack: document.getElementById('spell-attack').textContent,
    spellBase: document.getElementById('spell-ability').value,
    
    modifiers: {
      STR: document.getElementById('mod-STR').textContent,
      DEX: document.getElementById('mod-DEX').textContent,
      CON: document.getElementById('mod-CON').textContent,
      INT: document.getElementById('mod-INT').textContent,
      WIS: document.getElementById('mod-WIS').textContent,
      CHA: document.getElementById('mod-CHA').textContent
    },

    skills: extractedSkills
  };

  // Dispatch the structured payload to the parent window
  window.parent.postMessage({
    type: 'dnd-desktop-create-card',
    character: data
  }, '*');
}

// Stores application input state profiles to localized storage safely
function saveDataToStorage() {
  const state = {
    textFields: {
      name: document.getElementById('char-name').value,
      class: document.getElementById('char-class').value,
      subclass: document.getElementById('char-subclass').value,
      race: document.getElementById('char-race').value,
      level: document.getElementById('char-level').value,
      spellAbility: document.getElementById('spell-ability').value
    },
    scores: {},
    profs: {}
  };

  ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].forEach(ab => {
    state.scores[ab] = document.getElementById(`score-${ab}`).value;
  });

  Object.keys(skillToAbilityMap).forEach(skillId => {
    const dotEl = document.getElementById(`prof-${skillId}`);
    state.profs[skillId] = dotEl.getAttribute('data-state') || "0";
  });

  localStorage.setItem('dnd_ability_scores_compact_data', JSON.stringify(state));
}

// Recovers application dataset parameters from storage limits smoothly
function loadDataFromStorage() {
  const saved = localStorage.getItem('dnd_ability_scores_compact_data');
  if (!saved) return;

  try {
    const state = JSON.parse(saved);
    
    if(state.textFields) {
      document.getElementById('char-name').value = state.textFields.name || '';
      document.getElementById('char-class').value = state.textFields.class || '';
      document.getElementById('char-subclass').value = state.textFields.subclass || '';
      document.getElementById('char-race').value = state.textFields.race || '';
      document.getElementById('char-level').value = state.textFields.level || 1;
      document.getElementById('spell-ability').value = state.textFields.spellAbility || 'NONE';
    }

    if(state.scores) {
      Object.keys(state.scores).forEach(ab => {
        const el = document.getElementById(`score-${ab}`);
        if(el) el.value = state.scores[ab];
      });
    }

    if(state.profs) {
      Object.keys(state.profs).forEach(skillId => {
        const el = document.getElementById(`prof-${skillId}`);
        if(el) el.setAttribute('data-state', state.profs[skillId]);
      });
    }
  } catch (e) {
    console.error("Failed to parse sheet data from local storage", e);
  }
}


// Полностью сбрасывает лист персонажа до состояния по умолчанию
function resetSheet() {
  // Очистка текстовых полей
  document.getElementById('char-name').value = '';
  document.getElementById('char-class').value = '';
  document.getElementById('char-subclass').value = '';
  document.getElementById('char-race').value = '';
  
  // Сброс уровня и магии
  document.getElementById('char-level').value = 1;
  document.getElementById('spell-ability').value = 'NONE';
  
  // Сброс характеристик на базовые 10
  ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].forEach(ab => {
    document.getElementById(`score-${ab}`).value = 10;
  });
  
  // Снятие всех галочек (возврат data-state в 0)
  document.querySelectorAll('.prof-dot').forEach(dot => {
    dot.setAttribute('data-state', '0');
  });
  
  // Пересчет листа (функция calculateSheet автоматически сохранит чистый стейт в localStorage)
  calculateSheet();
}

// Initializing event listeners across dynamic target interaction fields
function initApp() {
  loadDataFromStorage();

  // Setup tri-state logic toggles on custom indicators
  document.querySelectorAll('.prof-dot').forEach(dot => {
    dot.addEventListener('click', function() {
      let currentState = parseInt(this.getAttribute('data-state')) || 0;
      let nextState = (currentState + 1) % 3; // Cycles seamlessly 0 -> 1 -> 2 -> 0
      this.setAttribute('data-state', nextState);
      calculateSheet();
    });
  });

  // Track field changes for normal inputs
  const liveInputs = document.querySelectorAll('input[type="number"], input[type="text"], select');
  liveInputs.forEach(input => {
    input.addEventListener('input', calculateSheet);
    input.addEventListener('change', calculateSheet);
  });

  calculateSheet();
}

document.addEventListener('DOMContentLoaded', initApp);