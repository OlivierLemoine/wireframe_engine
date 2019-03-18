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
    addObject(object) {
        this.objects.push(object);
    }
    render() {
        let a = new Path2D();
        //Projection
        this.objects.forEach(o => {
            const points = o.mesh.vectex.map(v => {
                const p = Vec3.add(Vec3.multiply(v, o.transform.scale), o.transform.position);
                const ajusted = Vec3.divide(Vec3.multiply(p, this.camera.zoom), this.camera.isometricFactor);
                const vectDir = Vec3.add(ajusted, this.camera.position);
                const num = this.camera.isometricFactor -
                    Vec3.dotProduct(this.camera.normal, this.camera.position);
                const den = Vec3.dotProduct(this.camera.normal, Vec3.add(vectDir, o.transform.position));
                const t = num / den;
                const res = [
                    t * vectDir.x + this.ctx.width / 2,
                    t * vectDir.y + this.ctx.height / 2,
                ];
                return { pos: p, proj: res };
            });
            let contour = points.slice(0, 2);
            for (let i = 2; i < points.length; i++) {
                let p = new Path2D();
                p.moveTo(contour[0].proj[0], contour[0].proj[1]);
                p.ellipse(contour[0].proj[0], contour[0].proj[1], 6, 6, 0, 0, 360);
                p.ellipse(contour[0].proj[0], contour[0].proj[1], 4, 4, 0, 0, 360);
                p.moveTo(contour[0].proj[0], contour[0].proj[1]);
                for (let k = 1; k < contour.length; k++) {
                    p.lineTo(contour[k].proj[0], contour[k].proj[1]);
                    p.ellipse(contour[k].proj[0], contour[k].proj[1], 4, 4, 0, 0, 360);
                    p.moveTo(contour[k].proj[0], contour[k].proj[1]);
                }
                this.ctx.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
                if (points[i + 0]) {
                    let b = new Path2D();
                    b.moveTo(points[i + 0].proj[0], points[i + 0].proj[1]);
                    b.ellipse(points[i + 0].proj[0], points[i + 0].proj[1], 4, 4, 0, 0, 360);
                    p.addPath(b);
                }
                this.ctx.ctx.stroke(p);
                console.log('');
                let vectPro = [];
                for (let j = 0; j < contour.length; j++) {
                    vectPro.push(sens(contour[(j + 1) % contour.length], contour[j], points[i]));
                }
                const chgmtIndex1 = vectPro.findIndex(v => v < 0);
                const chgmtIndex2 = vectPro.findIndex(v => v > 0);
                const neg = vectPro.filter(n => n < 0);
                const pos = vectPro.filter(n => n > 0);
                if (chgmtIndex1 === -1 || chgmtIndex2 === -1) {
                }
                else {
                    contour = [
                        ...contour.slice(0, (chgmtIndex2 + 1) % contour.length),
                        points[i],
                        ...contour.slice((chgmtIndex2 + 1) % contour.length),
                    ];
                }
            }
            contour.forEach((c, i) => {
                if (i === 0)
                    a.moveTo(c.proj[0], c.proj[1]);
                else
                    a.lineTo(c.proj[0], c.proj[1]);
            });
            a.lineTo(contour[0].proj[0], contour[0].proj[1]);
        });
        //Draw
        this.ctx.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
        this.ctx.ctx.stroke(a);
    }
}
function sens(c1, c2, p) {
    const p1 = new Vec3(c1.proj[0], c1.proj[1], 0);
    const p2 = new Vec3(c2.proj[0], c2.proj[1], 0);
    const p3 = new Vec3(p.proj[0], p.proj[1], 0);
    const v1 = Vec3.sub(p1, p2);
    const v2 = Vec3.sub(p3, p2);
    return Math.sign(Vec3.vectorialProduct(v1, v2).z);
}
