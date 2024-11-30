
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


let setAudio = 0;

try {
    setAudio = Number.parseInt(localStorage.getItem('audio')!);
} catch (err) {
    setAudio = 0;
}


if (setAudio) {
    const music = new Audio("../assets/music bg.mp3");
    music.play();
    music.addEventListener("ended", () => {
        music.play();
    })
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);