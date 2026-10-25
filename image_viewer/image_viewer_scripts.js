let imagesData = []; // Array of Base64 strings for loaded images
let currentIndex = 0; // Index of the currently displayed image

const imgElement       = document.getElementById('display-image');
const emptyState       = document.getElementById('empty-state');
const counterElement   = document.getElementById('counter');
const arrowPrev        = document.getElementById('arrow-prev');
const arrowNext        = document.getElementById('arrow-next');
const fileInput        = document.getElementById('image-upload');
const deleteBtn        = document.getElementById('delete-btn');
const clearAllBtn      = document.getElementById('clear-all-btn');

function triggerNavUpload() {
  fileInput.click();
}

// Handle multiple file selection (add to existing)
function handleImagesSelect(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  let loadedCount = 0;
  const newImages = [];

  // Convert new files to Base64
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = function(e) {
      newImages.push(e.target.result);
      loadedCount++;

      // When all selected files are converted
      if (loadedCount === files.length) {
        const initialLength = imagesData.length;
        
        // Merge old image array with the new ones
        imagesData = imagesData.concat(newImages);
        
        if (initialLength === 0) {
          currentIndex = 0;
        } else {
          // Switch focus to the first newly added image
          currentIndex = initialLength;
        }

        fileInput.value = ""; // Reset input to allow re-uploading same files
        saveState();
        renderCurrentImage();
      }
    };
    reader.readAsDataURL(files[i]);
  }
}

// Delete current image
function deleteCurrentImage() {
  if (imagesData.length === 0) return;

  // Remove element from array by current index
  imagesData.splice(currentIndex, 1);

  // Adjust index so it does not go out of bounds
  if (currentIndex >= imagesData.length && imagesData.length > 0) {
    currentIndex = imagesData.length - 1;
  }

  saveState();
  renderCurrentImage();
}

// Full clear of the gallery
function clearAllImages() {
  if (imagesData.length === 0) return;
  if (confirm("Are you sure you want to delete ALL images from this window?")) {
    imagesData = [];
    currentIndex = 0;
    saveState();
    renderCurrentImage();
  }
}

// Display current image and update buttons
function renderCurrentImage() {
  if (imagesData.length === 0) {
    imgElement.style.display = 'none';
    emptyState.style.display = 'block';
    counterElement.textContent = '0 / 0';
    arrowPrev.style.display = 'none';
    arrowNext.style.display = 'none';
    if(deleteBtn) deleteBtn.style.display = 'none';
    if(clearAllBtn) clearAllBtn.style.display = 'none';
    return;
  }

  emptyState.style.display = 'none';
  
  // CSS object-fit: contain automatically scales the image to fit the current window size
  imgElement.src = imagesData[currentIndex];
  imgElement.style.display = 'block';

  // Show control buttons since images exist
  if(deleteBtn) deleteBtn.style.display = 'flex';
  if(clearAllBtn) clearAllBtn.style.display = 'flex';

  // Update page counter
  counterElement.textContent = `${currentIndex + 1} / ${imagesData.length}`;

  // Show side arrows only if more than 1 image
  if (imagesData.length > 1) {
    arrowPrev.style.display = 'flex';
    arrowNext.style.display = 'flex';
  } else {
    arrowPrev.style.display = 'none';
    arrowNext.style.display = 'none';
  }
}

// Switch forward/backward
function nextImage() {
  if (imagesData.length <= 1) return;
  currentIndex = (currentIndex + 1) % imagesData.length;
  saveState();
  renderCurrentImage();
}

function prevImage() {
  if (imagesData.length <= 1) return;
  currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
  saveState();
  renderCurrentImage();
}

// Hotkey listener (Arrows and Delete)
document.addEventListener('keydown', (e) => {
  if (imagesData.length > 0) {
    if (e.key === 'Delete') deleteCurrentImage();
  }
  if (imagesData.length <= 1) return;
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft')  prevImage();
});

// Save state to local storage
function saveState() {
  const state = {
    images: imagesData,
    index: currentIndex
  };
  localStorage.setItem('dnd_image_viewer_state', JSON.stringify(state));
}

// Load state on page load/F5
function loadState() {
  const saved = localStorage.getItem('dnd_image_viewer_state');
  if (saved) {
    try {
      const state = JSON.parse(saved);
      imagesData = state.images || [];
      currentIndex = state.index !== undefined ? state.index : 0;
      
      if (currentIndex >= imagesData.length) currentIndex = 0;
    } catch (e) {
      console.error("Error loading image viewer session", e);
    }
  }
  renderCurrentImage();
}

// Entry point on app init
loadState();