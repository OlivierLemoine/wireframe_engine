import { GameObject } from './GameObject.js';
import { Camera } from './Camera.js';
import { DrawingContext } from '../utils/DrawingContext.js';
import { Vec3 } from '../utils/Vec3.js';

export class Renderer {
    objects: GameObject[] = [];
    camera: Camera = new Camera();

    ctx: DrawingContext;

    constructor(canvas: HTMLCanvasElement, context?: Function) {
        this.ctx = {
            ctx: canvas.getContext('2d') || new CanvasRenderingContext2D(),
            height: canvas.height,
            width: canvas.width
        };

        if (context) {
            GameObject.renderer = this;
            context();
            GameObject.renderer = undefined;
        }
        this.ctx.ctx.fillStyle = 'black';
        this.ctx.ctx.strokeStyle = 'white';
    }

    addObject(object: GameObject) {
        this.objects.push(object);
    }

    render() {
        let draw = new Path2D();

        //Projection

        this.objects.forEach(o => {
            // Backface culling
            const edges = o.mesh.faces.filter((v, i) => {
                return (
                    Vec3.dotProduct(this.camera.normal, o.mesh.normals[i]) <= 0
                );
            });
        });

        //Draw
        this.ctx.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
        this.ctx.ctx.stroke(draw);
    }
}
