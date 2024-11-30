
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;



let setAudio = 0;


setAudio = Number.parseInt(localStorage.getItem('audio') ?? "0");

console.log(setAudio)

window.onload = () => {
    const userConfirmed = confirm("For browser safety reasons click ok to play music!");
    if (userConfirmed && setAudio) {
        const music = new Audio("../assets/music bg.mp3");
        music.play();
        music.addEventListener("ended", () => {
            music.play();
        })
    }
}



function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    location.reload()
}


window.addEventListener('resize', resizeCanvas);