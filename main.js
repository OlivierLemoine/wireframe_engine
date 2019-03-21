import * as e from './engine.js';
import { Quaternion } from './build/utils/Quaternion.js';

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('body').append(canvas);

(async function() {
    let r = e.GameObjectFactory(
        await e.Load('./test_files/untitled.obj', 'obj'),
    );
    r.model.behaviour.update = g => {
        g.transform.translate(0.1, 0, -0.1);
        g.transform.rotation = e.Quaternion.multiply(
            g.transform.rotation,
            new Quaternion(0.1, 0, 0.1),
        );
    };

    new e.Renderer(canvas, renderer => {
        renderer.camera.isometricFactor = 500;

        let r1 = r.new();
        r1.transform.position = new e.Vec3(0, 0, 10);
    });
})();
