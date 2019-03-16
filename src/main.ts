import * as engine from "./engine.js";

let canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
(document.querySelector('body') || document.createElement('body')).append(
    canvas
);

new engine.Renderer(canvas, () => {
    let c = new engine.GameObject();
})