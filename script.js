//your code here
const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image1.jpg" // One image is repeated
];

const imageContainer = document.getElementById('imageContainer');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');

let clickedImages = [];

// Function to shuffle images array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to render images
function renderImages() {
    shuffleArray(images);
    imageContainer.innerHTML = '';
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('img' + (index + 1));
        img.onclick = handleImageClick;
        imageContainer.appendChild(img);
    });
}

// Function to handle image click
function handleImageClick(event) {
    const clickedImage = event.target;
    if (!clickedImages.includes(clickedImage)) {
        clickedImages.push(clickedImage);
        clickedImage.classList.add('selected');
    }

    if (clickedImages.length === 2) {
        verifyButton.style.display = 'block';
    }

    if (clickedImages.length > 2) {
        verifyButton.style.display = 'none';
    }

    if (clickedImages.length === 1) {
        resetButton.style.display = 'block';
    }
}

// Function to reset state
function resetState() {
    clickedImages.forEach(img => img.classList.remove('selected'));
    clickedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.innerHTML = '';
}

// Function to verify selected images
function verifyImages() {
    if (clickedImages.length === 2) {
        const class1 = clickedImages[0].className;
        const class2 = clickedImages[1].className;
        if (class1 === class2) {
            para.innerHTML = 'You are a human. Congratulations!';
        } else {
            para.innerHTML = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }
        verifyButton.style.display = 'none';
    }
}

// Event listeners
resetButton.addEventListener('click', resetState);
verifyButton.addEventListener('click', verifyImages);

// Initial rendering of images
renderImages();