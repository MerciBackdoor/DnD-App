/* ── Quick Notes — DnD Desktop widget ──────────────────────
   Отправляет postMessage в родительское окно (Desktop),
   которое создаёт sticky-note окно через createWindow().
   Обработчик: APP_HANDLERS['dnd-desktop-create-sticky']
   в файле app-listeners.js
   ───────────────────────────────────────────────────────── */

const titleInput  = document.getElementById('note-title');
const contentArea = document.getElementById('note-content');
const createBtn   = document.getElementById('create-btn');
const toast       = document.getElementById('toast');

let toastTimer;

function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

function getSelectedColor() {
  const checked = document.querySelector('input[name="color"]:checked');
  return checked ? checked.value : 'yellow';
}

createBtn.addEventListener('click', () => {
  const title   = titleInput.value.trim();
  const content = contentArea.value.trim();

  if (!content && !title) {
    showToast('Заметка пуста!');
    return;
  }

  window.parent.postMessage({
    type:    'dnd-desktop-create-sticky',
    title:   title,
    content: content || '—',
    color:   getSelectedColor()
  }, '*');

  // Сброс формы
  titleInput.value  = '';
  contentArea.value = '';
  showToast('Заметка создана ✓');
  titleInput.focus();
});

// Enter в заголовке → фокус на содержимое
titleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); contentArea.focus(); }
});

titleInput.focus();
