let currentMinutes = parseInt(localStorage.getItem('dnd_clock_minutes')) || 360; 
let currentDay = parseInt(localStorage.getItem('dnd_clock_day')) || 1;

const timePhases = [
    { name: "Полночь",  start: 0,    end: 300,  className: "phase-midnight",  color: "#5f76ff" },
    { name: "Рассвет",  start: 300,  end: 420,  className: "phase-dawn",      color: "#ff9f5f" },
    { name: "Утро",     start: 420,  end: 720,  className: "phase-morning",   color: "#ffeb60" },
    { name: "День",     start: 720,  end: 1020, className: "phase-afternoon", color: "#60bfff" },
    { name: "Сумерки",  start: 1020, end: 1140, className: "phase-dusk",      color: "#ff6080" },
    { name: "Ночь",     start: 1140, end: 1440, className: "phase-night",     color: "#a060ff" }
];

function saveState() {
    localStorage.setItem('dnd_clock_minutes', currentMinutes);
    localStorage.setItem('dnd_clock_day', currentDay);
}

function changeTime(amount) {
    currentMinutes += amount;

    while (currentMinutes >= 1440) {
        currentMinutes -= 1440;
        currentDay++;
    }

    while (currentMinutes < 0) {
        currentMinutes += 1440;
        currentDay--;
        if (currentDay < 1) {
            currentDay = 1;
            currentMinutes = 0;
        }
    }

    saveState();
    updateClockUI();
}

function changeDay(amount) {
    currentDay += amount;
    if (currentDay < 1) currentDay = 1;
    saveState();
    updateClockUI();
}

function updateClockUI() {
    const hours = Math.floor(currentMinutes / 60);
    const mins = currentMinutes % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    document.getElementById("time-display").innerText = formattedTime;
    document.getElementById("day-display").innerText = currentDay;

    const rotationDegrees = (currentMinutes / 1440) * 360;
    document.getElementById("celestial-disc").style.transform = `rotate(${rotationDegrees}deg)`;

    const currentPhase = timePhases.find(p => currentMinutes >= p.start && currentMinutes < p.end) || timePhases[0];
    
    const phaseDisplayElement = document.getElementById("phase-display");
    phaseDisplayElement.innerText = currentPhase.name;
    phaseDisplayElement.style.color = currentPhase.color;

    const backboard = document.getElementById("sky-backboard");
    backboard.className = "sky-bg";
    backboard.classList.add(currentPhase.className);
}

window.onload = function() {
    updateClockUI();
};