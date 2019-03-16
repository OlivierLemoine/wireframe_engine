import * as engine from '../engine.js';

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('body').append(canvas);

new engine.Renderer(canvas, () => {
    let c = new engine.GameObject();
});
