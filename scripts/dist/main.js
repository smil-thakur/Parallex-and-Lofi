import { loadSprite, makeInfiniteScroll, makeLayer, makeSprite } from "./utils.js";
const changeNatureBtn = document.getElementById("changeNatureButton");
const fpsContainer = document.getElementById("fps");
const audioInput = document.getElementById("audio");
let localNature = 3;
try {
    localNature = Number.parseInt(localStorage.getItem('nature'));
}
catch (err) {
    localNature = 3;
}
let nature = localNature;
localStorage.setItem('nature', nature.toString());
if (changeNatureBtn) {
    changeNatureBtn.addEventListener("click", () => {
        nature = (nature % 7) + 1;
        localStorage.setItem('nature', nature.toString());
        console.log(nature);
        main();
    });
}
const music = new Audio("../assets/music bg.mp3");
if (audioInput) {
    audioInput.checked = false;
    if (audioInput.checked) {
        localStorage.setItem('audio', "1");
        music.play();
    }
    music.addEventListener("ended", () => {
        music.play();
    });
    audioInput.addEventListener("change", () => {
        if (audioInput.checked) {
            localStorage.setItem('audio', "1");
            music.play();
        }
        else {
            localStorage.setItem('audio', "0");
            music.pause();
        }
    });
}
async function main() {
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    let [layer1, layer2, layer3, layer4] = await Promise.all([
        loadSprite(`../assets/natures/nature_${nature}/1.png`),
        loadSprite(`../assets/natures/nature_${nature}/2.png`),
        loadSprite(`../assets/natures/nature_${nature}/3.png`),
        loadSprite(`../assets/natures/nature_${nature}/4.png`),
    ]);
    let [layer5, layer6, layer7, layer8] = [];
    if (nature == 1) {
        [layer5, layer6, layer7, layer8] = await Promise.all([
            loadSprite(`../assets/natures/nature_${nature}/5.png`),
            loadSprite(`../assets/natures/nature_${nature}/6.png`),
            loadSprite(`../assets/natures/nature_${nature}/7.png`),
            loadSprite(`../assets/natures/nature_${nature}/8.png`),
        ]);
    }
    canvas.width = 1920;
    canvas.height = 1080;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const layer1nature7 = makeLayer(context, layer1, { x: 0, y: -100 }, 4);
    const layer1GameObj = makeSprite(context, layer1, { x: 0, y: -100 }, 4);
    const layer2GameObj = makeLayer(context, layer2, { x: 0, y: -100 }, 4);
    const layer3GameObj = makeLayer(context, layer3, { x: 0, y: -100 }, 4);
    const layer4GameObj = makeLayer(context, layer4, { x: 0, y: -100 }, 4);
    let layer5GameObj;
    let layer6GameObj;
    let layer7GameObj;
    let layer8GameObj;
    if (nature == 1) {
        layer5GameObj = makeLayer(context, layer5, { x: 0, y: -100 }, 4);
        layer6GameObj = makeLayer(context, layer6, { x: 0, y: -100 }, 4);
        layer7GameObj = makeLayer(context, layer7, { x: 0, y: -100 }, 4);
        layer8GameObj = makeLayer(context, layer8, { x: 0, y: -100 }, 4);
    }
    let dt;
    let oldTimeStamp = 0;
    let fps;
    let fpsMax = 0;
    let fpsMin = Number.MAX_VALUE;
    function gameLoop(timeStamp) {
        dt = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
        fps = Math.round(1 / dt);
        fpsMax = Math.max(fps, fpsMax);
        fpsMin = Math.min(fpsMin, fps);
        if (fpsContainer) {
            fpsContainer.innerHTML = `Max FPS: ${fpsMax}, Min FPS: ${fpsMin}`;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        // layer2GameObj.head.draw();
        if (nature == 1) {
            layer1GameObj.draw();
            makeInfiniteScroll(dt, layer2GameObj, -100);
            makeInfiniteScroll(dt, layer3GameObj, -400);
            makeInfiniteScroll(dt, layer4GameObj, -1000);
            makeInfiniteScroll(dt, layer5GameObj, -1000);
            makeInfiniteScroll(dt, layer6GameObj, -1000);
            makeInfiniteScroll(dt, layer7GameObj, -1000);
            makeInfiniteScroll(dt, layer8GameObj, -100);
        }
        else if (nature == 7) {
            makeInfiniteScroll(dt, layer1nature7, -400);
            makeInfiniteScroll(dt, layer2GameObj, -1000);
        }
        else {
            layer1GameObj.draw();
            makeInfiniteScroll(dt, layer2GameObj, -100);
            makeInfiniteScroll(dt, layer3GameObj, -700);
            makeInfiniteScroll(dt, layer4GameObj, -1900);
        }
        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
}
main();
//# sourceMappingURL=main.js.map