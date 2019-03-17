import * as engine from './engine.js';
import { Vec3 } from './build/utils/Vec3.js';

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('body').append(canvas);

new engine.Renderer(canvas, renderer => {
    let o = new engine.GameObject();
    o.mesh.vectex = [
        new engine.Vec3(-1, -1, -1),
        new engine.Vec3(1, -1, -1),
        new engine.Vec3(1, 1, -1),
        new engine.Vec3(-1, 1, -1),

        new engine.Vec3(-1, -1, 1),
        new engine.Vec3(1, -1, 1),
        new engine.Vec3(1, 1, 1),
        new engine.Vec3(-1, 1, 1),
    ];
    o.mesh.edges = [
        [0, 1, 2],
        [0, 2, 3],

        [5, 4, 6],
        [6, 4, 7],

        [0, 3, 4],
        [4, 3, 7],

        [0, 4, 1],
        [1, 4, 5],

        [1, 5, 2],
        [5, 6, 2],

        [3, 2, 7],
        [2, 6, 7],
    ];

    o.transform.position = new Vec3(0, 0, 5);
    o.transform.scale = new Vec3(10, 10, 10);

    renderer.camera.isometricFactor = 100;

    let t = 0;

    function frame() {
        t += 0.05;

        o.transform.position = new Vec3(20 * Math.sin(t), 20 * Math.cos(t), 10);
        renderer.render();
        requestAnimationFrame(frame);
    }

    frame();
});
