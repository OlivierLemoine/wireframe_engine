import { GameObject } from './GameObject.js';
import { Camera } from './Camera.js';
import { Vec3 } from '../utils/Vec3.js';
export class Renderer {
    constructor(canvas, context) {
        this.objects = [];
        this.camera = new Camera();
        this.ctx = {
            ctx: canvas.getContext('2d') || new CanvasRenderingContext2D(),
            height: canvas.height,
            width: canvas.width
        };
        if (context) {
            GameObject.renderer = this;
            context(this);
            GameObject.renderer = undefined;
        }
        this.ctx.ctx.fillStyle = 'black';
        this.ctx.ctx.strokeStyle = 'white';
    }
    addObject(object) {
        this.objects.push(object);
    }
    render() {
        let draw = new Path2D();
        //Projection
        this.objects.forEach(o => {
            // Backface culling
            const edges = o.mesh.faces.filter((v, i) => {
                return (Vec3.dotProduct(this.camera.normal, o.mesh.normals[i]) <= 0);
            });
            const points = o.mesh.vectex.map(v => {
                const p = Vec3.multiply(Vec3.add(v, o.transform.position), o.transform.scale);
                const ajusted = Vec3.divide(Vec3.multiply(p, this.camera.zoom), this.camera.isometricFactor);
                const vectDir = Vec3.add(ajusted, this.camera.position);
                const num = this.camera.isometricFactor -
                    Vec3.dotProduct(this.camera.normal, this.camera.position);
                const den = Vec3.dotProduct(this.camera.normal, Vec3.add(vectDir, o.transform.position));
                const t = num / den;
                const res = [
                    t * vectDir.x + this.ctx.width / 2,
                    t * vectDir.y + this.ctx.height / 2
                ];
                return res;
            });
            edges.forEach(e => {
                draw.moveTo(points[e[0]][0], points[e[0]][1]);
                draw.lineTo(points[e[1]][0], points[e[1]][1]);
            });
        });
        //Draw
        this.ctx.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
        this.ctx.ctx.stroke(draw);
    }
}
