import * as engine from './engine.js';
import { Vec3 } from './build/utils/Vec3.js';
import { GameObject } from './build/engine/GameObject.js';

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('body').append(canvas);

let model = new engine.GameObject('cube');
model.behaviour.init = g => {
    console.log('hi');
};
model.behaviour.update = g => {
    g.transform.translate(1, 0, 0);
};
model.transform.position = new engine.Vec3(0, 0, 20);
model.transform.scale = new engine.Vec3(10, 10, 10);
let modifiedCube = engine.GameObjectFactory(model);

new engine.Renderer(canvas, renderer => {
    renderer.camera.isometricFactor = 500;

    let c1 = modifiedCube.new();
    let c2 = new GameObject('cube');
    c2.transform.translate(0, 0, 20);

    function frame() {
        renderer.render();
        requestAnimationFrame(frame);
    }
    frame();
});
