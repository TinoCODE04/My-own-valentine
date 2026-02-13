// Get DOM elements
const questionPage = document.getElementById('question-page');
const successPage = document.getElementById('success-page');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const confettiContainer = document.getElementById('confetti-container');

// Track button movement attempts
let noButtonClicks = 0;

// Function to get random position for No button
function getRandomPosition() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate maximum positions to keep button within viewport
    const maxX = window.innerWidth - btnRect.width - 40;
    const maxY = window.innerHeight - btnRect.height - 40;

    // Generate random positions
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;

    // Ensure minimum distance from edges
    randomX = Math.max(20, Math.min(randomX, maxX));
    randomY = Math.max(100, Math.min(randomY, maxY - 100));

    return { x: randomX, y: randomY };
}

// Function to move No button to random position
function moveNoButton() {
    noButtonClicks++;
    const { x, y } = getRandomPosition();

    // Apply random position
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.transform = 'translate(0, 0)';

    // Optional: Make button smaller after several attempts
    if (noButtonClicks > 3) {
        noBtn.style.transform = `scale(${1 - (noButtonClicks * 0.05)})`;
    }

    // Add a little shake animation
    noBtn.style.animation = 'none';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 10);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ff3838', '#ff6348', '#ffa502'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }

        confettiContainer.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Create floating hearts in background
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 2 + 2) + 'rem';
        heart.style.opacity = '0';
        heart.style.animation = `floatHeart ${15 + Math.random() * 10}s linear`;
        heart.style.zIndex = '150';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 25000);
    }, 1500);
}

// Secret photo functionality with input validation
const secretBtn = document.getElementById('secret-btn');
const secretPhoto = document.getElementById('secret-photo');
const closePhotoBtn = document.getElementById('close-photo');
const inputModal = document.getElementById('input-modal');
const secretInput = document.getElementById('secret-input');
const submitAnswerBtn = document.getElementById('submit-answer');
const closeModalBtn = document.getElementById('close-modal');
const warningPopup = document.getElementById('warning-popup');

// Correct answer (case-insensitive)
const correctAnswer = '笨蛋宝宝';

// Show input modal when secret button is clicked
secretBtn.addEventListener('click', () => {
    inputModal.classList.add('active');
    secretInput.value = ''; // Clear previous input
    secretInput.focus(); // Auto-focus on input
});

// Close modal button
closeModalBtn.addEventListener('click', () => {
    inputModal.classList.remove('active');
    secretInput.value = '';
});

// Close modal when clicking outside
inputModal.addEventListener('click', (e) => {
    if (e.target === inputModal) {
        inputModal.classList.remove('active');
        secretInput.value = '';
    }
});

// Function to show warning popup
function showWarning() {
    warningPopup.classList.add('active');
    
    // Auto-hide warning after 5.0 seconds
    setTimeout(() => {
        warningPopup.classList.remove('active');
    }, 5000);
}

// Validate answer and show photo or warning
function validateAnswer() {
    const userAnswer = secretInput.value.trim();
    
    if (userAnswer === correctAnswer) {
        // Correct answer! Hide modal and show photo
        inputModal.classList.remove('active');
        secretInput.value = '';
        
        // Small delay for smooth transition
        setTimeout(() => {
            secretPhoto.classList.add('active');
        }, 300);
    } else {
        // Wrong answer! Show cute warning
        showWarning();
        secretInput.value = ''; // Clear input
        secretInput.focus(); // Refocus for retry
    }
}

// Submit button click
submitAnswerBtn.addEventListener('click', validateAnswer);

// Allow Enter key to submit
secretInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateAnswer();
    }
});

closePhotoBtn.addEventListener('click', () => {
    secretPhoto.classList.remove('active');
});

// Close photo when clicking outside the image
secretPhoto.addEventListener('click', (e) => {
    if (e.target === secretPhoto) {
        secretPhoto.classList.remove('active');
    }
});

// Handle Yes button click
yesBtn.addEventListener('click', () => {
    // Hide question page
    questionPage.classList.remove('active');

    // Show success page after short delay
    setTimeout(() => {
        successPage.classList.add('active');
        createConfetti();

        // Add more confetti for emphasis!
        setTimeout(createConfetti, 1000);
        setTimeout(createConfetti, 2000);
    }, 300);
});

// Handle No button hover (Desktop)
noBtn.addEventListener('mouseenter', () => {
    moveNoButton();
});

// Handle No button click (Mobile - touch)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Handle No button touch (Mobile)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Initialize floating hearts
createFloatingHearts();

// Add some sparkle to Yes button on page load
setTimeout(() => {
    yesBtn.style.animation = 'pulse 2s infinite';
}, 2000);
