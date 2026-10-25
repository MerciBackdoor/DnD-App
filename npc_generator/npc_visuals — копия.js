// Словарь всех доступных генераторов
const raceGenerators = {
    'ааракокра': generateAarakocraSVG,
    'дварф': generateDwarfSVG,
    'гоблин': generateGoblinSVG,
    'человек': generateHumanSVG,
    'тифлинг': generateTieflingSVG,
    'голиаф': generateGoliathSVG,
    'кобольд': generateKoboldSVG,
    'драконорождённый': generateDragonbornSVG,
    'табакси': generateTabaxiSVG,
    'эльф': (gender) => generateElfBaseSVG(gender, false),
    'эльф (астральный)': (gender) => generateElfBaseSVG(gender, true),
    'хобгоблин': generateHobgoblinSVG,
    'тортл': generateTortleSVG,
    'аасимар': generateAasimarSVG,
    'авен': generateAvenSVG,
    'автогном': generateAutognomeSVG,
    'багбир': generateBugbearSVG,
    'ведалкен': generateVedalkenSVG,
    'вердан': generateVerdanSVG,
    'гибрид симиков': generateSimicHybridSVG,
    'гит': generateGithSVG,
    'гифф': generateGiffSVG,
    'гном': generateGnomeSVG,
    'грунг': generateGrungSVG,
    'дженази': generateGenasiSVG,
    'калаштар': generateKalashtarSVG,
    'кендер': generateKenderSVG,
    'кенку': generateKenkuSVG,
    'кентавр': generateCentaurSVG,
    'кованый': generateWarforgedSVG,
    'леонин': generateLeoninSVG,
    'локата': generateLocathahSVG,
    'локсодон': generateLoxodonSVG,
    'людоящер': generateLizardfolkSVG,
    'изменяющиеся': generateChangelingLogic, // Особая функция-тумблер
    'минотавр': generateMinotaurSVG,
    'нага': generateNagaSVG,
    'орк': generateOrcSVG,
    'плазмоид': generatePlasmoidSVG,
    'полуорк': generateHalfOrcSVG,
    'полурослик': generateHalflingSVG,
    'кендер': generateKenderSVG,
    'полуэльф': generateHalfElfSVG,
    'сатир': generateSatyrSVG,
    'совлин': generateOwlinSVG,
    'три-крин': generateThriKreenSVG,
    'тритон': generateTritonSVG,
    'фэйри': generateFairySVG,
    'фирболг': generateFirbolgSVG,
    'хадози': generateHadozeeSVG,
    'харенгон': generateHarengonSVG,
    'хенра': generateKhenraSVG,
    'шифтер': generateShifterSVG,
    'юань-ти': generateYuanTiSVG
};


