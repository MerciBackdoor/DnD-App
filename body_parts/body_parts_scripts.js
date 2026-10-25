// Словарь соответствия граней к12 частям тела
const bodyPartsMap = {
  1:  "Голова",
  2:  "Шея и верх груди",
  3:  "Нижняя часть торса / живот / таз",
  4:  "Левое плечо и верх руки",
  5:  "Левое предплечье и кисть",
  6:  "Правое плечо и верх руки",
  7:  "Правое предплечье и кисть",
  8:  "Левая верхняя часть ноги (бедро)",
  9:  "Левая нижняя часть ноги и стопа",
  10: "Правая верхняя часть ноги (бедро)",
  11: "Правая нижняя часть ноги и стопа",
  12: "Центральная область паха"
};

let isRolling = false;

function rollHitLocation() {
  if (isRolling) return; // Защита от спама кликов во время анимации
  isRolling = true;

  const cubeEl = document.getElementById('d12-cube');
  const titleEl = document.getElementById('target-display');
  const logContent = document.getElementById('combat-log');
  const hitButton = document.getElementById('hit-trigger');

  // Включаем режим броска (визуальный эффект анимации)
  cubeEl.classList.add('rolling');
  hitButton.disabled = true;
  titleEl.textContent = "Кость катится...";

  // Сбрасываем старую подсветку на векторе тела
  document.querySelectorAll('.body-part').forEach(part => {
    part.classList.remove('active-hit');
  });

  // Эффект крутящегося кубика: быстро меняем случайные числа
  let ticks = 0;
  const rollInterval = setInterval(() => {
    cubeEl.textContent = Math.floor(Math.random() * 12) + 1;
    ticks++;

    if (ticks > 12) { // Конец броска через полсекунды
      clearInterval(rollInterval);
      
      // Итоговый чистый результат от 1 до 12
      const result = Math.floor(Math.random() * 12) + 1;
      const hitLocationName = bodyPartsMap[result];

      // Выводим финальные данные на панель
      cubeEl.classList.remove('rolling');
      cubeEl.textContent = result;
      titleEl.innerHTML = `<span style="color:#ff4d4d; font-weight:bold;">${hitLocationName}</span>`;

      // Включаем подсветку на SVG схеме
      const targetSvgPart = document.getElementById(`part-${result}`);
      if (targetSvgPart) {
        targetSvgPart.classList.add('active-hit');
      }

      // Добавляем запись в лог сражения
      if (document.querySelector('.log-empty')) {
        logContent.innerHTML = ''; // Стираем заглушку пустоты
      }

      const logRow = document.createElement('div');
      logRow.className = 'log-row';
      logRow.innerHTML = `
        <span class="log-dice-val">к12: ${result}</span>
        <span class="log-part-name">${hitLocationName}</span>
      `;
      
      // Вставляем новую запись на самый верх журнала
      logContent.insertBefore(logRow, logContent.firstChild);

      // Возвращаем кнопку в строй
      hitButton.disabled = false;
      isRolling = false;
    }
  }, 45);
}

// Позволяет Мастеру кликать мышкой по схеме вручную, чтобы подсветить нужную зону
document.querySelectorAll('.body-part').forEach(part => {
  part.addEventListener('click', function() {
    if (isRolling) return;
    
    document.querySelectorAll('.body-part').forEach(p => p.classList.remove('active-hit'));
    this.classList.add('active-hit');
    
    const partId = parseInt(this.id.replace('part-', ''));
    document.getElementById('d12-cube').textContent = partId;
    document.getElementById('target-display').innerHTML = `<span style="color:var(--gold); font-weight:bold;">${bodyPartsMap[partId]}</span>`;
  });
});