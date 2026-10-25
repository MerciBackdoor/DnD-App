// ── Банк ответов ─────────────────────────────────────────────────────────────
const ANSWERS = {
  affirm: [
    'Точно',
    'Несомненно',
    'Да, безусловно',
    'Можете на это рассчитывать',
    'На мой взгляд — да',
    'Скорее всего',
    'Перспективы хорошие',
    'Да',
    'Всё указывает на то, что да',
  ],
  neutral: [
    'Ответ неясен',
    'Попробуйте позже',
    'Лучше пока не говорить',
    'Сейчас сказать невозможно',
    'Сконцентрируйся и переспроси',
  ],
  deny: [
    'Не рассчитывай на это',
    'Мой ответ — нет',
    'Мои источники говорят нет',
    'Перспективы не радужные',
    'Очень сомнительно',
  ],
};

const POOL = [
  ...Array(9).fill('affirm'),
  ...Array(5).fill('neutral'),
  ...Array(5).fill('deny'),
];

const ball        = document.getElementById('ball');
const answerBox   = document.getElementById('answer-box');
const answerText  = document.getElementById('answer-box-text');
const hint        = document.getElementById('hint');

let busy     = false;
let lastType = null;

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getAnswer() {
  let type;
  do { type = pick(POOL); } while (type === lastType);
  lastType = type;
  return { type, text: pick(ANSWERS[type]) };
}

function reveal() {
  if (busy) return;
  busy = true;

  // Сброс
  ball.classList.remove('revealed', 'affirm', 'neutral', 'deny', 'shaking');
  answerBox.classList.remove('affirm', 'neutral', 'deny');
  answerText.classList.remove('visible', 'affirm', 'neutral', 'deny');
  answerText.textContent = '';

  void ball.offsetWidth; // reflow
  ball.classList.add('shaking');

  const { type, text } = getAnswer();

  setTimeout(() => {
    ball.classList.remove('shaking');
    ball.classList.add('revealed', type);

    answerBox.classList.add(type);
    answerText.textContent = text;
    answerText.classList.add(type);

    // Чуть задержим появление текста для красоты
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        answerText.classList.add('visible');
      });
    });

    hint.textContent = 'Коснись снова, чтобы спросить ещё раз';
    hint.classList.add('faded');
    busy = false;
  }, 580);
}

ball.addEventListener('click', reveal);
ball.addEventListener('touchend', e => { e.preventDefault(); reveal(); });
