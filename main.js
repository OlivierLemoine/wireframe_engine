import * as engine from './engine.js';
import { Vec3 } from './build/utils/Vec3.js';

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('body').append(canvas);

new engine.Renderer(canvas, renderer => {
    let o = new engine.GameObject('sphere', 10);

    o.transform.position = new Vec3(0, 0, 10);
    o.transform.scale = new Vec3(10, 10, 10);

    renderer.camera.isometricFactor = 500;

    let t = 0;

    function frame() {
        t += 0.05;

        o.transform.position = new Vec3(40 * Math.sin(t), 40 * Math.cos(t), 10);
        renderer.render();

        requestAnimationFrame(frame);
    }
    frame();
});
