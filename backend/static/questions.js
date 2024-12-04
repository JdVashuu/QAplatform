document.getElementById('openPopupBtn').addEventListener('click', function() {
    document.getElementById('questionPopup').style.display = 'flex';
});

document.getElementById('closePopupBtn').addEventListener('click', function() {
    document.getElementById('questionPopup').style.display = 'none';
});

// Selecting necessary elements
const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('questionPopup');

// Open the popup
openPopupBtn.addEventListener('click', () => {
    popup.style.display = 'flex'; // Use flex to ensure centering
});

// Close the popup
closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close popup when clicking outside the popup content
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

