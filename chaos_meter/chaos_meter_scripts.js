// Состояние приложения
let appState = {
    chaosLevel: 0 
};

// Градации состояний
const tiers = [
    { max: 15, text: "Святоши", className: "status-saint" },
    { max: 40, text: "Бывает и хуже", className: "status-questionable" },
    { max: 70, text: "Анархисты", className: "status-anarchy" },
    { max: 90, text: "Угроза королевству", className: "status-menace" },
    { max: 100, text: "Абсолютные Маньяки", className: "status-apocalypse" }
];

// Автономный ключ localStorage для изоляции данных от других окон/приложений
const STORAGE_KEY = 'dnd_chaos_meter_state';

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            appState = JSON.parse(saved);
        } catch (e) {
            console.error("Ошибка при чтении хранологища Chaos Meter", e);
        }
    }
    updateUI();
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function updateUI() {
    const level = appState.chaosLevel;
    
    // Обновляем текст процентов
    document.getElementById('chaos-percentage').textContent = `${level}%`;
    
    // Движение слева направо (-90deg до +90deg)
    const angle = -90 + (level * 1.8);
    document.getElementById('gauge-needle').style.transform = `rotate(${angle}deg)`;
    
    // Обновляем плашку текстового статуса
    const statusBadge = document.getElementById('chaos-status');
    const currentTier = tiers.find(t => level <= t.max) || tiers[tiers.length - 1];
    
    statusBadge.textContent = currentTier.text;
    statusBadge.className = 'status-badge ' + currentTier.className;
}

function changeChaos(amount) {
    let newLevel = appState.chaosLevel + amount;
    
    // Ограничение лимитов шкалы
    if (newLevel > 100) newLevel = 100;
    if (newLevel < 0) newLevel = 0;
    
    if (appState.chaosLevel !== newLevel) {
        appState.chaosLevel = newLevel;
        saveState();
        updateUI();
    }
}

function resetAll() {
    if (confirm("Обнулить уровень хаоса партии до 0%?")) {
        appState.chaosLevel = 0;
        saveState();
        updateUI();
    }
}

// Старт при загрузке документа
window.addEventListener('DOMContentLoaded', loadState);