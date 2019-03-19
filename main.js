import * as engine from './engine.js';

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('body').append(canvas);

let model = new engine.GameObject('cube');
const rot = new engine.Quaternion(1, 0, 0, 0);
let t = 0;
model.behaviour.update = g => {
    t += 0.05;
    g.transform.position = new engine.Vec3(30 * Math.sin(t), 30 * Math.cos(t), 10);
    // g.transform.rotation = engine.Quaternion.multiply(g.transform.rotation, rot);
};
model.transform.position = new engine.Vec3(-3, -3, 10);
model.transform.scale = new engine.Vec3(10, 10, 10);
let modifiedCube = engine.GameObjectFactory(model);

new engine.Renderer(canvas, renderer => {
    renderer.camera.isometricFactor = 500;

    modifiedCube.new();
});
