import * as engine from './engine.js';

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('body').append(canvas);

new engine.Renderer(canvas, (renderer) => {
    let o = new engine.GameObject();
    o.mesh.vectex = [
        new engine.Vec3(0, 0, 0),
        new engine.Vec3(1, 0, 0),
        new engine.Vec3(0, 1, 0)
    ];
    o.mesh.vectex = [[0, 1, 2]];
    o.mesh.updateNormals();

    renderer.render();
});