// Главная функция, которая определяет, какую расу рисовать
// Главная функция, которая определяет, какую расу рисовать
function generateVisualForRace(npc) {
    const race = npc.race.toLowerCase().trim();
    const generator = raceGenerators[race];
    
    if (generator) {
        // Передаем и пол, и сам объект npc для особых случаев (как Изменяющийся)
        return generator(npc.gender, npc);
    }
    
    return `<p style="color: #888; text-align: center; margin-top: 50px;">Визуализация для расы "${npc.race}" пока не добавлена.</p>`;
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateClothingVariants(colors, style = 'robe') {
    const main = pick(colors);
    const secondary = pick(colors);
    const accent = pick(colors);

    const variants = {
        robe: `
            <path d="M 50 150 L 150 150 L 165 300 L 35 300 Z" fill="${main}" stroke="#111" stroke-width="1.5"/>
            <path d="M 75 150 L 125 150 L 100 230 Z" fill="${secondary}" opacity="0.6"/>
        `,

        tunic: `
            <path d="M 55 150 L 145 150 L 155 300 L 45 300 Z" fill="${main}" stroke="#111" stroke-width="1.5"/>
            <rect x="78" y="165" width="44" height="70" fill="${secondary}" opacity="0.5"/>
            <line x1="100" y1="150" x2="100" y2="280" stroke="${accent}" stroke-width="3"/>
        `,

        tribal: `
            <path d="M 60 150 L 140 150 L 150 300 L 50 300 Z" fill="${main}" stroke="#111" stroke-width="1.5"/>
            <path d="M 70 180 L 130 180" stroke="${secondary}" stroke-width="6"/>
            <path d="M 80 220 L 120 220" stroke="${accent}" stroke-width="6"/>
        `,

        noble: `
            <path d="M 45 150 L 155 150 L 170 300 L 30 300 Z" fill="${main}" stroke="#111" stroke-width="2"/>
            <path d="M 65 150 L 100 220 L 135 150" fill="${secondary}" opacity="0.6"/>
            <circle cx="100" cy="180" r="7" fill="${accent}"/>
        `,

        armor: `
            <path d="M 55 150 L 145 150 L 155 300 L 45 300 Z" fill="${main}" stroke="#111" stroke-width="1.5"/>
            <rect x="70" y="160" width="60" height="35" fill="${secondary}" stroke="#111"/>
            <circle cx="80" cy="178" r="4" fill="${accent}"/>
            <circle cx="120" cy="178" r="4" fill="${accent}"/>
        `
    };

    return variants[style] || variants.robe;
}

function generateBackHair(headX, headY, hairColor, race = 'human') {
    const style = Math.floor(Math.random() * 6);

    if (style === 0) {
        return `<path d="M ${headX-40} ${headY-30} Q ${headX} ${headY-70} ${headX+40} ${headY-30} L ${headX+35} ${headY+110} L ${headX-35} ${headY+110} Z" fill="${hairColor}"/>`;
    }

    if (style === 1) {
        return `
            <path d="M ${headX-45} ${headY-20} Q ${headX} ${headY-80} ${headX+45} ${headY-20} L ${headX+25} ${headY+120} L ${headX-25} ${headY+120} Z" fill="${hairColor}"/>
            <path d="M ${headX-50} ${headY+10} Q ${headX-65} ${headY+80} ${headX-40} ${headY+120}" fill="none" stroke="${hairColor}" stroke-width="12" stroke-linecap="round"/>
            <path d="M ${headX+50} ${headY+10} Q ${headX+65} ${headY+80} ${headX+40} ${headY+120}" fill="none" stroke="${hairColor}" stroke-width="12" stroke-linecap="round"/>
        `;
    }

    if (style === 2) {
        return `<path d="M ${headX-35} ${headY-15} Q ${headX} ${headY-55} ${headX+35} ${headY-15} L ${headX+20} ${headY+70} L ${headX-20} ${headY+70} Z" fill="${hairColor}"/>`;
    }

    if (style === 3) {
        return `
            <path d="M ${headX-30} ${headY-20} Q ${headX} ${headY-65} ${headX+30} ${headY-20}" fill="none" stroke="${hairColor}" stroke-width="22" stroke-linecap="round"/>
            <path d="M ${headX} ${headY+5} L ${headX} ${headY+100}" stroke="${hairColor}" stroke-width="16" stroke-linecap="round"/>
        `;
    }

    if (style === 4) {
        return `
            <path d="M ${headX-40} ${headY-10} Q ${headX} ${headY-70} ${headX+40} ${headY-10}" fill="none" stroke="${hairColor}" stroke-width="24" stroke-linecap="round"/>
            <path d="M ${headX-20} ${headY+20} Q ${headX-40} ${headY+90} ${headX-10} ${headY+130}" fill="none" stroke="${hairColor}" stroke-width="12" stroke-linecap="round"/>
            <path d="M ${headX+20} ${headY+20} Q ${headX+40} ${headY+90} ${headX+10} ${headY+130}" fill="none" stroke="${hairColor}" stroke-width="12" stroke-linecap="round"/>
        `;
    }
}

// ==========================================
// ГЕНЕРАТОР: ДВАРФ (Точечные исправления)
// ==========================================
function generateDwarfSVG(gender) {
    const isMale = gender === 'Мужчина';
    const hairColors = ['#d35400', '#8b4513', '#3e2723', '#7f8c8d', '#e67e22'];
    const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    
    // ИСПРАВЛЕНИЕ: Разнообразие цветов одежды
    const tunicColors = ['#7f8c8d', '#2c3e50', '#8b0000', '#27ae60', '#b8860b'];
    const tunicColor = tunicColors[Math.floor(Math.random() * tunicColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- ИСПРАВЛЕНИЕ: Фоновые волосы для женщин (ДО лица) -->
            ${!isMale ? `<path d="M 55 70 Q 100 20 145 70 L 155 150 L 45 150 Z" fill="${hairColor}"/>` : ''}

            <!-- Коренастое тело -->
            <path d="M 40 140 L 160 140 L 140 280 L 60 280 Z" fill="${tunicColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Броня -->
            <path d="M 50 140 L 150 140 L 120 200 L 80 200 Z" fill="#95a5a6" stroke="#111" stroke-width="2"/>
            <circle cx="80" cy="155" r="8" fill="#f1c40f"/>
            <circle cx="120" cy="155" r="8" fill="#f1c40f"/>

            <!-- Короткие толстые руки -->
            <rect x="20" y="140" width="25" height="60" fill="#f5cba7" stroke="#111" stroke-width="2"/>
            <rect x="155" y="140" width="25" height="60" fill="#f5cba7" stroke="#111" stroke-width="2"/>

            <!-- ИСПРАВЛЕНИЕ: Голова (женщины чуть менее широколицые) -->
            <ellipse cx="100" cy="95" rx="${isMale ? 35 : 30}" ry="40" fill="#f5cba7" stroke="#111" stroke-width="2"/>
            
            <!-- Глаза -->
            <circle cx="85" cy="85" r="4" fill="#111"/>
            <circle cx="115" cy="85" r="4" fill="#111"/>
            
            <!-- Большой нос -->
            <ellipse cx="100" cy="95" rx="10" ry="8" fill="#e6b0aa" stroke="#111" stroke-width="1.5"/>

            ${isMale ? `
                <!-- Плотная дварфийская борода -->
                <path d="M 65 100 L 135 100 L 130 160 L 100 180 L 70 160 Z" fill="${hairColor}" stroke="#111" stroke-width="1"/>
                <path d="M 75 105 Q 100 95 125 105 Q 130 115 100 110 Q 70 115 75 105 Z" fill="${hairColor}" stroke="#111" stroke-width="1"/>
                <!-- Бусины в бороде -->
                <circle cx="85" cy="140" r="4" fill="#f1c40f" stroke="#111"/>
                <circle cx="115" cy="140" r="4" fill="#f1c40f" stroke="#111"/>
                
                <!-- Мужской шлем -->
                <path d="M 60 70 Q 100 30 140 70 L 145 75 L 55 75 Z" fill="#bdc3c7" stroke="#111" stroke-width="2"/>
            ` : `
                <!-- Женская улыбка -->
                <path d="M 90 115 Q 100 125 110 115" fill="none" stroke="#111" stroke-width="2"/>
            `}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ААРАКОКРА
// ==========================================
function generateAarakocraSVG(gender) {
    const isMale = gender === 'Мужчина';
    
    // Палитры согласно лору
    const maleColors = ['#e74c3c', '#d35400', '#f39c12', '#c0392b']; 
    const femaleColors = ['#795548', '#5d4037', '#8d6e63', '#7f8c8d', '#95a5a6']; 
    
    const palette = isMale ? maleColors : femaleColors;
    
    const mainColor = palette[Math.floor(Math.random() * palette.length)];
    const secColor = palette[Math.floor(Math.random() * palette.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <line x1="85" y1="200" x2="85" y2="260" stroke="#e67e22" stroke-width="4"/>
            <line x1="115" y1="200" x2="115" y2="260" stroke="#e67e22" stroke-width="4"/>
            
            <path d="M 85 260 L 75 270 M 85 260 L 85 275 M 85 260 L 95 270" stroke="#e67e22" stroke-width="3" fill="none"/>
            <path d="M 115 260 L 105 270 M 115 260 L 115 275 M 115 260 L 125 270" stroke="#e67e22" stroke-width="3" fill="none"/>
            
            <ellipse cx="100" cy="150" rx="45" ry="65" fill="${mainColor}" />
            
            <path d="M 55 120 Q 20 180 55 220" fill="${secColor}" stroke="#1e1f22" stroke-width="2"/>
            <path d="M 145 120 Q 180 180 145 220" fill="${secColor}" stroke="#1e1f22" stroke-width="2"/>
            
            <circle cx="100" cy="80" r="28" fill="${mainColor}" />
            
            <path d="M 120 75 Q 150 75 140 100 Q 125 95 110 88 Z" fill="#f1c40f" stroke="#d35400" stroke-width="1"/>
            
            <circle cx="110" cy="73" r="5" fill="#111" />
            <circle cx="111" cy="71" r="2" fill="#fff" />
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ГОБЛИН
// ==========================================
function generateGoblinSVG(gender) {
    const isMale = gender === 'Мужчина';
    const skinColors = ['#d4ac0d', '#ca6f1e', '#ba4a00', '#cb4335', '#e59866'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const clothColors = ['#5d4037', '#455a64', '#784212', '#112211'];
    const clothColor = clothColors[Math.floor(Math.random() * clothColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="120" width="100" height="180" rx="20" fill="${clothColor}" stroke="#111" stroke-width="2"/>
            
            <path d="M 50 140 L 35 230 L 30 260" fill="none" stroke="${skinColor}" stroke-width="12" stroke-linecap="round"/>
            <path d="M 150 140 L 165 230 L 170 260" fill="none" stroke="${skinColor}" stroke-width="12" stroke-linecap="round"/>
            <path d="M 30 260 L 25 270 M 30 260 L 30 273 M 30 260 L 35 270" stroke="#eee" stroke-width="2"/>
            <path d="M 170 260 L 165 270 M 170 260 L 170 273 M 170 260 L 175 270" stroke="#eee" stroke-width="2"/>

            <polygon points="65,90 15,70 60,110" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <polygon points="135,90 185,70 140,110" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <ellipse cx="100" cy="100" rx="40" ry="32" fill="${skinColor}" stroke="#111" stroke-width="2" />

            <ellipse cx="85" cy="95" rx="10" ry="6" fill="#f1c40f" />
            <line x1="85" y1="89" x2="85" y2="101" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
            <ellipse cx="115" cy="95" rx="10" ry="6" fill="#f1c40f" />
            <line x1="115" y1="89" x2="115" y2="101" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>

            <path d="M 92 102 Q 100 108 108 102" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="3"/>
            <path d="M 75 115 Q 100 135 125 115 Z" fill="#4a0000" stroke="#111" stroke-width="1.5"/>
            <polygon points="85,116 88,122 91,116" fill="#fff"/>
            <polygon points="115,116 112,122 109,116" fill="#fff"/>
            <path d="M 70 75 Q 100 65 130 75 Q 100 85 70 75" fill="#271c19" />
        </svg>
    `;
}
// ==========================================
// ГЕНЕРАТОР: ЧЕЛОВЕК
// ==========================================
function generateHumanSVG(gender) {
    const isMale = gender === 'Мужчина';
    const skinColors = ['#fdd9b5', '#ffdbac', '#e0ac69', '#c68642', '#8d5524', '#3c2016', '#221108'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const hairColors = ['#1a1a1a', '#4a3728', '#bfa36f', '#debe93', '#a84325'];
    const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    const clothColor = ['#2980b9', '#27ae60', '#8e44ad', '#c0392b', '#d35400'][Math.floor(Math.random() * 5)];

    let faceDetail = '';
    let backHair = `<circle cx="100" cy="80" r="45" fill="${hairColor}" />`;

    if (isMale) {
        const beardStyle = Math.random();
        if (beardStyle > 0.6) {
            faceDetail = `<path d="M 65 110 Q 100 170 135 110 Q 100 130 65 110" fill="${hairColor}" opacity="0.9"/>`;
        } else if (beardStyle > 0.3) {
            faceDetail = `<path d="M 70 115 Q 100 140 130 115" fill="none" stroke="${hairColor}" stroke-width="5" opacity="0.6" stroke-linecap="round"/>`;
        }
    } else {
        // Длинные волосы женщин теперь генерируются отдельным путем, чтобы уйти НА ЗАДНИЙ ПЛАН
        backHair += `
            <path d="M 55 80 Q 30 160 55 220 L 70 220 Q 50 160 75 80 Z" fill="${hairColor}"/>
            <path d="M 145 80 Q 170 160 145 220 L 130 220 Q 150 160 125 80 Z" fill="${hairColor}"/>
        `;
    }

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            ${backHair}

            <rect x="85" y="110" width="30" height="50" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <path d="M 40 150 L 160 150 L 180 300 L 200 300 L 0 300 Z" fill="${clothColor}" stroke="#111" stroke-width="1.5"/>
            
            <ellipse cx="100" cy="95" rx="38" ry="48" fill="${skinColor}" stroke="#111" stroke-width="1.5" />
            
            <ellipse cx="85" cy="90" rx="6" ry="4" fill="#fff" stroke="#111"/>
            <circle cx="85" cy="90" r="3" fill="#4a2711" />
            <ellipse cx="115" cy="90" rx="6" ry="4" fill="#fff" stroke="#111"/>
            <circle cx="115" cy="90" r="3" fill="#4a2711" />
            <path d="M 100 88 L 100 102 L 104 102" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="2" stroke-linecap="round"/>
            <path d="M 90 120 Q 100 126 110 120" fill="none" stroke="#b05245" stroke-width="2.5" stroke-linecap="round"/>
            
            <path d="M 63 75 Q 100 45 137 75" fill="none" stroke="${hairColor}" stroke-width="10" stroke-linecap="round" />
            ${faceDetail}
        </svg>
    `;
}

// ==========================================
// ИСПРАВЛЕНО: ТИФЛИНГ (Волосы перенесены на задний план)
// ==========================================
function generateTieflingSVG(gender) {
    const isMale = gender === 'Мужчина';
    const skinColors = ['#c0392b', '#922b21', '#cd6155', '#7b241c', '#e0ac69', '#c68642'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const eyeColors = ['#111111', '#e74c3c', '#ffffff', '#ecf0f1', '#f1c40f'];
    const eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    const hairColors = ['#111116', '#2c1a36', '#1b263b', '#4a0e17', '#4d1354'];
    const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    const hornTypes = ['ram', 'straight', 'spiral'];
    const hornType = hornTypes[Math.floor(Math.random() * hornTypes.length)];
    
    let hornsSVG = '';
    if (hornType === 'ram') {
        hornsSVG = `<path d="M 75 55 Q 30 10 20 50 Q 40 70 70 60" fill="#2c3e50" stroke="#111" stroke-width="1.5"/><path d="M 125 55 Q 170 10 180 50 Q 160 70 130 60" fill="#2c3e50" stroke="#111" stroke-width="1.5"/>`;
    } else if (hornType === 'straight') {
        hornsSVG = `<path d="M 72 52 L 40 -10 L 60 45" fill="#34495e" stroke="#111" stroke-width="1.5"/><path d="M 128 52 L 160 -10 L 140 45" fill="#34495e" stroke="#111" stroke-width="1.5"/>`;
    } else {
        hornsSVG = `<path d="M 72 52 Q 50 15 60 0 Q 45 20 66 48" fill="#1a252f" stroke="#111" stroke-width="2"/><path d="M 128 52 Q 150 15 140 0 Q 155 20 134 48" fill="#1a252f" stroke="#111" stroke-width="2"/>`;
    }

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 60 60 Q 100 30 140 60 L 155 240 Q 100 200 45 240 Z" fill="${hairColor}"/>
            <path d="M 100 270 Q 160 280 170 230 Q 180 180 160 190" fill="none" stroke="${skinColor}" stroke-width="10" stroke-linecap="round"/>
            
            <rect x="85" y="110" width="30" height="50" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <path d="M 50 150 L 150 150 L 170 300 L 30 300 Z" fill="#212f3d" stroke="#111"/>

            ${hornsSVG}
            <ellipse cx="100" cy="95" rx="36" ry="46" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            
            <ellipse cx="85" cy="90" rx="8" ry="5" fill="${eyeColor}" stroke="rgba(0,0,0,0.4)"/>
            <ellipse cx="115" cy="90" rx="8" ry="5" fill="${eyeColor}" stroke="rgba(0,0,0,0.4)"/>

            <path d="M 85 115 Q 100 130 115 115 Z" fill="#fff" stroke="#111" stroke-width="1"/>
            <line x1="93" y1="117" x2="93" y2="122" stroke="#444" stroke-width="1"/>
            <line x1="107" y1="117" x2="107" y2="122" stroke="#444" stroke-width="1"/>

            <path d="M 66 70 Q 100 55 134 70" fill="none" stroke="${hairColor}" stroke-width="6" stroke-linecap="round"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ГОЛИАФ
// ==========================================
function generateGoliathSVG(gender) {
    // Кожа каменных и землистых оттенков
    const skinColors = ['#bdc3c7', '#95a5a6', '#7f8c8d', '#566573', '#7b7d7d', '#a6acaf'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    
    // Ритуальные отметки / трещины на камне (синие или темные)
    const patternColors = ['rgba(41, 128, 185, 0.4)', 'rgba(0,0,0,0.2)', 'rgba(255,255,255,0.15)'];
    const patColor = patternColors[Math.floor(Math.random() * patternColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 130 L 190 130 L 180 300 L 200 300 L 0 300 Z" fill="#5e483a" stroke="#111" stroke-width="2"/> <path d="M 35 130 L 165 130 L 155 300 L 45 300 Z" fill="#784212" opacity="0.6"/>

            <rect x="75" y="90" width="50" height="50" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <path d="M 60 40 L 140 40 L 145 100 L 130 120 L 70 120 L 55 100 Z" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <path d="M 65 50 Q 80 55 75 80 M 135 60 Q 120 75 130 95 M 100 110 L 115 120" fill="none" stroke="${patColor}" stroke-width="4" stroke-linecap="round"/>

            <rect x="68" y="58" width="28" height="7" fill="rgba(0,0,0,0.25)" rx="2"/>
            <rect x="104" y="58" width="28" height="7" fill="rgba(0,0,0,0.25)" rx="2"/>

            <circle cx="82" cy="68" r="3.5" fill="#111"/>
            <circle cx="118" cy="68" r="3.5" fill="#111"/>
            
            <path d="M 94 65 L 100 88 L 106 65" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="3" stroke-linecap="round"/>

            <line x1="85" y1="102" x2="115" y2="102" stroke="rgba(0,0,0,0.5)" stroke-width="2.5" stroke-linecap="round"/>

            ${gender === 'Женщина' ? `
                <path d="M 60 42 Q 100 25 140 42" fill="none" stroke="#2c3e50" stroke-width="6"/>
            ` : ''}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: КОБОЛЬД
// ==========================================
function generateKoboldSVG(gender) {
    const scaleColors = ['#78281f', '#196f3d', '#7e5109', '#212f3d', '#b03a2e'];
    const scaleColor = scaleColors[Math.floor(Math.random() * scaleColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 60 140 Q 100 120 140 140 L 150 300 L 50 300 Z" fill="#7b7d7d" stroke="#111"/>
            <path d="M 90 180 Q 100 185 110 180 M 85 200 Q 100 205 115 200" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>

            <rect x="85" y="100" width="30" height="55" fill="${scaleColor}" stroke="#111" stroke-width="1"/>

            <polygon points="80,50 70,25 90,45" fill="#222"/>
            <polygon points="120,50 130,25 110,45" fill="#222"/>

            <path d="M 70 70 Q 100 40 130 70 Q 155 95 130 115 Q 100 125 70 115 Q 45 95 70 70 Z" fill="${scaleColor}" stroke="#111" stroke-width="1.5"/>

            <circle cx="80" cy="80" r="9" fill="#f39c12"/>
            <ellipse cx="80" cy="80" rx="2" ry="7" fill="#000"/>
            <circle cx="120" cy="80" r="9" fill="#f39c12"/>
            <ellipse cx="120" cy="80" rx="2" ry="7" fill="#000"/>

            <path d="M 65 100 Q 100 115 135 100" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="2.5"/>
            <path d="M 95 60 Q 100 63 105 60 M 92 68 Q 100 71 108 68" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>

            ${gender === 'Женщина' ? `
                <circle cx="62" cy="95" r="4" fill="none" stroke="#f1c40f" stroke-width="2"/>
                <path d="M 62 99 L 60 115" stroke="#fff" stroke-width="2"/>
            ` : `
                <line x1="72" y1="65" x2="88" y2="95" stroke="#c0392b" stroke-width="2" opacity="0.7" stroke-linecap="round"/>
            `}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ДРАКОНОРОЖДЁННЫЙ
// ==========================================
function generateDragonbornSVG(gender) {
    // Хроматические и металлические цвета чешуи
    const scaleColors = ['#b87333', '#b5a642', '#cd7f32', '#c0392b', '#27ae60', '#2980b9', '#ecf0f1', '#2c3e50', '#f1c40f', '#bdc3c7'];
    const scaleColor = scaleColors[Math.floor(Math.random() * scaleColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30 140 Q 100 120 170 140 L 160 300 L 40 300 Z" fill="${scaleColor}" stroke="#111" stroke-width="2"/>
            <path d="M 40 140 L 160 140 L 130 300 L 70 300 Z" fill="#34495e" opacity="0.8"/>
            
            <path d="M 30 180 L 80 230" stroke="${scaleColor}" stroke-width="20" stroke-linecap="round"/>
            <path d="M 80 230 L 95 235 M 80 230 L 95 245 M 80 230 L 85 255 M 80 230 L 70 250" stroke="#eee" stroke-width="3" stroke-linecap="round"/>
            
            <path d="M 170 180 L 120 230" stroke="${scaleColor}" stroke-width="20" stroke-linecap="round"/>
            <path d="M 120 230 L 105 235 M 120 230 L 105 245 M 120 230 L 115 255 M 120 230 L 130 250" stroke="#eee" stroke-width="3" stroke-linecap="round"/>

            <rect x="75" y="80" width="50" height="70" fill="${scaleColor}" stroke="#111" stroke-width="1.5"/>

            <path d="M 60 50 L 140 50 L 150 90 L 130 120 L 70 120 L 50 90 Z" fill="${scaleColor}" stroke="#111" stroke-width="2"/>
            
            <polygon points="60,50 40,30 70,40" fill="#222"/>
            <polygon points="140,50 160,30 130,40" fill="#222"/>
            
            <path d="M 80 80 Q 100 110 120 80 Z" fill="rgba(0,0,0,0.1)"/>
            <circle cx="75" cy="75" r="5" fill="#000000"/>
            <circle cx="125" cy="75" r="5" fill="#000000"/>
            <circle cx="90" cy="105" r="2" fill="#111"/>
            <circle cx="110" cy="105" r="2" fill="#111"/>
            
            <line x1="85" y1="115" x2="115" y2="115" stroke="#111" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ТАБАКСИ
// ==========================================
function generateTabaxiSVG(gender) {
    const furColors = ['#e67e22', '#f1c40f', '#bdc3c7', '#34495e', '#795548', '#e8daef']; // От рыжего до сфинкса
    const furColor = furColors[Math.floor(Math.random() * furColors.length)];
    
    // Случайный узор: 0 - без узора/сфинкс, 1 - пятна (ягуар), 2 - полосы (тигр)
    const patternType = Math.floor(Math.random() * 3);
    
    let patternSVG = '';
    if (patternType === 1) { // Пятна
        patternSVG = `
            <circle cx="70" cy="60" r="4" fill="rgba(0,0,0,0.4)"/>
            <circle cx="130" cy="60" r="4" fill="rgba(0,0,0,0.4)"/>
            <circle cx="100" cy="45" r="3" fill="rgba(0,0,0,0.4)"/>
            <circle cx="85" cy="140" r="5" fill="rgba(0,0,0,0.4)"/>
            <circle cx="115" cy="155" r="5" fill="rgba(0,0,0,0.4)"/>
        `;
    } else if (patternType === 2) { // Полосы
        patternSVG = `
            <line x1="50" y1="60" x2="70" y2="65" stroke="rgba(0,0,0,0.4)" stroke-width="3" stroke-linecap="round"/>
            <line x1="150" y1="60" x2="130" y2="65" stroke="rgba(0,0,0,0.4)" stroke-width="3" stroke-linecap="round"/>
            <line x1="90" y1="40" x2="110" y2="40" stroke="rgba(0,0,0,0.4)" stroke-width="3" stroke-linecap="round"/>
        `;
    }

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 60 140 Q 100 120 140 140 L 160 300 L 40 300 Z" fill="${furColor}" stroke="#111" stroke-width="1.5"/>
            <path d="M 50 170 L 150 170 L 140 250 L 60 250 Z" fill="#27ae60" opacity="0.8"/>

            <rect x="85" y="100" width="30" height="50" fill="${furColor}" stroke="#111" stroke-width="1.5"/>

            <polygon points="65,55 50,15 85,45" fill="${furColor}" stroke="#111" stroke-width="1.5"/>
            <polygon points="135,55 150,15 115,45" fill="${furColor}" stroke="#111" stroke-width="1.5"/>

            <ellipse cx="100" cy="80" rx="45" ry="40" fill="${furColor}" stroke="#111" stroke-width="1.5"/>

            ${patternSVG}

            <ellipse cx="80" cy="75" rx="10" ry="7" fill="#2ecc71" stroke="#111"/>
            <ellipse cx="80" cy="75" rx="2" ry="6" fill="#000"/>
            
            <ellipse cx="120" cy="75" rx="10" ry="7" fill="#2ecc71" stroke="#111"/>
            <ellipse cx="120" cy="75" rx="2" ry="6" fill="#000"/>

            <polygon points="95,95 105,95 100,102" fill="#e74c3c"/>
            <path d="M 90 108 Q 100 102 100 102 Q 100 102 110 108" fill="none" stroke="#111" stroke-width="2"/>

            <line x1="85" y1="100" x2="50" y2="95" stroke="#fff" stroke-width="1"/>
            <line x1="85" y1="105" x2="50" y2="105" stroke="#fff" stroke-width="1"/>
            <line x1="115" y1="100" x2="150" y2="95" stroke="#fff" stroke-width="1"/>
            <line x1="115" y1="105" x2="150" y2="105" stroke="#fff" stroke-width="1"/>
        </svg>
    `;
}

// ==========================================
// ИСПРАВЛЕНО: ЭЛЬФ / АСТРАЛЬНЫЙ ЭЛЬФ (Волосы перенесены на задний план)
// ==========================================
function generateElfBaseSVG(gender, isAstral) {
    const isMale = gender === 'Мужчина';
    const skinColors = ['#fdd9b5', '#ffdbac', '#e0ac69', '#c68642', '#8d5524', '#b87333', '#cd7f32', '#eaf2f8'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const hairColors = ['#1a1a1a', '#f1c40f', '#debe93', '#2ecc71', '#3498db', '#e74c3c'];
    const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    const eyeColors = ['#ffd700', '#c0c0c0'];
    const eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 70 50 Q 40 150 50 250 L 150 250 Q 160 150 130 50 Z" fill="${hairColor}"/>

            <rect x="90" y="100" width="20" height="50" fill="${skinColor}" stroke="#111" stroke-width="1"/>
            <path d="M 65 140 Q 100 130 135 140 L 145 300 L 55 300 Z" fill="#9b59b6" stroke="#111" stroke-width="1"/>
            <path d="M 80 140 L 120 140 L 100 200 Z" fill="#f1c40f" opacity="0.7"/>

            <path d="M 70 95 L 30 70 L 65 110" fill="${skinColor}" stroke="#111" stroke-width="1"/>
            <path d="M 130 95 L 170 70 L 135 110" fill="${skinColor}" stroke="#111" stroke-width="1"/>
            <ellipse cx="100" cy="90" rx="30" ry="45" fill="${skinColor}" stroke="#111" stroke-width="1"/>

            <ellipse cx="87" cy="85" rx="6" ry="3" fill="${eyeColor}" stroke="#111"/>
            <ellipse cx="113" cy="85" rx="6" ry="3" fill="${eyeColor}" stroke="#111"/>

            ${isAstral ? `
                <circle cx="87" cy="85" r="1.5" fill="#fff"/>
                <path d="M 87 81 L 88 85 L 92 85 L 88 86 L 87 90 L 86 86 L 82 85 L 86 85 Z" fill="#fff"/>
                <circle cx="113" cy="85" r="1.5" fill="#fff"/>
                <path d="M 113 81 L 114 85 L 118 85 L 114 86 L 113 90 L 112 86 L 108 85 L 112 85 Z" fill="#fff"/>
            ` : `
                <circle cx="87" cy="85" r="1.5" fill="#111"/>
                <circle cx="113" cy="85" r="1.5" fill="#111"/>
            `}

            <path d="M 100 85 L 100 100 L 103 100" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
            <path d="M 93 110 Q 100 113 107 110" fill="none" stroke="#e74c3c" stroke-width="1.5"/>

            <path d="M 70 50 Q 100 30 130 50" fill="none" stroke="${hairColor}" stroke-width="15" stroke-linecap="round"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ХОБГОБЛИН
// ==========================================
function generateHobgoblinSVG(gender) {
    const skinColor = '#5d4037'; // Темная кожа
    const furColor = ['#7b241c', '#4a2311', '#1a1a1a'][Math.floor(Math.random() * 3)]; // Красно-коричневая/черная шерсть

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 40 140 Q 100 120 160 140 L 170 300 L 30 300 Z" fill="#2c3e50" stroke="#111" stroke-width="2"/>
            
            <rect x="75" y="90" width="50" height="60" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <path d="M 30 140 Q 100 100 170 140" fill="none" stroke="${furColor}" stroke-width="20" stroke-linecap="round" stroke-dasharray="10, 5"/>

            <rect x="65" y="40" width="70" height="85" rx="15" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            
            <path d="M 60 40 Q 100 10 140 40 L 145 90 L 135 90 L 130 45 L 70 45 L 65 90 L 55 90 Z" fill="${furColor}"/>

            <line x1="68" y1="65" x2="90" y2="72" stroke="#111" stroke-width="4" stroke-linecap="round"/>
            <line x1="132" y1="65" x2="110" y2="72" stroke="#111" stroke-width="4" stroke-linecap="round"/>
            <circle cx="85" cy="75" r="4" fill="#f1c40f"/>
            <circle cx="115" cy="75" r="4" fill="#f1c40f"/>

            <path d="M 75 95 Q 100 115 125 95 Z" fill="#111"/>
            <polygon points="80,95 85,110 90,95" fill="#fff"/>
            <polygon points="95,95 100,110 105,95" fill="#fff"/>
            <polygon points="110,95 115,110 120,95" fill="#fff"/>
        </svg>
    `;
}

// ==========================================
// ИСПРАВЛЕНО: ТОРТЛ (Конечности и передний пластрон)
// ==========================================
function generateTortleSVG(gender) {
    const shellColors = ['#1e8449', '#27ae60', '#8a6a42', '#5d6d7e', '#117a65'];
    const skinColors = ['#a2d9ce', '#7dcea0', '#f5cba7', '#b2babb'];
    const shellColor = shellColors[Math.floor(Math.random() * shellColors.length)];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="180" rx="90" ry="100" fill="${shellColor}" stroke="#111" stroke-width="3"/>
            
            <path d="M 60 250 L 50 300 L 80 300 L 75 250 Z" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <path d="M 140 250 L 150 300 L 120 300 L 125 250 Z" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <polygon points="50,300 55,290 60,300" fill="#eee"/> <polygon points="70,300 75,290 80,300" fill="#eee"/>
            <polygon points="120,300 125,290 130,300" fill="#eee"/> <polygon points="140,300 145,290 150,300" fill="#eee"/>

            <polygon points="65,120 135,120 145,250 100,270 55,250" fill="#e5c88c" stroke="#8a6a42" stroke-width="4"/>
            <line x1="65" y1="120" x2="100" y2="160" stroke="#8a6a42" stroke-width="3"/>
            <line x1="135" y1="120" x2="100" y2="160" stroke="#8a6a42" stroke-width="3"/>
            <line x1="100" y1="160" x2="100" y2="270" stroke="#8a6a42" stroke-width="3"/>
            <line x1="55" y1="200" x2="145" y2="200" stroke="#8a6a42" stroke-width="3"/>

            <path d="M 40 140 Q 10 180 20 230" fill="none" stroke="${skinColor}" stroke-width="20" stroke-linecap="round"/>
            <path d="M 160 140 Q 190 180 180 230" fill="none" stroke="${skinColor}" stroke-width="20" stroke-linecap="round"/>
            <line x1="15" y1="230" x2="15" y2="245" stroke="#eee" stroke-width="3"/> <line x1="25" y1="230" x2="25" y2="245" stroke="#eee" stroke-width="3"/>
            <line x1="175" y1="230" x2="175" y2="245" stroke="#eee" stroke-width="3"/> <line x1="185" y1="230" x2="185" y2="245" stroke="#eee" stroke-width="3"/>

            <path d="M 85 100 Q 100 80 115 100 L 110 120 L 90 120 Z" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <ellipse cx="100" cy="70" rx="25" ry="30" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <circle cx="88" cy="65" r="4" fill="#111"/>
            <circle cx="112" cy="65" r="4" fill="#111"/>
            <path d="M 85 85 Q 100 95 115 85" fill="none" stroke="#111" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ААСИМАР
// ==========================================
function generateAasimarSVG(gender) {
    const skinColors = ['#fdd9b5', '#ffdbac', '#e0ac69', '#c68642'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    
    // Небесные особенности (к6) - выбираем случайно
    const celestialFeature = Math.floor(Math.random() * 6) + 1;
    
    let hairColor = '#bfa36f'; // Стандартный цвет
    let eyeColor = '#fff';
    let extraEffects = '';

    if (celestialFeature === 2) eyeColor = '#f1c40f'; // Светящиеся глаза
    if (celestialFeature === 3) hairColor = ['#3498db', '#9b59b6', '#e74c3c'][Math.floor(Math.random()*3)]; // Яркие волосы
    if (celestialFeature === 5) {
        // Призрачный ореол
        extraEffects += `<ellipse cx="100" cy="30" rx="35" ry="10" fill="none" stroke="#f1c40f" stroke-width="3" opacity="0.8"/>`;
    }
    if (celestialFeature === 6) {
        // Радуга на коже
        extraEffects += `<path d="M 70 80 Q 100 120 130 80" fill="none" stroke="rgba(231, 76, 60, 0.3)" stroke-width="4"/>`;
        extraEffects += `<path d="M 70 85 Q 100 125 130 85" fill="none" stroke="rgba(46, 204, 113, 0.3)" stroke-width="4"/>`;
    }

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 130 Q 10 50 20 200 Q 50 180 100 160 Z" fill="#fff" opacity="0.6" stroke="#f1c40f" stroke-width="2"/>
            <path d="M 100 130 Q 190 50 180 200 Q 150 180 100 160 Z" fill="#fff" opacity="0.6" stroke="#f1c40f" stroke-width="2"/>

            <circle cx="100" cy="80" r="45" fill="${hairColor}" />
            
            <rect x="85" y="110" width="30" height="50" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <path d="M 50 150 L 150 150 L 170 300 L 30 300 Z" fill="#ecf0f1" stroke="#f1c40f" stroke-width="2"/>

            <ellipse cx="100" cy="95" rx="35" ry="45" fill="${skinColor}" stroke="#111" stroke-width="1.5" />
            
            <ellipse cx="85" cy="90" rx="7" ry="4" fill="${eyeColor}" stroke="#111"/>
            <ellipse cx="115" cy="90" rx="7" ry="4" fill="${eyeColor}" stroke="#111"/>
            
            <path d="M 100 88 L 100 102 L 104 102" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2" stroke-linecap="round"/>
            <path d="M 92 120 Q 100 125 108 120" fill="none" stroke="#b05245" stroke-width="2" stroke-linecap="round"/>
            
            ${extraEffects}
            ${celestialFeature === 1 ? `<circle cx="85" cy="105" r="1" fill="#111"/><circle cx="115" cy="105" r="1" fill="#111"/><circle cx="90" cy="108" r="1" fill="#111"/>` : ''} <path d="M 65 75 Q 100 45 135 75" fill="none" stroke="${hairColor}" stroke-width="10" stroke-linecap="round" />
        </svg>
    `;
}
// АВЕН
function generateAvenSVG(gender) {
    const avenType = Math.floor(Math.random() * 2);
    const featherColors = avenType === 0 ? ['#8d6e63', '#5d4037', '#e67e22'] : ['#ecf0f1', '#bdc3c7', '#34495e'];
    const fColor = featherColors[Math.floor(Math.random() * featherColors.length)];

    // Голова опущена ниже, чтобы шея была на 50% короче
    let headY = avenType === 0 ? 110 : 90;

    let headSVG = avenType === 0 ? `
        <path d="M 115 ${headY} Q 150 ${headY-10} 140 ${headY+20} Q 130 ${headY+10} 115 ${headY+5} Z" fill="#f39c12" stroke="#111" stroke-width="1.5"/>
        <circle cx="100" cy="${headY}" r="30" fill="${fColor}" stroke="#111" stroke-width="1.5"/>
        <circle cx="110" cy="${headY-5}" r="4" fill="#f1c40f"/><circle cx="110" cy="${headY-5}" r="2" fill="#000"/>
    ` : `
        <path d="M 115 ${headY} Q 160 ${headY-10} 180 ${headY+30} Q 160 ${headY+20} 115 ${headY+5} Z" fill="#111" stroke="#333" stroke-width="1"/>
        <circle cx="100" cy="${headY}" r="25" fill="${fColor}" stroke="#111" stroke-width="1.5"/>
        <circle cx="110" cy="${headY-5}" r="3" fill="#000"/>
    `;

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 80 140 Q 10 90 20 220 Z" fill="${fColor}" stroke="#111" stroke-width="2"/>
            <path d="M 120 140 Q 190 90 180 220 Z" fill="${fColor}" stroke="#111" stroke-width="2"/>

            <rect x="85" y="${headY + 10}" width="30" height="${145 - (headY + 10)}" fill="${fColor}" stroke="#111" stroke-width="1.5"/>

            <path d="M 60 140 L 140 140 L 150 300 L 50 300 Z" fill="#e0ac69" stroke="#111" stroke-width="1.5"/>
            <path d="M 70 140 L 100 170 L 130 140 Z" fill="${fColor}" stroke="#111" stroke-width="1"/>

            ${headSVG}
        </svg>
    `;
}

// ==========================================
// ИСПРАВЛЕНО: АВТОГНОМ (Короткая шея)
// ==========================================
function generateAutognomeSVG(gender) {
    const metalColors = ['#bdc3c7', '#95a5a6', '#d35400', '#f39c12'];
    const mColor = metalColors[Math.floor(Math.random() * metalColors.length)];
    const eyeColors = ['#3498db', '#e74c3c', '#2ecc71'];
    const eColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <line x1="90" y1="120" x2="90" y2="130" stroke="#333" stroke-width="4"/>
            <line x1="110" y1="120" x2="110" y2="130" stroke="#333" stroke-width="4"/>
            <path d="M 95 120 L 105 130 M 105 120 L 95 130" stroke="#7f8c8d" stroke-width="3"/>

            <rect x="60" y="130" width="80" height="150" rx="20" fill="${mColor}" stroke="#111" stroke-width="2"/>
            
            <circle cx="100" cy="180" r="20" fill="#111" stroke="#333" stroke-width="3"/>
            <circle cx="100" cy="180" r="15" fill="none" stroke="${eColor}" stroke-width="2" stroke-dasharray="5 5"/>
            <circle cx="100" cy="180" r="5" fill="${eColor}"/>

            <circle cx="50" cy="150" r="15" fill="#7f8c8d" stroke="#111" stroke-width="2"/>
            <circle cx="150" cy="150" r="15" fill="#7f8c8d" stroke="#111" stroke-width="2"/>

            <rect x="70" y="50" width="60" height="70" rx="30" fill="${mColor}" stroke="#111" stroke-width="2"/>
            <polygon points="70,80 40,60 70,90" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
            <polygon points="130,80 160,60 130,90" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>

            <circle cx="85" cy="85" r="8" fill="#111"/>
            <circle cx="85" cy="85" r="4" fill="${eColor}"/>
            <circle cx="115" cy="85" r="8" fill="#111"/>
            <circle cx="115" cy="85" r="4" fill="${eColor}"/>

            <rect x="85" y="105" width="30" height="8" rx="2" fill="#111"/>
            <line x1="90" y1="105" x2="90" y2="113" stroke="${mColor}" stroke-width="1"/>
            <line x1="100" y1="105" x2="100" y2="113" stroke="${mColor}" stroke-width="1"/>
            <line x1="110" y1="105" x2="110" y2="113" stroke="${mColor}" stroke-width="1"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: БАГБИР
// ==========================================
function generateBugbearSVG(gender) {
    const furColors = ['#5d4037', '#3e2723', '#271c19', '#8d6e63', '#a04000'];
    const furColor = furColors[Math.floor(Math.random() * furColors.length)];
    const skinColor = '#ca6f1e'; // Оранжево-коричневая кожа под мехом

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="60" fill="${furColor}"/>

            <path d="M 30 140 Q 100 120 170 140 L 180 300 L 20 300 Z" fill="#2c3e50" stroke="#111" stroke-width="2"/>
            
            <path d="M 20 140 Q 100 80 180 140" fill="none" stroke="${furColor}" stroke-width="30" stroke-linecap="round" stroke-dasharray="15 10"/>

            <rect x="65" y="50" width="70" height="80" rx="20" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            
            <polygon points="65,70 30,50 65,90" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <polygon points="135,70 170,50 135,90" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <ellipse cx="80" cy="80" rx="8" ry="5" fill="#f1c40f" stroke="#111"/>
            <line x1="80" y1="76" x2="80" y2="84" stroke="#000" stroke-width="2"/>
            <ellipse cx="120" cy="80" rx="8" ry="5" fill="#f1c40f" stroke="#111"/>
            <line x1="120" y1="76" x2="120" y2="84" stroke="#000" stroke-width="2"/>
            
            <polygon points="90,100 110,100 100,108" fill="#4a2311"/>
            
            <path d="M 80 115 Q 100 125 120 115" fill="none" stroke="#111" stroke-width="3"/>
            <polygon points="85,117 88,125 91,118" fill="#fff"/>
            <polygon points="109,118 112,125 115,117" fill="#fff"/>

            <path d="M 60 50 Q 100 20 140 50" fill="none" stroke="${furColor}" stroke-width="15" stroke-linecap="round"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ВЕДАЛКЕН
// ==========================================
function generateVedalkenSVG(gender) {
    const skinColors = ['#5dade2', '#3498db', '#2874a6', '#21618c', '#85c1e9'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const eyeColors = ['#8e44ad', '#4a235a', '#154360', '#1f618d'];
    const eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <rect x="88" y="100" width="24" height="60" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <path d="M 55 150 L 145 150 L 155 300 L 45 300 Z" fill="#2c3e50" stroke="#111" stroke-width="1.5"/>
            <path d="M 70 150 L 130 150 L 100 240 Z" fill="#bdc3c7"/>

            <ellipse cx="100" cy="85" rx="33" ry="48" fill="${skinColor}" stroke="#111" stroke-width="1.5" />
            
            <path d="M 92 120 Q 95 130 92 140" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
            <path d="M 108 120 Q 105 130 108 140" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>

            <path d="M 95 95 L 90 105 L 110 105 L 105 95 Z" fill="rgba(0,0,0,0.15)"/>

            <ellipse cx="85" cy="85" rx="7" ry="4" fill="${eyeColor}" stroke="#111"/>
            <ellipse cx="115" cy="85" rx="7" ry="4" fill="${eyeColor}" stroke="#111"/>

            <line x1="90" y1="118" x2="110" y2="118" stroke="#111" stroke-width="1.5"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ВЕРДАН
// ==========================================
function generateVerdanSVG(gender) {
    const isMale = gender === 'Мужчина';
    const shades = ['#2ecc71', '#1e8449', '#ecf0f1', '#254118', '#aab7b8']; // Нефритовый, темно-зеленый, белый, эбеновый, бледный
    const color = shades[Math.floor(Math.random() * shades.length)];
    
    // Мужчины: почти нет волос. Женщины: жесткие дикие волосы
    let hairSVG = '';
    if (!isMale) {
        hairSVG = `<path d="M 60 50 Q 100 10 140 50 Q 160 80 140 110 Q 100 140 60 110 Q 40 80 60 50 Z" fill="rgba(0,0,0,0.8)"/>`;
    }

    // Случайная форма ушей (от эльфийских до огромных загнутых с кольцом)
    const earType = Math.floor(Math.random() * 2);
    let earsSVG = earType === 0 
        ? `<path d="M 70 80 L 20 60 L 60 100" fill="${color}" stroke="#111" stroke-width="1.5"/><path d="M 130 80 L 180 60 L 140 100" fill="${color}" stroke="#111" stroke-width="1.5"/>`
        : `
          <path d="M 70 80 Q 0 40 10 120 Q 30 130 65 100" fill="${color}" stroke="#111" stroke-width="1.5"/>
          <path d="M 130 80 Q 200 40 190 120 Q 170 130 135 100" fill="${color}" stroke="#111" stroke-width="1.5"/>
          <circle cx="100" cy="110" r="45" fill="none" stroke="#f1c40f" stroke-width="3"/>
        `;

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            ${hairSVG}
            ${earsSVG}
            
            <rect x="85" y="110" width="30" height="40" fill="${color}" stroke="#111" stroke-width="1.5"/>
            <path d="M 50 150 L 150 150 L 160 300 L 40 300 Z" fill="#34495e" stroke="#111" stroke-width="1.5"/>

            <ellipse cx="100" cy="85" rx="35" ry="40" fill="${color}" stroke="#111" stroke-width="1.5"/>
            <ellipse cx="85" cy="80" rx="8" ry="5" fill="#fff" stroke="#111"/>
            <circle cx="85" cy="80" r="3" fill="#111"/>
            <ellipse cx="115" cy="80" rx="8" ry="5" fill="#fff" stroke="#111"/>
            <circle cx="115" cy="80" r="3" fill="#111"/>
            
            <path d="M 90 105 Q 100 110 110 105" fill="none" stroke="rgba(0,0,0,0.6)" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ГИБРИД СИМИКОВ
// ==========================================
function generateSimicHybridSVG(gender) {
    const skinColor = '#a2d9ce'; // Базовая бледная кожа
    const mutation = Math.floor(Math.random() * 4); // 0-Крылья манты, 1-Клешни краба, 2-Щупальца, 3-Пасть акулы
    
    let backgroundMutation = '';
    let foregroundMutation = '';

    if (mutation === 0) {
        // Крылья-плавники манты (Сзади)
        backgroundMutation = `
            <path d="M 80 140 Q 10 100 20 220 Q 50 200 80 250" fill="#2980b9" stroke="#111" opacity="0.8"/>
            <path d="M 120 140 Q 190 100 180 220 Q 150 200 120 250" fill="#2980b9" stroke="#111" opacity="0.8"/>
        `;
    } else if (mutation === 1) {
        // Клешни краба (Спереди вместо рук)
        foregroundMutation = `
            <path d="M 40 150 Q 10 180 20 220 Z" fill="#c0392b" stroke="#111" stroke-width="2"/>
            <path d="M 20 220 Q 30 250 10 270 Q 5 240 20 220" fill="#c0392b" stroke="#111"/>
            <path d="M 20 220 Q 0 230 -5 210 Q 5 200 20 220" fill="#c0392b" stroke="#111"/>

            <path d="M 160 150 Q 190 180 180 220 Z" fill="#c0392b" stroke="#111" stroke-width="2"/>
            <path d="M 180 220 Q 170 250 190 270 Q 195 240 180 220" fill="#c0392b" stroke="#111"/>
            <path d="M 180 220 Q 200 230 205 210 Q 195 200 180 220" fill="#c0392b" stroke="#111"/>
        `;
    } else if (mutation === 2) {
        // Щупальца на лице
        foregroundMutation = `
            <path d="M 85 105 Q 70 140 85 160" fill="none" stroke="#8e44ad" stroke-width="8" stroke-linecap="round"/>
            <path d="M 100 105 Q 100 150 110 170" fill="none" stroke="#8e44ad" stroke-width="8" stroke-linecap="round"/>
            <path d="M 115 105 Q 130 140 115 160" fill="none" stroke="#8e44ad" stroke-width="8" stroke-linecap="round"/>
        `;
    }

    let mouthSVG = mutation === 3 
        ? `<path d="M 80 100 Q 100 120 120 100 Z" fill="#111"/><polygon points="85,100 88,110 91,100" fill="#fff"/><polygon points="95,100 98,112 101,100" fill="#fff"/><polygon points="105,100 108,112 111,100" fill="#fff"/><polygon points="115,100 118,110 121,100" fill="#fff"/>` 
        : `<line x1="90" y1="105" x2="110" y2="105" stroke="#111" stroke-width="2"/>`;

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            ${backgroundMutation}
            
            <rect x="85" y="110" width="30" height="40" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <path d="M 50 150 L 150 150 L 160 300 L 40 300 Z" fill="${skinColor}" opacity="0.9" stroke="#111" stroke-width="1.5"/>

            <ellipse cx="100" cy="85" rx="35" ry="40" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <circle cx="85" cy="80" r="5" fill="#111"/>
            <circle cx="115" cy="80" r="5" fill="#111"/>
            
            ${mouthSVG}
            ${foregroundMutation}
        </svg>
    `;
}


// ГИТ
function generateGithSVG(gender) {
    const skinColors = ['#F4D03F', '#B18904', '#AAB7B8', '#7D6608'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <rect x="90" y="110" width="20" height="30" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            
            <path d="M 65 135 L 135 135 L 140 300 L 60 300 Z" fill="#581845" stroke="#111" stroke-width="1.5"/>
            <path d="M 65 135 L 40 230" stroke="${skinColor}" stroke-width="10" stroke-linecap="round"/>
            <path d="M 135 135 L 160 230" stroke="${skinColor}" stroke-width="10" stroke-linecap="round"/>

            <path d="M 75 80 L 20 65 L 70 95" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <path d="M 125 80 L 180 65 L 130 95" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <polygon points="70,50 130,50 120,120 100,135 80,120" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <polyline points="70,90 85,110 80,120" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
            <polyline points="130,90 115,110 120,120" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>

            <rect x="75" y="75" width="15" height="5" fill="#111"/>
            <rect x="110" y="75" width="15" height="5" fill="#111"/>
            <circle cx="82" cy="77" r="2" fill="#fff"/>
            <circle cx="117" cy="77" r="2" fill="#fff"/>

            <line x1="95" y1="100" x2="98" y2="105" stroke="#111" stroke-width="2"/>
            <line x1="105" y1="100" x2="102" y2="105" stroke="#111" stroke-width="2"/>

            <line x1="90" y1="120" x2="110" y2="120" stroke="#111" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ИСПРАВЛЕНО: ГИФФ (Добавлены вариации щетины)
// ==========================================
function generateGiffSVG(gender) {
    const skinColor = '#85929E'; 
    const hasStubble = Math.random() > 0.5; // 50% шанс на армейскую щетину

    let stubbleSVG = '';
    if (hasStubble) {
        stubbleSVG = `
            <path d="M 70 45 Q 100 35 130 45" fill="none" stroke="#2C3E50" stroke-width="4" stroke-dasharray="2 4" opacity="0.6"/>
            <path d="M 65 110 Q 100 135 135 110" fill="none" stroke="#2C3E50" stroke-width="4" stroke-dasharray="2 6" opacity="0.4"/>
            <path d="M 75 125 Q 100 145 125 125" fill="none" stroke="#2C3E50" stroke-width="4" stroke-dasharray="2 6" opacity="0.4"/>
        `;
    }

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="130" width="160" height="170" rx="30" fill="#1A5276" stroke="#111" stroke-width="2"/>
            <path d="M 60 130 L 140 130 L 110 300 L 90 300 Z" fill="#F1C40F" opacity="0.8"/>

            <circle cx="65" cy="50" r="10" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <circle cx="135" cy="50" r="10" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <ellipse cx="100" cy="85" rx="45" ry="50" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            
            ${stubbleSVG}

            <circle cx="75" cy="65" r="3" fill="#111"/>
            <circle cx="125" cy="65" r="3" fill="#111"/>

            <ellipse cx="100" cy="110" rx="40" ry="25" fill="#AEB6BF" stroke="#111" stroke-width="1.5"/>
            <ellipse cx="80" cy="100" rx="5" ry="8" fill="#111"/> 
            <ellipse cx="120" cy="100" rx="5" ry="8" fill="#111"/> 
            
            <path d="M 70 120 Q 100 135 130 120" fill="none" stroke="#111" stroke-width="2"/>
        </svg>
    `;
}


// ==========================================
// ГЕНЕРАТОР: ГНОМ (Точечное исправление волос)
// ==========================================
function generateGnomeSVG(gender) {
    const isMale = gender === 'Мужчина';
    const hairColor = '#d35400';

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- ИСПРАВЛЕНИЕ: Волосы на заднем плане (для объема) -->
            <path d="M 60 90 Q 100 30 140 90 L 140 120 L 60 120 Z" fill="${hairColor}"/>

            <!-- Компактное тело -->
            <path d="M 50 150 L 150 150 L 130 250 L 70 250 Z" fill="#2980b9" stroke="#111" stroke-width="2"/>
            <rect x="85" y="130" width="30" height="20" fill="#f5cba7" stroke="#111" stroke-width="2"/>

            <!-- Руки -->
            <rect x="35" y="150" width="15" height="50" fill="#f5cba7" stroke="#111" stroke-width="2"/>
            <rect x="150" y="150" width="15" height="50" fill="#f5cba7" stroke="#111" stroke-width="2"/>

            <!-- Крупная голова -->
            <ellipse cx="100" cy="100" rx="35" ry="35" fill="#f5cba7" stroke="#111" stroke-width="2"/>
            
            <!-- Глаза -->
            <circle cx="85" cy="90" r="6" fill="#fff" stroke="#111"/>
            <circle cx="85" cy="90" r="3" fill="#111"/>
            <circle cx="115" cy="90" r="6" fill="#fff" stroke="#111"/>
            <circle cx="115" cy="90" r="3" fill="#111"/>

            <!-- Круглый нос -->
            <circle cx="100" cy="105" r="6" fill="#e6b0aa" stroke="#111" stroke-width="1"/>

            <!-- Один рот (улыбка) -->
            <path d="M 90 118 Q 100 128 110 118" fill="none" stroke="#111" stroke-width="2"/>

            <!-- Острые торчащие уши -->
            <polygon points="65,100 40,85 65,110" fill="#f5cba7" stroke="#111" stroke-width="1.5"/>
            <polygon points="135,100 160,85 135,110" fill="#f5cba7" stroke="#111" stroke-width="1.5"/>

            ${isMale ? `
                <path d="M 70 120 Q 100 150 130 120 Q 100 130 70 120 Z" fill="${hairColor}"/>
            ` : ''}

            <!-- ИСПРАВЛЕНИЕ: Прическа (челка поверх лба, а не колпак) -->
            <path d="M 65 85 Q 100 55 135 85 Q 100 70 65 85 Z" fill="${hairColor}"/>
        </svg>
    `;
}

//ГРУНГ
function generateGrungSVG(gender) {
    const castes = ['#27ae60', '#2980b9', '#8e44ad', '#c0392b', '#e67e22', '#f1c40f'];
    const grungColor = castes[Math.floor(Math.random() * castes.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="220" rx="40" ry="50" fill="${grungColor}" stroke="#111" stroke-width="2"/>
            <ellipse cx="100" cy="225" rx="25" ry="40" fill="rgba(255,255,255,0.3)"/>

            <path d="M 65 240 L 35 210 L 45 280" fill="none" stroke="${grungColor}" stroke-width="15" stroke-linejoin="round" stroke-linecap="round"/>
            <path d="M 135 240 L 165 210 L 155 280" fill="none" stroke="${grungColor}" stroke-width="15" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="38" cy="285" r="5" fill="#111"/><circle cx="52" cy="285" r="5" fill="#111"/>
            <circle cx="148" cy="285" r="5" fill="#111"/><circle cx="162" cy="285" r="5" fill="#111"/>

            <path d="M 65 180 L 30 190 L 40 230" fill="none" stroke="${grungColor}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>
            <path d="M 135 180 L 170 190 L 160 230" fill="none" stroke="${grungColor}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="33" cy="235" r="4" fill="#111"/><circle cx="47" cy="235" r="4" fill="#111"/>
            <circle cx="153" cy="235" r="4" fill="#111"/><circle cx="167" cy="235" r="4" fill="#111"/>

            <ellipse cx="100" cy="150" rx="55" ry="35" fill="${grungColor}" stroke="#111" stroke-width="2"/>
            
            <circle cx="70" cy="125" r="18" fill="${grungColor}" stroke="#111" stroke-width="2"/>
            <circle cx="70" cy="125" r="14" fill="#000"/>
            <circle cx="73" cy="122" r="4" fill="#fff"/>
            
            <circle cx="130" cy="125" r="18" fill="${grungColor}" stroke="#111" stroke-width="2"/>
            <circle cx="130" cy="125" r="14" fill="#000"/>
            <circle cx="133" cy="122" r="4" fill="#fff"/>

            <path d="M 55 160 Q 100 180 145 160" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ДЖЕНАЗИ (Огонь, Вода, Земля, Воздух)
// ==========================================
function generateGenasiSVG(gender) {
    const isMale = gender === 'Мужчина';
    const elements = ['fire', 'water', 'earth', 'air'];
    const element = elements[Math.floor(Math.random() * elements.length)];

    let skinColor, hairSVG, bodySVG, fxSVG = '';

    if (element === 'fire') {
        skinColor = '#e74c3c'; // Красный
        bodySVG = `<path d="M 60 140 L 140 140 L 150 300 L 50 300 Z" fill="#2c3e50" stroke="#111" stroke-width="1.5"/>`; // Легкие
        hairSVG = `<path d="M 70 100 Q 50 30 100 10 Q 150 30 130 100 Z" fill="#f1c40f" opacity="0.9"/><path d="M 80 100 Q 70 50 100 30 Q 130 50 120 100 Z" fill="#e67e22"/>`; // Пламя
    } else if (element === 'water') {
        skinColor = '#3498db'; // Синий
        bodySVG = `<rect x="50" y="140" width="100" height="160" rx="20" fill="#1ABC9C" stroke="#111" stroke-width="1.5"/>`; // Тяжелее
        hairSVG = `<path d="M 60 50 Q 30 150 50 200 L 150 200 Q 170 150 140 50 Z" fill="#2980b9" opacity="0.8"/>`; // Волны
    } else if (element === 'earth') {
        skinColor = '#7f8c8d'; // Серый
        bodySVG = `<rect x="40" y="140" width="120" height="160" rx="10" fill="#5d4037" stroke="#111" stroke-width="1.5"/>`; // Очень плотные
        hairSVG = `<polygon points="60,100 70,50 90,60 100,40 110,60 130,50 140,100" fill="#333"/>`; // Кристаллы/камни
        fxSVG = `<path d="M 80 110 L 90 120 M 110 90 L 120 100" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>`; // Трещины
    } else { // air
        skinColor = '#d6eaf8'; // Бледно-голубой/белый
        bodySVG = `<path d="M 70 140 L 130 140 L 140 300 L 60 300 Z" fill="#ecf0f1" stroke="#111" stroke-width="1.5"/>`; // Очень легкие
        hairSVG = `<ellipse cx="100" cy="60" rx="50" ry="30" fill="#aed6f1" opacity="0.7"/><ellipse cx="120" cy="50" rx="30" ry="20" fill="#ebf5fb" opacity="0.8"/>`; // Облака
    }

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            ${hairSVG}
            <rect x="85" y="100" width="30" height="50" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            ${bodySVG}
            <ellipse cx="100" cy="90" rx="35" ry="45" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <ellipse cx="85" cy="85" rx="6" ry="4" fill="#fff" stroke="#111"/>
            <circle cx="85" cy="85" r="2" fill="#111"/>
            <ellipse cx="115" cy="85" rx="6" ry="4" fill="#fff" stroke="#111"/>
            <circle cx="115" cy="85" r="2" fill="#111"/>
            <path d="M 90 115 Q 100 120 110 115" fill="none" stroke="#111" stroke-width="1.5"/>
            ${fxSVG}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ИЗМЕНЯЮЩИЙСЯ (Истинная форма)
// ==========================================
// Примечание: Маскировка генерируется в функции showPortrait
function generateChangelingTrueSVG(gender) {
    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 60 50 Q 30 150 50 220 L 150 220 Q 170 150 140 50 Z" fill="#e5e7e9"/>

            <rect x="90" y="100" width="20" height="50" fill="#ffffff" stroke="#ddd" stroke-width="1.5"/>
            <path d="M 65 140 Q 100 130 135 140 L 145 300 L 55 300 Z" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="1.5"/>

            <ellipse cx="100" cy="90" rx="30" ry="45" fill="#ffffff" stroke="#ddd" stroke-width="1.5"/>

            <ellipse cx="85" cy="85" rx="8" ry="4" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="1"/>
            <ellipse cx="115" cy="85" rx="8" ry="4" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="1"/>

            <path d="M 100 85 L 100 100 L 102 100" fill="none" stroke="#ddd" stroke-width="1.5"/>
            <path d="M 90 110 Q 100 112 110 110" fill="none" stroke="#bdc3c7" stroke-width="1.5"/>
            
            <path d="M 70 50 Q 100 30 130 50" fill="none" stroke="#e5e7e9" stroke-width="15" stroke-linecap="round"/>
        </svg>
    `;
}


// ==========================================
// ГЕНЕРАТОР: КАЛАШТАР (ИСПРАВЛЕНО - Короткая шея)
// ==========================================
function generateKalashtarSVG(gender) {
    const isMale = gender === 'Мужчина';
    const hairColor = '#ecf0f1'; // Чаще всего светлые или необычные волосы
    const eyeColor = '#9b59b6'; // Фиолетовые/магические глаза

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Симметричное, идеальное телосложение -->
            <path d="M 50 130 L 150 130 L 135 280 L 65 280 Z" fill="#8e44ad" stroke="#111" stroke-width="2"/>
            
            <!-- Короткая шея -->
            <rect x="90" y="115" width="20" height="15" fill="#fdf2e9" stroke="#111" stroke-width="2"/>

            <!-- Руки -->
            <rect x="35" y="130" width="15" height="90" fill="#fdf2e9" stroke="#111" stroke-width="2"/>
            <rect x="150" y="130" width="15" height="90" fill="#fdf2e9" stroke="#111" stroke-width="2"/>

            <!-- Волосы на фоне -->
            <path d="M 65 60 Q 100 20 135 60 L 140 140 L 60 140 Z" fill="${hairColor}"/>

            <!-- Идеально симметричное лицо -->
            <ellipse cx="100" cy="85" rx="28" ry="35" fill="#fdf2e9" stroke="#111" stroke-width="2"/>
            
            <!-- Светящиеся магические глаза -->
            <ellipse cx="88" cy="80" rx="5" ry="3" fill="${eyeColor}"/>
            <ellipse cx="112" cy="80" rx="5" ry="3" fill="${eyeColor}"/>

            <!-- Легкая, отстраненная улыбка -->
            <path d="M 95 100 Q 100 102 105 100" fill="none" stroke="#111" stroke-width="1.5"/>

            ${isMale ? '' : `<path d="M 65 60 Q 100 40 135 60" fill="none" stroke="${hairColor}" stroke-width="4"/>`}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: КЕНДЕР (ИСПРАВЛЕНО - Короткая шея)
// ==========================================
function generateKenderSVG(gender) {
    const isMale = gender === 'Мужчина';
    const hairColors = ['#f1c40f', '#e67e22', '#d35400', '#8b4513'];
    const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Волосы (хвост-пучок на макушке, типичный для кендеров) -->
            <path d="M 80 80 Q 100 40 120 80 Z" fill="${hairColor}"/>
            <circle cx="100" cy="45" r="15" fill="${hairColor}"/>

            <!-- Туловище -->
            <path d="M 50 140 L 150 140 L 130 260 L 70 260 Z" fill="#2ecc71" stroke="#111" stroke-width="2"/>
            
            <!-- Шея практически скрыта воротником -->
            <rect x="90" y="130" width="20" height="10" fill="#fdd9b5" stroke="#111" stroke-width="2"/>
            <path d="M 80 140 L 120 140 L 100 160 Z" fill="#e74c3c"/> <!-- Шейный платок -->

            <!-- Руки -->
            <rect x="35" y="140" width="15" height="70" fill="#2ecc71" stroke="#111" stroke-width="2"/>
            <rect x="150" y="140" width="15" height="70" fill="#2ecc71" stroke="#111" stroke-width="2"/>

            <!-- Лицо (опущено ниже к плечам) -->
            <ellipse cx="100" cy="100" rx="30" ry="35" fill="#fdd9b5" stroke="#111" stroke-width="2"/>
            
            <!-- Острые ушки -->
            <polygon points="70,100 50,90 72,110" fill="#fdd9b5" stroke="#111" stroke-width="1.5"/>
            <polygon points="130,100 150,90 128,110" fill="#fdd9b5" stroke="#111" stroke-width="1.5"/>

            <circle cx="90" cy="95" r="4" fill="#111"/>
            <circle cx="110" cy="95" r="4" fill="#111"/>
            
            <!-- Улыбка любопытного кендера -->
            <path d="M 85 115 Q 100 125 115 115" fill="none" stroke="#111" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: КЕНКУ
// ==========================================
function generateKenkuSVG(gender) {
    const fColor = ['#1a1a1a', '#1b263b', '#17202a'][Math.floor(Math.random()*3)]; 

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 80 250 L 70 300 M 80 250 L 80 300 M 80 250 L 90 300" stroke="${fColor}" stroke-width="4" stroke-linecap="round"/>
            <path d="M 120 250 L 110 300 M 120 250 L 120 300 M 120 250 L 130 300" stroke="${fColor}" stroke-width="4" stroke-linecap="round"/>

            <path d="M 60 110 L 140 110 L 130 250 L 70 250 Z" fill="#5d4037" stroke="#111" stroke-width="1.5"/>

            <path d="M 60 120 Q 30 160 40 200" fill="none" stroke="#111" stroke-width="6"/>
            <path d="M 40 200 L 30 220 M 40 200 L 40 225 M 40 200 L 50 220" stroke="${fColor}" stroke-width="3" stroke-linecap="round"/>
            
            <path d="M 140 120 Q 170 160 160 200" fill="none" stroke="#111" stroke-width="6"/>
            <path d="M 160 200 L 150 220 M 160 200 L 160 225 M 160 200 L 170 220" stroke="${fColor}" stroke-width="3" stroke-linecap="round"/>

            <circle cx="100" cy="80" r="35" fill="${fColor}" stroke="#111" stroke-width="1.5"/>
            
            <path d="M 125 75 Q 170 65 180 85 Q 160 95 125 90 Z" fill="#333" stroke="#111" stroke-width="1.5"/>
            
            <circle cx="115" cy="70" r="6" fill="#111"/>
            <circle cx="117" cy="68" r="2" fill="#fff"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: КЕНТАВР (Точечное исправление волос)
// ==========================================
function generateCentaurSVG(gender) {
    const isMale = gender === 'Мужчина';
    const skinColor = '#f5cba7';
    const horseColors = ['#8b4513', '#d35400', '#5d4037', '#2e4053', '#e5e8e8'];
    const horseColor = horseColors[Math.floor(Math.random() * horseColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Лошадиное тело (Анфас) -->
            <circle cx="100" cy="200" r="45" fill="${horseColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Передние конские ноги -->
            <rect x="65" y="235" width="20" height="50" fill="${horseColor}" stroke="#111" stroke-width="2"/>
            <rect x="115" y="235" width="20" height="50" fill="${horseColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Копыта -->
            <path d="M 60 285 L 90 285 L 85 300 L 65 300 Z" fill="#111"/>
            <path d="M 110 285 L 140 285 L 135 300 L 115 300 Z" fill="#111"/>

            <!-- Человеческий торс -->
            <path d="M 65 110 L 135 110 L 120 170 L 80 170 Z" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <path d="M 65 110 L 135 170 L 120 170 L 65 130 Z" fill="#27ae60" opacity="0.8"/>

            <!-- Руки -->
            <rect x="45" y="110" width="20" height="70" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <rect x="135" y="110" width="20" height="70" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <!-- ИСПРАВЛЕНИЕ: Волосы на фоне (рисуются ДО лица) -->
            <path d="M 70 50 Q 100 20 130 50 L 135 100 L 65 100 Z" fill="#5d4037"/>

            <!-- Шея и Лицо -->
            <rect x="90" y="80" width="20" height="30" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <ellipse cx="100" cy="70" rx="25" ry="30" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <!-- Глаза -->
            <circle cx="90" cy="65" r="3" fill="#111"/>
            <circle cx="110" cy="65" r="3" fill="#111"/>
            <path d="M 92 80 Q 100 85 108 80" fill="none" stroke="#111" stroke-width="1.5"/>

            <!-- Борода для мужчин -->
            ${isMale ? `<path d="M 80 85 Q 100 110 120 85 Z" fill="#5d4037"/>` : ''}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ИЗМЕНЯЮЩИЙСЯ (Логика смены облика)
// ==========================================
function generateChangelingLogic(gender, npc) {
    // Если маскировка еще не создана
    if (!npc.changelingTrueForm) {
        npc.changelingTrueForm = generateChangelingTrueSVG(gender);
        
        // Выбираем случайную расу для маскировки (кроме самого себя)
        const availableRaces = Object.keys(raceGenerators).filter(r => r !== 'изменяющийся' && r !== 'эльф (астральный)');
        const randomRace = availableRaces[Math.floor(Math.random() * availableRaces.length)];
        
        // Генерируем маскировку
        npc.changelingDisguiseForm = raceGenerators[randomRace](gender, npc);
        
        // Начинаем с истинной формы
        npc.showTrueForm = true;
    } else {
        // При каждом последующем клике переключаем форму
        npc.showTrueForm = !npc.showTrueForm;
    }
    
    // Возвращаем нужную SVG
    return npc.showTrueForm ? npc.changelingTrueForm : npc.changelingDisguiseForm;
}

// Истинная форма Изменяющегося
function generateChangelingTrueSVG(gender) {
    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 60 50 Q 30 150 50 220 L 150 220 Q 170 150 140 50 Z" fill="#e5e7e9"/>

            <rect x="90" y="100" width="20" height="50" fill="#ffffff" stroke="#ddd" stroke-width="1.5"/>
            <path d="M 65 140 Q 100 130 135 140 L 145 300 L 55 300 Z" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="1.5"/>

            <ellipse cx="100" cy="90" rx="30" ry="45" fill="#ffffff" stroke="#ddd" stroke-width="1.5"/>

            <ellipse cx="85" cy="85" rx="8" ry="4" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="1"/>
            <ellipse cx="115" cy="85" rx="8" ry="4" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="1"/>

            <path d="M 100 85 L 100 100 L 102 100" fill="none" stroke="#ddd" stroke-width="1.5"/>
            <path d="M 90 110 Q 100 112 110 110" fill="none" stroke="#bdc3c7" stroke-width="1.5"/>
            
            <path d="M 70 50 Q 100 30 130 50" fill="none" stroke="#e5e7e9" stroke-width="15" stroke-linecap="round"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: КОВАНЫЙ
// ==========================================
function generateWarforgedSVG(gender) {
    const frameColors = ['#5d4037', '#7f8c8d', '#2c3e50']; // Дерево, камень, сталь
    const plateColors = ['#bdc3c7', '#95a5a6', '#d35400', '#273746']; // Броня
    const eyeColors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71']; // Кристаллы
    
    const frame = frameColors[Math.floor(Math.random() * frameColors.length)];
    const plate = plateColors[Math.floor(Math.random() * plateColors.length)];
    const eye = eyeColors[Math.floor(Math.random() * eyeColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <rect x="85" y="100" width="30" height="50" fill="${frame}" stroke="#111" stroke-width="2"/>
            <path d="M 90 100 L 95 150 M 100 100 L 105 150 M 110 100 L 105 150" fill="none" stroke="#8d6e63" stroke-width="2"/> <path d="M 40 140 L 160 140 L 140 220 L 100 250 L 60 220 Z" fill="${plate}" stroke="#111" stroke-width="2"/>
            <path d="M 60 220 L 140 220 L 130 300 L 70 300 Z" fill="${plate}" stroke="#111" stroke-width="2"/>
            <circle cx="60" cy="160" r="15" fill="${frame}" stroke="#111" stroke-width="2"/>
            <circle cx="140" cy="160" r="15" fill="${frame}" stroke="#111" stroke-width="2"/>

            <path d="M 65 80 Q 100 30 135 80 L 130 105 L 70 105 Z" fill="${plate}" stroke="#111" stroke-width="2"/>
            
            <path d="M 65 80 Q 100 95 135 80" fill="none" stroke="#111" stroke-width="4"/>
            
            <circle cx="85" cy="85" r="5" fill="${eye}"/>
            <circle cx="115" cy="85" r="5" fill="${eye}"/>

            <path d="M 75 105 L 125 105 L 115 130 L 85 130 Z" fill="${frame}" stroke="#111" stroke-width="2"/>
            <line x1="85" y1="115" x2="115" y2="115" stroke="#111" stroke-width="2"/> <circle cx="75" cy="105" r="4" fill="${plate}" stroke="#111"/>
            <circle cx="125" cy="105" r="4" fill="${plate}" stroke="#111"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ЛЕОНИН
// ==========================================
function generateLeoninSVG(gender) {
    const isMale = gender === 'Мужчина';
    const furColors = ['#a67c00', '#8d5524', '#c68642'];
    const furColor = furColors[Math.floor(Math.random() * furColors.length)];
    
    // Грива: у мужчин шанс 80%, у женщин 20%
    const hasMane = isMale ? Math.random() > 0.2 : Math.random() > 0.8;
    const maneColors = ['#d4ac0d', '#111111', '#5d4037', '#e67e22'];
    const maneColor = maneColors[Math.floor(Math.random() * maneColors.length)];

    let maneSVG = '';
    if (hasMane) {
        maneSVG = `<circle cx="100" cy="90" r="60" fill="${maneColor}"/>
                   <path d="M 40 90 Q 100 180 160 90 Z" fill="${maneColor}"/>`;
    }

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            ${maneSVG}

            <path d="M 30 150 Q 100 120 170 150 L 160 300 L 40 300 Z" fill="${furColor}" stroke="#111" stroke-width="2"/>
            
            <path d="M 30 180 Q 10 220 20 260" fill="none" stroke="${furColor}" stroke-width="20" stroke-linecap="round"/>
            <path d="M 170 180 Q 190 220 180 260" fill="none" stroke="${furColor}" stroke-width="20" stroke-linecap="round"/>
            <path d="M 15 260 L 10 275 M 20 260 L 20 275 M 25 260 L 30 275" stroke="#eee" stroke-width="3"/>
            <path d="M 185 260 L 190 275 M 180 260 L 180 275 M 175 260 L 170 275" stroke="#eee" stroke-width="3"/>

            <rect x="80" y="100" width="40" height="50" fill="${furColor}" stroke="#111" stroke-width="2"/>

            <ellipse cx="100" cy="85" rx="40" ry="45" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <polygon points="65,60 50,30 85,50" fill="${furColor}" stroke="#111" stroke-width="1.5"/>
            <polygon points="135,60 150,30 115,50" fill="${furColor}" stroke="#111" stroke-width="1.5"/>

            <path d="M 70 75 Q 85 80 90 75" fill="none" stroke="#111" stroke-width="3"/>
            <path d="M 130 75 Q 115 80 110 75" fill="none" stroke="#111" stroke-width="3"/>
            <circle cx="80" cy="82" r="4" fill="#f1c40f"/><circle cx="80" cy="82" r="1.5" fill="#111"/>
            <circle cx="120" cy="82" r="4" fill="#f1c40f"/><circle cx="120" cy="82" r="1.5" fill="#111"/>

            <polygon points="90,105 110,105 100,115" fill="#3e2723"/>
            <path d="M 90 120 Q 100 115 100 115 Q 100 115 110 120" fill="none" stroke="#111" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ЛОКАТА
// ==========================================
function generateLocathahSVG(gender) {
    const skinColors = ['#c0a040', '#a0b040', '#d4ac0d'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const bellyColor = '#ba4a00'; 
    const finColor = ['#27ae60', '#a04000', '#d35400'][Math.floor(Math.random() * 3)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 70 Q 60 30 40 100 Z" fill="${finColor}" stroke="#111" stroke-width="1.5"/>
            <path d="M 100 70 Q 140 30 160 100 Z" fill="${finColor}" stroke="#111" stroke-width="1.5"/>
            
            <path d="M 50 180 Q 20 200 40 240 Z" fill="${finColor}" opacity="0.8"/>
            <path d="M 150 180 Q 180 200 160 240 Z" fill="${finColor}" opacity="0.8"/>

            <ellipse cx="100" cy="220" rx="60" ry="70" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <ellipse cx="100" cy="230" rx="45" ry="55" fill="${bellyColor}"/>
            
            <circle cx="85" cy="200" r="5" fill="rgba(0,0,0,0.2)"/><circle cx="115" cy="210" r="4" fill="rgba(0,0,0,0.2)"/>
            <circle cx="100" cy="240" r="6" fill="rgba(0,0,0,0.2)"/><circle cx="80" cy="250" r="4" fill="rgba(0,0,0,0.2)"/>

            <rect x="85" y="140" width="30" height="30" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <ellipse cx="100" cy="110" rx="55" ry="40" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            
            <circle cx="50" cy="105" r="12" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <circle cx="48" cy="105" r="10" fill="#f1c40f"/>
            <circle cx="46" cy="105" r="4" fill="#111"/>
            
            <circle cx="150" cy="105" r="12" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <circle cx="152" cy="105" r="10" fill="#f1c40f"/>
            <circle cx="154" cy="105" r="4" fill="#111"/>

            <path d="M 70 130 Q 100 145 130 130" fill="none" stroke="#111" stroke-width="3"/>
            <path d="M 90 85 Q 100 90 110 85 M 95 95 Q 100 100 105 95" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ЛОКСОДОН
// ==========================================
function generateLoxodonSVG(gender) {
    const skinColor = '#7f8c8d'; // Серая морщинистая кожа

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 60 70 Q 0 40 10 150 Q 30 160 60 120" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <path d="M 140 70 Q 200 40 190 150 Q 170 160 140 120" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <path d="M 30 130 Q 100 110 170 130 L 180 300 L 20 300 Z" fill="#95a5a6" stroke="#111" stroke-width="2"/>
            <path d="M 40 130 L 160 130 L 130 300 L 70 300 Z" fill="#2980b9" opacity="0.8"/>
            
            <ellipse cx="60" cy="290" rx="30" ry="10" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <ellipse cx="140" cy="290" rx="30" ry="10" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <path d="M 30 160 Q 10 200 20 240" fill="none" stroke="${skinColor}" stroke-width="25" stroke-linecap="round"/>
            <line x1="5" y1="240" x2="5" y2="250" stroke="#eee" stroke-width="4"/><line x1="15" y1="240" x2="15" y2="250" stroke="#eee" stroke-width="4"/>
            <line x1="25" y1="240" x2="25" y2="250" stroke="#eee" stroke-width="4"/><line x1="35" y1="240" x2="35" y2="250" stroke="#eee" stroke-width="4"/>
            
            <path d="M 170 160 Q 190 200 180 240" fill="none" stroke="${skinColor}" stroke-width="25" stroke-linecap="round"/>
            <line x1="165" y1="240" x2="165" y2="250" stroke="#eee" stroke-width="4"/><line x1="175" y1="240" x2="175" y2="250" stroke="#eee" stroke-width="4"/>
            <line x1="185" y1="240" x2="185" y2="250" stroke="#eee" stroke-width="4"/><line x1="195" y1="240" x2="195" y2="250" stroke="#eee" stroke-width="4"/>

            <rect x="75" y="100" width="50" height="40" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <ellipse cx="100" cy="80" rx="45" ry="40" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            
            <path d="M 70 75 Q 80 70 85 75" fill="none" stroke="#111" stroke-width="2"/>
            <circle cx="78" cy="78" r="3" fill="#111"/>
            <path d="M 130 75 Q 120 70 115 75" fill="none" stroke="#111" stroke-width="2"/>
            <circle cx="122" cy="78" r="3" fill="#111"/>

            <path d="M 80 110 Q 50 140 40 100 Q 55 125 80 105 Z" fill="#ecf0f1" stroke="#111" stroke-width="1.5"/>
            <path d="M 120 110 Q 150 140 160 100 Q 145 125 120 105 Z" fill="#ecf0f1" stroke="#111" stroke-width="1.5"/>

            <path d="M 85 90 L 115 90 Q 120 150 110 220 Q 95 240 85 220 Q 80 150 85 90 Z" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <line x1="86" y1="110" x2="114" y2="110" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
            <line x1="85" y1="130" x2="113" y2="130" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
            <line x1="84" y1="150" x2="112" y2="150" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
            <line x1="83" y1="170" x2="110" y2="170" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ЛЮДОЯЩЕР
// ==========================================
function generateLizardfolkSVG(gender) {
    const scaleColors = ['#1e8449', '#27ae60', '#9a7d0a', '#784212', '#212f3d'];
    const scaleColor = scaleColors[Math.floor(Math.random() * scaleColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 120 250 Q 180 260 190 200" fill="none" stroke="${scaleColor}" stroke-width="25" stroke-linecap="round"/>
            <path d="M 170 230 L 195 210 L 180 245" fill="#111" opacity="0.6"/> <rect x="80" y="110" width="40" height="50" fill="${scaleColor}" stroke="#111" stroke-width="2"/>
            <path d="M 40 150 L 160 150 L 150 300 L 50 300 Z" fill="${scaleColor}" stroke="#111" stroke-width="2"/>
            <path d="M 70 150 L 130 150 L 120 300 L 80 300 Z" fill="rgba(255,255,255,0.2)"/>

            <polygon points="60,60 140,60 130,120 70,120" fill="${scaleColor}" stroke="#111" stroke-width="2"/>
            <polygon points="100,60 90,40 110,40" fill="#222"/>
            <polygon points="75,60 65,45 85,45" fill="#222"/>
            <polygon points="125,60 115,45 135,45" fill="#222"/>

            <path d="M 80 90 Q 100 140 120 90 Z" fill="${scaleColor}" stroke="#111" stroke-width="2"/>

            <circle cx="75" cy="80" r="7" fill="#f1c40f" stroke="#111"/>
            <ellipse cx="75" cy="80" rx="1.5" ry="5" fill="#000"/>
            <circle cx="125" cy="80" r="7" fill="#f1c40f" stroke="#111"/>
            <ellipse cx="125" cy="80" rx="1.5" ry="5" fill="#000"/>

            <path d="M 85 110 Q 100 120 115 110" fill="none" stroke="#111" stroke-width="2"/>
            <polygon points="90,112 93,118 96,112" fill="#fff"/>
            <polygon points="100,114 103,120 106,114" fill="#fff"/>
            <polygon points="110,112 113,118 116,112" fill="#fff"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: МИНОТАВР
// ==========================================
function generateMinotaurSVG(gender) {
    const isMale = gender === 'Мужчина';
    const furColors = ['#4e342e', '#3e2723', '#271c19', '#5d4037'];
    const furColor = furColors[Math.floor(Math.random() * furColors.length)];
    
    // Рога могут быть огромными или средними
    const hugeHorns = Math.random() > 0.5;
    let hornPath = hugeHorns 
        ? `<path d="M 60 70 Q 10 40 5 0 Q 30 20 65 60" fill="#ecf0f1" stroke="#111" stroke-width="2"/><path d="M 140 70 Q 190 40 195 0 Q 170 20 135 60" fill="#ecf0f1" stroke="#111" stroke-width="2"/>`
        : `<path d="M 60 70 Q 30 40 25 20 Q 40 30 65 60" fill="#ecf0f1" stroke="#111" stroke-width="2"/><path d="M 140 70 Q 170 40 175 20 Q 160 30 135 60" fill="#ecf0f1" stroke="#111" stroke-width="2"/>`;

    // Украшения на рогах
    const hornRings = `<ellipse cx="25" cy="25" rx="6" ry="12" fill="none" stroke="#f1c40f" stroke-width="3" transform="rotate(-45 25 25)"/><ellipse cx="175" cy="25" rx="6" ry="12" fill="none" stroke="#f1c40f" stroke-width="3" transform="rotate(45 175 25)"/>`;

    let beardSVG = isMale ? `<path d="M 75 110 Q 100 150 125 110 Z" fill="#111" opacity="0.6"/><path d="M 60 80 Q 50 110 70 120 Z" fill="#111" opacity="0.6"/><path d="M 140 80 Q 150 110 130 120 Z" fill="#111" opacity="0.6"/>` : '';

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 140 250 Q 180 270 190 230" fill="none" stroke="${furColor}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="190" cy="230" r="10" fill="#111"/> <circle cx="100" cy="100" r="60" fill="#111" opacity="0.8"/> <path d="M 30 140 Q 100 110 170 140 L 150 240 L 50 240 Z" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <rect x="60" y="240" width="20" height="50" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <rect x="58" y="285" width="24" height="15" fill="#111"/> <line x1="70" y1="285" x2="70" y2="300" stroke="#555" stroke-width="2"/>

            <rect x="120" y="240" width="20" height="50" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <rect x="118" y="285" width="24" height="15" fill="#111"/> <line x1="130" y1="285" x2="130" y2="300" stroke="#555" stroke-width="2"/>

            <rect x="75" y="90" width="50" height="60" fill="${furColor}" stroke="#111" stroke-width="2"/>

            ${hornPath}
            ${hugeHorns ? hornRings : ''}
            
            <ellipse cx="100" cy="85" rx="45" ry="40" fill="${furColor}" stroke="#111" stroke-width="2"/>
            
            <path d="M 75 100 L 125 100 L 115 135 L 85 135 Z" fill="#3e2723" stroke="#111" stroke-width="2"/>
            <circle cx="95" cy="125" r="4" fill="#111"/> <circle cx="105" cy="125" r="4" fill="#111"/> <line x1="90" y1="140" x2="110" y2="140" stroke="#111" stroke-width="2"/>

            <circle cx="70" cy="85" r="4" fill="#111"/>
            <circle cx="130" cy="85" r="4" fill="#111"/>

            ${beardSVG}
        </svg>
    `;
}


// ==========================================
// ГЕНЕРАТОР: НАГА (ИСПРАВЛЕНО - Змеиная форма)
// ==========================================
function generateNagaSVG(gender) {
    const isMale = gender === 'Мужчина';
    const scaleColors = ['#27ae60', '#2980b9', '#f39c12', '#c0392b', '#8e44ad', '#1abc9c'];
    const scaleColor = scaleColors[Math.floor(Math.random() * scaleColors.length)];
    const bellyColor = '#f1c40f'; // Цвет змеиного брюшка

    // Мужчины: широкий капюшон. Женщины: капюшон меньше.
    const hoodWidth = isMale ? 85 : 55;

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Кольца хвоста на земле -->
            <path d="M 30 260 Q 100 210 170 260 Q 200 290 150 300 Q 50 310 40 280" fill="${scaleColor}" stroke="#111" stroke-width="20" stroke-linecap="round"/>
            <path d="M 70 200 Q 100 250 130 200" fill="none" stroke="${scaleColor}" stroke-width="40" stroke-linecap="round"/>

            <!-- Капюшон кобры -->
            <ellipse cx="100" cy="100" rx="${hoodWidth}" ry="60" fill="${scaleColor}" stroke="#111" stroke-width="2"/>
            <!-- Узоры на капюшоне -->
            <circle cx="${100 - hoodWidth/2 + 5}" cy="100" r="8" fill="#111" opacity="0.6"/>
            <circle cx="${100 + hoodWidth/2 - 5}" cy="100" r="8" fill="#111" opacity="0.6"/>

            <!-- Змеиное туловище -->
            <path d="M 75 140 L 125 140 L 115 220 L 85 220 Z" fill="${scaleColor}" stroke="#111" stroke-width="2"/>
            <path d="M 85 140 L 115 140 L 105 220 L 95 220 Z" fill="${bellyColor}" stroke="#111" stroke-width="1"/> <!-- Брюшко -->

            <!-- Броня и украшения -->
            <path d="M 75 150 Q 100 170 125 150 L 130 140 L 70 140 Z" fill="#e67e22" stroke="#111" stroke-width="2"/>
            <circle cx="100" cy="155" r="8" fill="#3498db"/>

            <!-- Руки (в чешуе) -->
            <path d="M 75 145 L 40 180 L 50 220" fill="none" stroke="${scaleColor}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>
            <path d="M 125 145 L 160 180 L 150 220" fill="none" stroke="${scaleColor}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="50" cy="220" r="7" fill="${scaleColor}"/> <!-- Кисть -->
            <circle cx="150" cy="220" r="7" fill="${scaleColor}"/>

            <!-- Змеиная Голова -->
            <ellipse cx="100" cy="85" rx="25" ry="35" fill="${scaleColor}" stroke="#111" stroke-width="2"/>
            <path d="M 85 105 L 115 105 L 105 125 L 95 125 Z" fill="${scaleColor}" stroke="#111" stroke-width="2"/> <!-- Вытянутая морда -->
            
            <!-- Глаза (вертикальные зрачки) -->
            <circle cx="90" cy="85" r="5" fill="#f1c40f"/>
            <ellipse cx="90" cy="85" rx="1.5" ry="4" fill="#111"/>
            <circle cx="110" cy="85" r="5" fill="#f1c40f"/>
            <ellipse cx="110" cy="85" rx="1.5" ry="4" fill="#111"/>

            <!-- Ноздри и раздвоенный язык -->
            <circle cx="97" cy="115" r="1.5" fill="#111"/>
            <circle cx="103" cy="115" r="1.5" fill="#111"/>
            <path d="M 100 125 L 100 135 L 96 140 M 100 135 L 104 140" fill="none" stroke="#e74c3c" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ОРК
// ==========================================
function generateOrcSVG(gender) {
    const skinColors = ['#556b2f', '#4b5320', '#6b8e23', '#8b4513', '#708090']; // Зеленые, коричневые, серые
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 60 Q 100 10 150 60 L 130 140 L 70 140 Z" fill="#111"/>

            <ellipse cx="100" cy="140" rx="80" ry="50" fill="#3e2723" stroke="#111" stroke-width="2"/> <path d="M 40 160 L 160 160 L 170 300 L 30 300 Z" fill="#2c3e50" stroke="#111" stroke-width="2"/>

            <rect x="70" y="100" width="60" height="40" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <path d="M 60 70 Q 100 50 140 70 L 140 120 L 60 120 Z" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <rect x="65" y="80" width="30" height="8" fill="rgba(0,0,0,0.3)" rx="3"/>
            <rect x="105" y="80" width="30" height="8" fill="rgba(0,0,0,0.3)" rx="3"/>

            <circle cx="80" cy="90" r="3" fill="#c0392b"/>
            <circle cx="120" cy="90" r="3" fill="#c0392b"/>

            <ellipse cx="100" cy="110" rx="15" ry="10" fill="rgba(0,0,0,0.15)" stroke="#111" stroke-width="1"/>
            <circle cx="93" cy="110" r="2" fill="#111"/>
            <circle cx="107" cy="110" r="2" fill="#111"/>

            <path d="M 65 115 Q 100 150 135 115 Z" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            
            <polygon points="75,120 80,95 85,120" fill="#ecf0f1" stroke="#111" stroke-width="1"/>
            <polygon points="125,120 120,95 115,120" fill="#ecf0f1" stroke="#111" stroke-width="1"/>
            <line x1="85" y1="125" x2="115" y2="125" stroke="#111" stroke-width="2"/> <polygon points="60,85 30,70 60,105" fill="${skinColor}" stroke="#111" stroke-width="1"/>
            <polygon points="140,85 170,70 140,105" fill="${skinColor}" stroke="#111" stroke-width="1"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ПЛАЗМОИД
// ==========================================
function generatePlasmoidSVG(gender) {
    const slimeColors = ['rgba(46, 204, 113, 0.8)', 'rgba(52, 152, 219, 0.8)', 'rgba(155, 89, 182, 0.8)', 'rgba(230, 126, 34, 0.8)'];
    const slimeColor = slimeColors[Math.floor(Math.random() * slimeColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="150" r="30" fill="${slimeColor}"/>
            <circle cx="150" cy="200" r="40" fill="${slimeColor}"/>
            <circle cx="80" cy="50" r="20" fill="${slimeColor}"/>

            <path d="M 60 120 Q 10 180 40 300 L 160 300 Q 190 180 140 120 Q 100 160 60 120 Z" fill="${slimeColor}" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
            <ellipse cx="100" cy="85" rx="35" ry="45" fill="${slimeColor}" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>

            <circle cx="90" cy="70" r="5" fill="rgba(255,255,255,0.5)"/>
            <circle cx="110" cy="100" r="8" fill="rgba(255,255,255,0.3)"/>
            <circle cx="100" cy="180" r="12" fill="rgba(255,255,255,0.4)"/>
            <circle cx="70" cy="220" r="6" fill="rgba(255,255,255,0.6)"/>
            <circle cx="130" cy="250" r="9" fill="rgba(255,255,255,0.4)"/>

            <ellipse cx="85" cy="85" rx="6" ry="10" fill="rgba(0,0,0,0.3)"/>
            <ellipse cx="115" cy="85" rx="6" ry="10" fill="rgba(0,0,0,0.3)"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ПОЛУОРК
// ==========================================
function generateHalfOrcSVG(gender) {
    const isMale = gender === 'Мужчина';
    const skinColors = ['#aab7b8', '#7dcea0', '#85929e', '#e0ac69']; // Сероватые, зеленоватые или смуглые оттенки
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const hairColor = '#2c3e50';

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 70 50 Q 100 20 130 50 L 140 120 L 60 120 Z" fill="${hairColor}"/>

            <path d="M 30 150 Q 100 130 170 150 L 180 300 L 20 300 Z" fill="#7f8c8d" stroke="#111" stroke-width="2"/>
            <path d="M 40 150 L 160 150 L 130 250 L 70 250 Z" fill="#34495e"/>
            
            <rect x="80" y="110" width="40" height="40" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <polygon points="65,70 135,70 130,135 70,135" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <line x1="75" y1="85" x2="90" y2="90" stroke="#111" stroke-width="3" stroke-linecap="round"/>
            <line x1="125" y1="85" x2="110" y2="90" stroke="#111" stroke-width="3" stroke-linecap="round"/>
            <circle cx="82" cy="95" r="3" fill="#111"/>
            <circle cx="118" cy="95" r="3" fill="#111"/>

            <path d="M 95 105 L 100 115 L 105 105" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>

            <line x1="85" y1="125" x2="115" y2="125" stroke="#111" stroke-width="2"/>
            <polygon points="90,125 93,115 96,125" fill="#ecf0f1" stroke="#111" stroke-width="1"/>
            <polygon points="104,125 107,115 110,125" fill="#ecf0f1" stroke="#111" stroke-width="1"/>

            ${!isMale ? `<path d="M 65 70 Q 50 150 60 200" fill="none" stroke="${hairColor}" stroke-width="8"/><path d="M 135 70 Q 150 150 140 200" fill="none" stroke="${hairColor}" stroke-width="8"/>` : ''}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ПОЛУРОСЛИК
// ==========================================
function generateHalflingSVG(gender) {
    const isMale = gender === 'Мужчина';
    const skinColors = ['#fdd9b5', '#ffdbac', '#e0ac69'];
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const hairColors = ['#8d5524', '#a04000', '#5d4037']; // Коричневые, рыже-коричневые
    const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    const clothColors = ['#27ae60', '#f1c40f', '#e74c3c', '#3498db']; // Яркие цвета одежды
    const clothColor = clothColors[Math.floor(Math.random() * clothColors.length)];

    // Вьющиеся волосы (набор перекрывающихся кругов)
    const curlyHair = `
        <circle cx="70" cy="150" r="20" fill="${hairColor}"/><circle cx="130" cy="150" r="20" fill="${hairColor}"/>
        <circle cx="80" cy="135" r="25" fill="${hairColor}"/><circle cx="120" cy="135" r="25" fill="${hairColor}"/>
        <circle cx="100" cy="130" r="30" fill="${hairColor}"/>
    `;

    // Длинные бакенбарды у мужчин
    const sideburns = isMale ? `
        <path d="M 65 170 L 65 200 L 75 195 L 75 170 Z" fill="${hairColor}"/>
        <path d="M 135 170 L 135 200 L 125 195 L 125 170 Z" fill="${hairColor}"/>
    ` : '';

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            ${curlyHair}

            <ellipse cx="100" cy="270" rx="60" ry="60" fill="${clothColor}" stroke="#111" stroke-width="2"/>
            <rect x="95" y="210" width="10" height="90" fill="rgba(0,0,0,0.1)"/> <rect x="90" y="190" width="20" height="30" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <ellipse cx="100" cy="170" rx="40" ry="35" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            
            <circle cx="80" cy="175" r="8" fill="rgba(231, 76, 60, 0.3)"/> <circle cx="120" cy="175" r="8" fill="rgba(231, 76, 60, 0.3)"/>

            <circle cx="85" cy="165" r="5" fill="#fff" stroke="#111"/>
            <circle cx="85" cy="165" r="2.5" fill="#5d4037"/>
            <circle cx="115" cy="165" r="5" fill="#fff" stroke="#111"/>
            <circle cx="115" cy="165" r="2.5" fill="#5d4037"/>

            <path d="M 95 170 Q 100 175 105 170" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
            
            <path d="M 85 185 Q 100 195 115 185" fill="none" stroke="#111" stroke-width="1.5"/>

            ${sideburns}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ПОЛУЭЛЬФ
// ==========================================
function generateHalfElfSVG(gender) {
    const isMale = gender === 'Мужчина';
    const skinColors = ['#fdf2e9', '#fae5d3', '#f5cba7', '#e59866', '#d35400']; // Широкий спектр
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const eyeColors = ['#2ecc71', '#3498db', '#9b59b6', '#f1c40f']; // Эльфийские яркие глаза
    const eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    const hairColor = '#8c4a32'; // Усредненный цвет

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <path d="M 65 60 Q 100 20 135 60 L 140 140 L 60 140 Z" fill="${hairColor}"/>

            <!-- Среднее телосложение (между человеком и эльфом) -->
            <path d="M 45 150 L 155 150 L 140 280 L 60 280 Z" fill="#34495e" stroke="#111" stroke-width="2"/>
            <rect x="85" y="130" width="30" height="20" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <!-- Лицо -->
            <ellipse cx="100" cy="95" rx="30" ry="40" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Уши (Слегка заостренные) -->
            <polygon points="70,95 55,80 72,105" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <polygon points="130,95 145,80 128,105" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <!-- Эльфийские раскосые глаза -->
            <ellipse cx="88" cy="90" rx="6" ry="3" fill="#fff" stroke="#111" transform="rotate(-10 88 90)"/>
            <circle cx="88" cy="90" r="2.5" fill="${eyeColor}"/>
            <ellipse cx="112" cy="90" rx="6" ry="3" fill="#fff" stroke="#111" transform="rotate(10 112 90)"/>
            <circle cx="112" cy="90" r="2.5" fill="${eyeColor}"/>

            <path d="M 97 105 L 100 112 L 103 105" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
            <line x1="92" y1="120" x2="108" y2="120" stroke="#111" stroke-width="1.5"/>

            <!-- Борода для мужчин (скрывает наследие) -->
            ${isMale ? `<path d="M 75 110 Q 100 145 125 110 Q 100 130 75 110 Z" fill="${hairColor}" opacity="0.9"/>` : ''}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: САТИР
// ==========================================
function generateSatyrSVG(gender) {
    const isMale = gender === 'Мужчина';
    const furColor = '#8b4513'; // Мех козла
    const skinColor = '#e0ac69';

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Человеческий торс (короткий пояс) -->
            <path d="M 50 140 L 150 140 L 130 200 L 70 200 Z" fill="#27ae60" stroke="#111" stroke-width="2"/> <!-- Открытая туника -->
            <path d="M 70 140 L 130 140 L 110 200 L 90 200 Z" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <!-- Козлиные ноги (покрыты мехом) -->
            <path d="M 70 200 L 130 200 L 140 260 L 115 250 L 120 285 L 105 285 L 95 285 L 80 285 L 85 250 L 60 260 Z" fill="${furColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Копыта -->
            <rect x="75" y="285" width="20" height="15" fill="#111" rx="2"/>
            <rect x="105" y="285" width="20" height="15" fill="#111" rx="2"/>

            <!-- Руки с мягкой шерстью на предплечьях -->
            <rect x="35" y="140" width="15" height="50" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <rect x="35" y="190" width="15" height="30" fill="${furColor}" stroke="#111" stroke-width="1.5"/>
            <rect x="150" y="140" width="15" height="50" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <rect x="150" y="190" width="15" height="30" fill="${furColor}" stroke="#111" stroke-width="1.5"/>

            <rect x="85" y="120" width="30" height="20" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <!-- Лицо и волосы -->
            <ellipse cx="100" cy="90" rx="30" ry="35" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <path d="M 70 60 Q 100 40 130 60 Q 140 90 130 100 Q 100 70 70 100 Z" fill="#5d4037"/>

            <!-- Козлиные рога у основания черепа -->
            <path d="M 75 65 Q 40 40 50 20 Q 60 10 85 55" fill="#bdc3c7" stroke="#111" stroke-width="1.5"/>
            <path d="M 125 65 Q 160 40 150 20 Q 140 10 115 55" fill="#bdc3c7" stroke="#111" stroke-width="1.5"/>

            <!-- Заостренные уши -->
            <polygon points="70,95 45,85 70,105" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>
            <polygon points="130,95 155,85 130,105" fill="${skinColor}" stroke="#111" stroke-width="1.5"/>

            <circle cx="88" cy="85" r="3" fill="#111"/>
            <circle cx="112" cy="85" r="3" fill="#111"/>
            <path d="M 90 105 Q 100 115 110 105" fill="none" stroke="#111" stroke-width="1.5"/>
            
            ${isMale ? `<path d="M 90 115 L 100 130 L 110 115 Z" fill="#5d4037"/>` : ''} <!-- Козлиная бородка -->
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: СОВЛИН
// ==========================================
function generateOwlinSVG(gender) {
    const featherColors = ['#ecf0f1', '#bdc3c7', '#95a5a6', '#7f8c8d', '#5d4037'];
    const featherColor = featherColors[Math.floor(Math.random() * featherColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Крылья на спине -->
            <path d="M 80 140 Q 20 120 10 200 Q 40 250 80 180 Z" fill="${featherColor}" stroke="#111" stroke-width="2"/>
            <path d="M 120 140 Q 180 120 190 200 Q 160 250 120 180 Z" fill="${featherColor}" stroke="#111" stroke-width="2"/>

            <!-- Пушистое тело -->
            <ellipse cx="100" cy="180" rx="45" ry="60" fill="${featherColor}" stroke="#111" stroke-width="2"/>
            <!-- Узор на грудке -->
            <ellipse cx="100" cy="180" rx="30" ry="45" fill="rgba(255,255,255,0.4)"/>
            <path d="M 85 160 L 95 170 M 115 160 L 105 170 M 90 190 L 100 200 M 110 190 L 100 200" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>

            <!-- Лапы с когтями -->
            <rect x="75" y="240" width="10" height="40" fill="#f39c12" stroke="#111" stroke-width="2"/>
            <polygon points="70,280 80,270 90,280" fill="#f39c12" stroke="#111" stroke-width="1"/>
            <rect x="115" y="240" width="10" height="40" fill="#f39c12" stroke="#111" stroke-width="2"/>
            <polygon points="110,280 120,270 130,280" fill="#f39c12" stroke="#111" stroke-width="1"/>

            <!-- Руки (отдельно от крыльев) -->
            <path d="M 55 160 L 40 220" stroke="${featherColor}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 145 160 L 160 220" stroke="${featherColor}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- Совиная Голова -->
            <circle cx="100" cy="90" r="40" fill="${featherColor}" stroke="#111" stroke-width="2"/>
            <!-- Лицевые диски -->
            <circle cx="80" cy="90" r="20" fill="rgba(255,255,255,0.6)" stroke="rgba(0,0,0,0.2)"/>
            <circle cx="120" cy="90" r="20" fill="rgba(255,255,255,0.6)" stroke="rgba(0,0,0,0.2)"/>

            <!-- Огромные глаза -->
            <circle cx="80" cy="90" r="10" fill="#f1c40f" stroke="#111" stroke-width="1.5"/>
            <circle cx="80" cy="90" r="6" fill="#111"/>
            <circle cx="120" cy="90" r="10" fill="#f1c40f" stroke="#111" stroke-width="1.5"/>
            <circle cx="120" cy="90" r="6" fill="#111"/>

            <!-- Клюв -->
            <polygon points="95,100 105,100 100,115" fill="#f39c12" stroke="#111" stroke-width="1.5"/>

            <!-- Перьевые "ушки" на макушке -->
            <polygon points="65,55 75,30 85,50" fill="${featherColor}" stroke="#111" stroke-width="1.5"/>
            <polygon points="135,55 125,30 115,50" fill="${featherColor}" stroke="#111" stroke-width="1.5"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ТРИ-КРИН
// ==========================================
function generateThriKreenSVG(gender) {
    const chitinColors = ['#d4ac0d', '#aab7b8', '#a9cce3', '#f5cba7', '#7dcea0']; // Маскировочные цвета
    const color = chitinColors[Math.floor(Math.random() * chitinColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Нижние маленькие руки (Вторая пара) -->
            <path d="M 70 170 Q 30 180 50 210" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <path d="M 130 170 Q 170 180 150 210" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>

            <!-- Верхние большие руки -->
            <path d="M 60 130 L 20 150 L 30 200" fill="none" stroke="${color}" stroke-width="14" stroke-linejoin="bevel" stroke-linecap="round"/>
            <path d="M 140 130 L 180 150 L 170 200" fill="none" stroke="${color}" stroke-width="14" stroke-linejoin="bevel" stroke-linecap="round"/>
            <!-- Когти-лезвия на верхних руках -->
            <polygon points="25,190 35,190 30,220" fill="#111"/>
            <polygon points="165,190 175,190 170,220" fill="#111"/>

            <!-- Тело (Сегментированный хитин) -->
            <path d="M 70 120 L 130 120 L 140 160 L 60 160 Z" fill="${color}" stroke="#111" stroke-width="2"/>
            <path d="M 60 160 L 140 160 L 120 220 L 80 220 Z" fill="${color}" stroke="#111" stroke-width="2"/>
            <!-- Брюшко насекомого сзади -->
            <ellipse cx="100" cy="240" rx="40" ry="50" fill="${color}" stroke="#111" stroke-width="2"/>
            <!-- Полосы на брюшке -->
            <line x1="65" y1="230" x2="135" y2="230" stroke="#111" stroke-width="2" opacity="0.3"/>
            <line x1="70" y1="250" x2="130" y2="250" stroke="#111" stroke-width="2" opacity="0.3"/>

            <rect x="85" y="100" width="30" height="20" fill="${color}" stroke="#111" stroke-width="2"/> <!-- Шея -->

            <!-- Насекомоподобная Голова -->
            <polygon points="100,105 70,70 100,50 130,70" fill="${color}" stroke="#111" stroke-width="2"/>
            
            <!-- Большие фасеточные глаза -->
            <ellipse cx="80" cy="75" rx="10" ry="15" fill="#111" transform="rotate(-20 80 75)"/>
            <ellipse cx="120" cy="75" rx="10" ry="15" fill="#111" transform="rotate(20 120 75)"/>

            <!-- Жвалы -->
            <path d="M 90 95 Q 95 110 100 100" fill="none" stroke="#111" stroke-width="3"/>
            <path d="M 110 95 Q 105 110 100 100" fill="none" stroke="#111" stroke-width="3"/>

            <!-- Антенны -->
            <path d="M 90 55 Q 70 20 50 30" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
            <path d="M 110 55 Q 130 20 150 30" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ТРИТОН
// ==========================================
function generateTritonSVG(gender) {
    const scaleColors = ['#1abc9c', '#3498db', '#2980b9', '#8e44ad', '#9b59b6', '#16a085'];
    const color = scaleColors[Math.floor(Math.random() * scaleColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Выдающийся гребень (как плавник на макушке) -->
            <path d="M 100 70 Q 120 20 80 10 Q 90 40 100 70 Z" fill="#2ecc71" stroke="#111" stroke-width="1.5"/>

            <!-- Тело -->
            <path d="M 50 140 L 150 140 L 130 280 L 70 280 Z" fill="${color}" stroke="#111" stroke-width="2"/>
            
            <!-- Доспехи из ракушек и кораллов -->
            <path d="M 60 140 L 140 140 L 100 180 Z" fill="#ff7f50" stroke="#111" stroke-width="2"/> <!-- Коралловый нагрудник -->
            <circle cx="100" cy="155" r="10" fill="#ecf0f1" stroke="#111"/> <!-- Ракушка -->
            <line x1="90" y1="155" x2="110" y2="155" stroke="#111" opacity="0.5"/>
            <line x1="100" y1="145" x2="100" y2="165" stroke="#111" opacity="0.5"/>

            <!-- Шея -->
            <rect x="85" y="110" width="30" height="30" fill="${color}" stroke="#111" stroke-width="1.5"/>

            <!-- Руки с плавниками на предплечьях -->
            <rect x="35" y="140" width="15" height="80" fill="${color}" stroke="#111" stroke-width="1.5"/>
            <!-- Плавник на руке -->
            <path d="M 35 180 Q 10 190 35 210 Z" fill="#2ecc71" stroke="#111" stroke-width="1"/>
            
            <rect x="150" y="140" width="15" height="80" fill="${color}" stroke="#111" stroke-width="1.5"/>
            <!-- Плавник на руке -->
            <path d="M 165 180 Q 190 190 165 210 Z" fill="#2ecc71" stroke="#111" stroke-width="1"/>

            <!-- Перепончатые кисти -->
            <path d="M 35 220 L 25 240 L 35 245 L 45 240 Z" fill="${color}" stroke="#111" stroke-width="1"/>
            <path d="M 150 220 L 140 240 L 150 245 L 160 240 Z" fill="${color}" stroke="#111" stroke-width="1"/>

            <!-- Голова -->
            <ellipse cx="100" cy="85" rx="30" ry="35" fill="${color}" stroke="#111" stroke-width="1.5"/>
            <!-- Жабры на шее -->
            <path d="M 90 120 Q 95 125 90 130" fill="none" stroke="#111" stroke-width="1.5"/>
            <path d="M 110 120 Q 105 125 110 130" fill="none" stroke="#111" stroke-width="1.5"/>

            <!-- Лицо -->
            <circle cx="88" cy="85" r="4" fill="#111"/>
            <circle cx="88" cy="85" r="1.5" fill="#fff"/>
            <circle cx="112" cy="85" r="4" fill="#111"/>
            <circle cx="112" cy="85" r="1.5" fill="#fff"/>
            
            <path d="M 92 105 Q 100 110 108 105" fill="none" stroke="#111" stroke-width="1.5"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ФЭЙРИ
// ==========================================
function generateFairySVG(gender) {
    const skinColors = ['#fdf2e9', '#e8daef', '#d4efdf', '#fadbd8']; // Немного магические оттенки
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const wingColors = ['rgba(241, 196, 15, 0.6)', 'rgba(52, 152, 219, 0.6)', 'rgba(231, 76, 60, 0.6)', 'rgba(155, 89, 182, 0.6)'];
    const wingColor = wingColors[Math.floor(Math.random() * wingColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Блестки / магический туман вокруг -->
            <circle cx="30" cy="150" r="3" fill="#f1c40f" opacity="0.8"/>
            <circle cx="170" cy="100" r="2" fill="#f1c40f" opacity="0.8"/>
            <circle cx="150" cy="250" r="4" fill="#3498db" opacity="0.6"/>
            <circle cx="50" cy="220" r="2" fill="#e74c3c" opacity="0.7"/>

            <!-- Масштабирование: делаем их маленькими (трансформация в центр) -->
            <g transform="translate(40, 60) scale(0.6)">
                <!-- Насекомообразные крылья -->
                <path d="M 100 120 Q -20 0 20 100 Q 50 140 100 120" fill="${wingColor}" stroke="#fff" stroke-width="2"/>
                <path d="M 100 120 Q 220 0 180 100 Q 150 140 100 120" fill="${wingColor}" stroke="#fff" stroke-width="2"/>
                <!-- Нижняя пара крылышек -->
                <path d="M 100 130 Q 20 220 60 180 Z" fill="${wingColor}" stroke="#fff" stroke-width="1"/>
                <path d="M 100 130 Q 180 220 140 180 Z" fill="${wingColor}" stroke="#fff" stroke-width="1"/>

                <!-- Волосы -->
                <path d="M 60 60 Q 100 10 140 60 L 150 120 L 50 120 Z" fill="#e67e22"/>

                <!-- Туловище маленького эльфа -->
                <path d="M 70 140 L 130 140 L 110 240 L 90 240 Z" fill="#8e44ad" stroke="#111" stroke-width="2"/> <!-- Платье/Туника -->

                <!-- Руки -->
                <rect x="55" y="140" width="15" height="60" fill="${skinColor}" stroke="#111" stroke-width="2"/>
                <rect x="130" y="140" width="15" height="60" fill="${skinColor}" stroke="#111" stroke-width="2"/>

                <!-- Шея -->
                <rect x="90" y="120" width="20" height="20" fill="${skinColor}" stroke="#111" stroke-width="2"/>

                <!-- Лицо -->
                <ellipse cx="100" cy="90" rx="30" ry="35" fill="${skinColor}" stroke="#111" stroke-width="2"/>
                
                <!-- Острые длинные ушки -->
                <polygon points="70,90 30,70 70,100" fill="${skinColor}" stroke="#111" stroke-width="2"/>
                <polygon points="130,90 170,70 130,100" fill="${skinColor}" stroke="#111" stroke-width="2"/>

                <!-- Глаза -->
                <circle cx="85" cy="85" r="5" fill="#111"/>
                <circle cx="83" cy="83" r="1.5" fill="#fff"/>
                <circle cx="115" cy="85" r="5" fill="#111"/>
                <circle cx="113" cy="83" r="1.5" fill="#fff"/>
                
                <!-- Радостная улыбка -->
                <path d="M 90 105 Q 100 115 110 105" fill="none" stroke="#111" stroke-width="2"/>
            </g>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ФИРБОЛГ
// ==========================================
function generateFirbolgSVG(gender) {
    const isMale = gender === 'Мужчина';
    const skinColors = ['#bdc3c7', '#aab7b8', '#d5d8dc', '#e6b0aa', '#d2b4de', '#a2d9ce']; // Выцветшие природные тона
    const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
    const hairColors = ['#7f8c8d', '#5d4037', '#8d6e63', '#4e342e'];
    const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Массивное, широкоплечее тело -->
            <path d="M 30 140 L 170 140 L 150 280 L 50 280 Z" fill="#795548" stroke="#111" stroke-width="2"/>
            <path d="M 40 140 L 160 140 L 100 200 Z" fill="#5d4037" stroke="#111" stroke-width="2"/> <!-- Плащ из мха/шкур -->

            <!-- Толстая шея -->
            <rect x="80" y="110" width="40" height="30" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <!-- Крупные руки -->
            <rect x="20" y="140" width="25" height="100" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <rect x="155" y="140" width="25" height="100" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <!-- Густые, спутанные волосы -->
            <path d="M 60 70 Q 100 20 140 70 L 150 140 L 50 140 Z" fill="${hairColor}"/>

            <!-- Широкое лицо -->
            <ellipse cx="100" cy="90" rx="35" ry="40" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Большие коровьи/оленьи уши (горизонтальные) -->
            <ellipse cx="55" cy="90" rx="15" ry="8" fill="${skinColor}" stroke="#111" stroke-width="2" transform="rotate(-15 55 90)"/>
            <ellipse cx="145" cy="90" rx="15" ry="8" fill="${skinColor}" stroke="#111" stroke-width="2" transform="rotate(15 145 90)"/>

            <!-- Большой нос -->
            <ellipse cx="100" cy="95" rx="8" ry="10" fill="rgba(0,0,0,0.1)"/>
            <path d="M 95 95 Q 100 105 105 95" fill="none" stroke="#111" stroke-width="2"/>

            <!-- Спокойные глаза -->
            <circle cx="85" cy="85" r="4" fill="#111"/>
            <circle cx="115" cy="85" r="4" fill="#111"/>
            <circle cx="85" cy="85" r="1.5" fill="#f1c40f"/> <!-- Янтарный отблеск -->
            <circle cx="115" cy="85" r="1.5" fill="#f1c40f"/>

            <!-- Пышная неухоженная борода для мужчин -->
            ${isMale ? `
                <path d="M 65 100 Q 100 170 135 100 Q 100 120 65 100 Z" fill="${hairColor}" opacity="0.9"/>
                <circle cx="85" cy="120" r="3" fill="#f1c40f"/> <!-- Бусина в бороде -->
                <circle cx="110" cy="130" r="4" fill="#e74c3c"/> <!-- Бусина в бороде -->
            ` : ''}
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ХАДОЗИ
// ==========================================
function generateHadozeeSVG(gender) {
    const furColors = ['#f5b041', '#e67e22', '#873600', '#3e2723'];
    const furColor = furColors[Math.floor(Math.random() * furColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Кожистые перепонки (крылья) -->
            <path d="M 30 160 Q 60 220 70 260 L 70 140 Z" fill="#d7bde2" stroke="#111" stroke-width="1.5" opacity="0.9"/>
            <path d="M 170 160 Q 140 220 130 260 L 130 140 Z" fill="#d7bde2" stroke="#111" stroke-width="1.5" opacity="0.9"/>

            <!-- Худощавое тело -->
            <path d="M 65 140 L 135 140 L 120 260 L 80 260 Z" fill="#c0392b" stroke="#111" stroke-width="2"/> <!-- Легкий жилет -->
            
            <!-- Длинные, цепкие руки -->
            <path d="M 65 140 L 20 180 L 30 230" fill="none" stroke="${furColor}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 135 140 L 180 180 L 170 230" fill="none" stroke="${furColor}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- Шея -->
            <rect x="90" y="110" width="20" height="30" fill="${furColor}" stroke="#111" stroke-width="2"/>

            <!-- Грива / волосы -->
            <circle cx="100" cy="85" r="35" fill="#111"/> 
            
            <!-- Обезьянье лицо -->
            <ellipse cx="100" cy="95" rx="25" ry="30" fill="#e0ac69" stroke="#111" stroke-width="2"/>
            
            <!-- Выступающие скулы и нос -->
            <ellipse cx="100" cy="105" rx="15" ry="12" fill="#d39e5c" stroke="#111" stroke-width="1.5"/>
            <circle cx="95" cy="105" r="2" fill="#111"/>
            <circle cx="105" cy="105" r="2" fill="#111"/>

            <!-- Живые глаза -->
            <ellipse cx="88" cy="85" rx="6" ry="8" fill="#fff" stroke="#111"/>
            <circle cx="88" cy="85" r="3" fill="#111"/>
            <ellipse cx="112" cy="85" rx="6" ry="8" fill="#fff" stroke="#111"/>
            <circle cx="112" cy="85" r="3" fill="#111"/>

            <!-- Небольшие округлые уши -->
            <circle cx="70" cy="95" r="8" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <circle cx="130" cy="95" r="8" fill="${furColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Улыбка -->
            <path d="M 90 115 Q 100 120 110 115" fill="none" stroke="#111" stroke-width="2"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ХАРЕГОН (ИСПРАВЛЕНО - Соединенные ноги)
// ==========================================
function generateHarengonSVG(gender) {
    const furColors = ['#fdf2e9', '#d5dbdb', '#b2babb', '#e59866', '#873600'];
    const furColor = furColors[Math.floor(Math.random() * furColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Энергичная стойка / Тело -->
            <path d="M 60 140 L 140 140 L 130 230 L 70 230 Z" fill="#2ecc71" stroke="#111" stroke-width="2"/>
            
            <!-- Ноги (удлинены до y=280, чтобы войти в ступни) -->
            <rect x="70" y="230" width="15" height="50" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <rect x="115" y="230" width="15" height="50" fill="${furColor}" stroke="#111" stroke-width="2"/>

            <!-- Длинные заячьи ступни -->
            <ellipse cx="65" cy="280" rx="15" ry="30" fill="${furColor}" stroke="#111" stroke-width="2" transform="rotate(-20 65 280)"/>
            <ellipse cx="135" cy="280" rx="15" ry="30" fill="${furColor}" stroke="#111" stroke-width="2" transform="rotate(20 135 280)"/>
            
            <!-- Руки -->
            <rect x="40" y="140" width="15" height="60" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <rect x="145" y="140" width="15" height="60" fill="${furColor}" stroke="#111" stroke-width="2"/>

            <!-- Заячья Голова -->
            <ellipse cx="100" cy="95" rx="30" ry="35" fill="${furColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Длинные заячьи уши -->
            <ellipse cx="85" cy="35" rx="10" ry="40" fill="${furColor}" stroke="#111" stroke-width="2" transform="rotate(-15 85 35)"/>
            <ellipse cx="85" cy="35" rx="5" ry="30" fill="#fadbd8" transform="rotate(-15 85 35)"/>
            
            <ellipse cx="115" cy="35" rx="10" ry="40" fill="${furColor}" stroke="#111" stroke-width="2" transform="rotate(15 115 35)"/>
            <ellipse cx="115" cy="35" rx="5" ry="30" fill="#fadbd8" transform="rotate(15 115 35)"/>
            
            <!-- Глаза -->
            <circle cx="85" cy="90" r="5" fill="#111"/>
            <circle cx="115" cy="90" r="5" fill="#111"/>

            <!-- Носик и рот -->
            <polygon points="95,105 105,105 100,110" fill="#e74c3c"/>
            <path d="M 100 110 L 100 115 M 100 115 Q 95 120 90 115 M 100 115 Q 105 120 110 115" fill="none" stroke="#111" stroke-width="1.5"/>
            <!-- Усы -->
            <line x1="70" y1="105" x2="50" y2="100" stroke="#111" stroke-width="1"/>
            <line x1="70" y1="110" x2="50" y2="110" stroke="#111" stroke-width="1"/>
            <line x1="130" y1="105" x2="150" y2="100" stroke="#111" stroke-width="1"/>
            <line x1="130" y1="110" x2="150" y2="110" stroke="#111" stroke-width="1"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ХЕНРА
// ==========================================
function generateKhenraSVG(gender) {
    const furColors = ['#000000', '#212f3d', '#3e2723', '#4e342e'];
    const furColor = furColors[Math.floor(Math.random() * furColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Высокое худощавое тело -->
            <path d="M 65 150 L 135 150 L 120 280 L 80 280 Z" fill="#f1c40f" stroke="#111" stroke-width="2"/> <!-- Золотые одежды Амонхета -->
            <path d="M 75 130 L 125 130 L 135 150 L 65 150 Z" fill="${furColor}" stroke="#111" stroke-width="2"/> <!-- Открытые плечи -->

            <!-- Руки -->
            <rect x="45" y="140" width="15" height="90" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <rect x="140" y="140" width="15" height="90" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <!-- Золотые браслеты -->
            <rect x="43" y="180" width="19" height="10" fill="#f39c12"/>
            <rect x="138" y="180" width="19" height="10" fill="#f39c12"/>

            <!-- Шея -->
            <rect x="85" y="110" width="30" height="30" fill="${furColor}" stroke="#111" stroke-width="2"/>

            <!-- Голова шакала -->
            <polygon points="100,60 70,110 130,110" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <!-- Острая морда -->
            <polygon points="85,90 115,90 100,130" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <!-- Нос -->
            <circle cx="100" cy="125" r="4" fill="#111"/>
            
            <!-- Прямые уши над головой -->
            <polygon points="80,75 70,20 90,65" fill="${furColor}" stroke="#111" stroke-width="2"/>
            <polygon points="120,75 130,20 110,65" fill="${furColor}" stroke="#111" stroke-width="2"/>

            <!-- Острые глаза -->
            <polygon points="82,95 92,92 90,98" fill="#f1c40f"/>
            <polygon points="118,95 108,92 110,98" fill="#f1c40f"/>
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ШИФТЕР
// ==========================================
function generateShifterSVG(gender) {
    const isMale = gender === 'Мужчина';
    const skinColor = '#e0ac69'; // Человеческая основа
    const furColor = '#5d4037'; // Звериный мех

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Гибкое тело -->
            <path d="M 60 140 L 140 140 L 125 260 L 75 260 Z" fill="#34495e" stroke="#111" stroke-width="2"/>
            <rect x="85" y="120" width="30" height="20" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <!-- Руки с пятнами меха -->
            <rect x="40" y="140" width="15" height="80" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <path d="M 40 180 Q 35 200 40 220 L 55 220 L 55 180 Z" fill="${furColor}"/>
            
            <rect x="145" y="140" width="15" height="80" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <path d="M 145 180 Q 165 200 145 220 L 160 220 L 160 180 Z" fill="${furColor}"/>

            <!-- Лицо со звериными чертами -->
            <ellipse cx="100" cy="95" rx="30" ry="35" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Густые волосы/грива -->
            <path d="M 60 80 Q 100 20 140 80 L 145 120 Q 100 110 55 120 Z" fill="${furColor}"/>
            <!-- Бакенбарды / мех на щеках -->
            <polygon points="70,95 65,115 80,110" fill="${furColor}"/>
            <polygon points="130,95 135,115 120,110" fill="${furColor}"/>

            <!-- Заостренные уши -->
            <polygon points="70,90 50,80 70,105" fill="${furColor}" stroke="#111" stroke-width="1.5"/>
            <polygon points="130,90 150,80 130,105" fill="${furColor}" stroke="#111" stroke-width="1.5"/>

            <!-- Большие, часто кошачьи глаза -->
            <ellipse cx="85" cy="90" rx="7" ry="5" fill="#f1c40f" stroke="#111" stroke-width="1"/>
            <ellipse cx="85" cy="90" rx="1.5" ry="4" fill="#111"/> <!-- Вертикальный зрачок -->
            <ellipse cx="115" cy="90" rx="7" ry="5" fill="#f1c40f" stroke="#111" stroke-width="1"/>
            <ellipse cx="115" cy="90" rx="1.5" ry="4" fill="#111"/>

            <!-- Плоский нос -->
            <path d="M 95 105 Q 100 110 105 105" fill="none" stroke="#111" stroke-width="2"/>

            <!-- Рот с выдающимися клыками -->
            <path d="M 88 115 Q 100 120 112 115" fill="none" stroke="#111" stroke-width="1.5"/>
            <polygon points="90,116 92,122 94,117" fill="#fff" stroke="#111" stroke-width="0.5"/> <!-- Клык -->
            <polygon points="110,116 108,122 106,117" fill="#fff" stroke="#111" stroke-width="0.5"/> <!-- Клык -->
        </svg>
    `;
}

// ==========================================
// ГЕНЕРАТОР: ЮАНЬ-ТИ
// ==========================================
function generateYuanTiSVG(gender) {
    const skinColor = '#d5dbdb'; // Бледная кожа
    const scaleColors = ['#27ae60', '#f1c40f', '#34495e', '#8e44ad']; // Цвет чешуек
    const scaleColor = scaleColors[Math.floor(Math.random() * scaleColors.length)];

    return `
        <svg viewBox="0 0 200 300" width="100%" height="300px" xmlns="http://www.w3.org/2000/svg">
            <!-- Стройное тело -->
            <path d="M 65 140 L 135 140 L 125 280 L 75 280 Z" fill="#8e44ad" stroke="#111" stroke-width="2"/> <!-- Мантия -->
            <rect x="88" y="115" width="24" height="25" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Чешуйки на шее -->
            <polygon points="88,120 95,130 88,140" fill="${scaleColor}" opacity="0.7"/>
            <polygon points="112,120 105,130 112,140" fill="${scaleColor}" opacity="0.7"/>

            <!-- Руки -->
            <rect x="45" y="140" width="15" height="90" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            <rect x="140" y="140" width="15" height="90" fill="${skinColor}" stroke="#111" stroke-width="2"/>

            <!-- Гладкие темные волосы -->
            <path d="M 65 60 Q 100 20 135 60 L 140 120 L 60 120 Z" fill="#111"/>

            <!-- Человеческое, но неестественное лицо -->
            <ellipse cx="100" cy="95" rx="28" ry="35" fill="${skinColor}" stroke="#111" stroke-width="2"/>
            
            <!-- Мелкие чешуйки на скулах -->
            <circle cx="78" cy="100" r="4" fill="${scaleColor}" opacity="0.5"/>
            <circle cx="122" cy="100" r="4" fill="${scaleColor}" opacity="0.5"/>

            <!-- Пугающие глаза (змеиные) -->
            <ellipse cx="86" cy="90" rx="6" ry="4" fill="#f1c40f" stroke="#111" stroke-width="1" transform="rotate(-10 86 90)"/>
            <ellipse cx="86" cy="90" rx="1.5" ry="3.5" fill="#111" transform="rotate(-10 86 90)"/>
            <ellipse cx="114" cy="90" rx="6" ry="4" fill="#f1c40f" stroke="#111" stroke-width="1" transform="rotate(10 114 90)"/>
            <ellipse cx="114" cy="90" rx="1.5" ry="3.5" fill="#111" transform="rotate(10 114 90)"/>

            <!-- Тонкий нос (почти как щели) -->
            <line x1="97" y1="105" x2="99" y2="108" stroke="#111" stroke-width="1.5"/>
            <line x1="103" y1="105" x2="101" y2="108" stroke="#111" stroke-width="1.5"/>

            <!-- Рот и раздвоенный язык -->
            <line x1="90" y1="115" x2="110" y2="115" stroke="#111" stroke-width="1.5"/>
            <path d="M 100 115 L 100 123 L 97 127 M 100 123 L 103 127" fill="none" stroke="#e74c3c" stroke-width="1.5"/> <!-- Язык -->
        </svg>
    `;
}