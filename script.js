// Memory texts for photo backs
const memories = [
    "💕",
    "💕",
    "i love u",
    "💕 ",
    "first flowers 💕",
    "rawan 💕",
    "💕",
    "💘",
    " 😘",
    "💕",
    "The One That Stole My Heart 💝"
    
];

// Sequence control
window.onload = function() {
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            showFirstPage();
        }, 500);
    }, 3000);
};

function showFirstPage() {
    const firstPage = document.getElementById('firstPage');
    firstPage.style.display = 'flex';
    setTimeout(() => {
        firstPage.style.opacity = '1';
    }, 100);
}

function showMainContent() {
    const firstPage = document.getElementById('firstPage');
    firstPage.style.opacity = '0';
    
    setTimeout(() => {
        firstPage.style.display = 'none';
        const mainContent = document.getElementById('mainContent');
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.style.opacity = '1';
            createPhotoWall();
        }, 100);
    }, 500);
}

// Create and position photos
function createPhotoWall() {
    const photoWall = document.getElementById('photoWall');
    const numPhotos = 12;

    for (let i = 0; i < numPhotos; i++) {
        const container = document.createElement('div');
        container.className = 'photo-container';
        
        // Front of photo
        const photo = document.createElement('img');
        photo.className = 'photo';
        photo.src = `Photo_${i + 1}.jpg`;
        photo.alt = `Memory ${i + 1}`;
        
        // Back of photo with memory text
        const back = document.createElement('div');
        back.className = 'photo-back';
        back.innerHTML = memories[i];

        container.appendChild(photo);
        container.appendChild(back);

        // Random position and rotation
        const randomX = Math.random() * 60 - 30;
        const randomY = Math.random() * 60 - 30;
        const randomRotate = Math.random() * 40 - 20;
        const randomScale = 0.9 + Math.random() * 0.3;

        container.style.left = `${25 + (i % 3) * 30}%`;
        container.style.top = `${20 + Math.floor(i / 3) * 30}%`;
        container.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg) scale(${randomScale})`;

        // container.addEventListener('mouseover', createSparkles);
        
        photoWall.appendChild(container);
    }
}

// Create sparkle effect
// function createSparkles(e) {
//     for (let i = 0; i < 5; i++) {
//         const sparkle = document.createElement('div');
//         sparkle.className = 'sparkle';
//         sparkle.innerHTML = '✨';
//         sparkle.style.left = `${e.pageX}px`;
//         sparkle.style.top = `${e.pageY}px`;
//         sparkle.style.animation = `sparkle ${0.5 + Math.random()}s linear forwards`;
//         document.body.appendChild(sparkle);
//         setTimeout(() => sparkle.remove(), 1000);
//     }
// }

// Love meter functionality
let loveLevel = 0;
document.addEventListener('mousemove', () => {
    if (loveLevel < 100) {
        loveLevel += 0.1;
        document.getElementById('loveMeter').style.width = `${loveLevel}%`;
    }
});

// Handle response and confetti
function handleResponse(isYes) {
    const responseDiv = document.getElementById('response');
    if (isYes) {
        // var myHTML = '<div class="tenor-gif-embed" data-postid="16653841" data-share-method="host" data-aspect-ratio="1.23552" data-width="100%" data-autoplay="true"></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>'
        // responseDiv.innerHTML = "❤️ You've made me the happiest person! ❤️";
        responseDiv.innerHTML = '<p> ❤️ Yayyyyy ❤️</p> <img src="cat_cute2.gif" alt="Happy GIF" style="width: 100%; max-width: 300px;">';
        document.getElementById('noBtn').style.display = 'none';
        startConfetti();
        document.getElementById('loveMeter').style.width = '100%';
    }
}

function moveButton() {
    const noBtn = document.getElementById('noBtn');
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
}

const myAudio = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
var isPlaying = false;
myAudio.volume = 1;


function toggleMusic() {
    isPlaying ? myAudio.pause() : myAudio.play();
};
function adjustVolume(volume) {
    myAudio.volume = volume;
}
myAudio.onplaying = function() {
isPlaying = true;
};
myAudio.onpause = function() {
isPlaying = false;
};
// Confetti effect
function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const confetti = [];

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.speed = 2 + Math.random() * 3;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = -4 + Math.random() * 8;
            this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        }

        update() {
            this.y += this.speed;
            this.rotation += this.rotationSpeed;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-5, -5, 10, 10);
            ctx.restore();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (confetti.length < 100) {
            confetti.push(new ConfettiPiece());
        }

        for (let i = confetti.length - 1; i >= 0; i--) {
            confetti[i].update();
            confetti[i].draw();

            if (confetti[i].y > canvas.height) {
                confetti.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

       animate();


}
