import { GameObject } from './GameObject.js';
import { Camera } from './Camera.js';
import { DrawingContext } from '../utils/DrawingContext.js';
import { Vec3 } from '../utils/Vec3.js';

export class Renderer {
    objects: GameObject[] = [];
    camera: Camera = new Camera();

    ctx: DrawingContext;

    constructor(
        canvas: HTMLCanvasElement,
        context?: (renderer: Renderer) => undefined,
    ) {
        this.ctx = {
            ctx: canvas.getContext('2d') || new CanvasRenderingContext2D(),
            height: canvas.height,
            width: canvas.width,
        };

        this.ctx.ctx.fillStyle = 'black';
        this.ctx.ctx.strokeStyle = 'white';

        if (context) {
            GameObject.renderer = this;
            context(this);
            GameObject.renderer = undefined;
        }
    }

    addObject(object: GameObject) {
        this.objects.push(object);
    }

    render() {
        let a = new Path2D();

        //Projection

        this.objects.forEach(o => {
            const points = o.mesh.vectex.map(v => {
                const p = Vec3.add(
                    Vec3.multiply(v, o.transform.scale),
                    o.transform.position,
                );
                const ajusted = Vec3.divide(
                    Vec3.multiply(p, this.camera.zoom),
                    this.camera.isometricFactor,
                );
                const vectDir = Vec3.add(ajusted, this.camera.position);
                const num =
                    this.camera.isometricFactor -
                    Vec3.dotProduct(this.camera.normal, this.camera.position);
                const den = Vec3.dotProduct(
                    this.camera.normal,
                    Vec3.add(vectDir, o.transform.position),
                );

                const t = num / den;

                const res = [
                    t * vectDir.x + this.ctx.width / 2,
                    t * vectDir.y + this.ctx.height / 2,
                ];

                return { pos: p, proj: res };
            });

            const edges = o.mesh.edges.filter(e => {
                const res = Vec3.dotProduct(
                    Vec3.sub(points[e[0]].pos, this.camera.position),
                    Vec3.vectorialProduct(
                        Vec3.sub(points[e[0]].pos, points[e[1]].pos),
                        Vec3.sub(points[e[2]].pos, points[e[1]].pos),
                    ),
                );
                return res <= 0;
            });

            edges.forEach(e => {
                a.moveTo(points[e[0]].proj[0], points[e[0]].proj[1]);
                a.lineTo(points[e[1]].proj[0], points[e[1]].proj[1]);
                a.lineTo(points[e[2]].proj[0], points[e[2]].proj[1]);
                a.lineTo(points[e[0]].proj[0], points[e[0]].proj[1]);
            });
        });

        //Draw
        this.ctx.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
        this.ctx.ctx.stroke(a);
    }
}
