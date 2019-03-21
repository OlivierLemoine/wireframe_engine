import * as e from './engine.js';

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('body').append(canvas);

(async function() {
    let r = e.GameObjectFactory(
        await e.Load('./test_files/untitled2.obj', 'obj'),
    );
    r.model.behaviour.update = g => {
        // g.transform.translate(0.1, 0, 0);
        g.transform.rotate(0, 0.01, 0);
    };

    new e.Renderer(canvas, renderer => {
        renderer.camera.isometricFactor = 500;

        let r1 = r.new();
        r1.transform.position = new e.Vec3(0, 0, 5);
    });
})();
