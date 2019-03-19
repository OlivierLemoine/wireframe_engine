import { GameObject } from './GameObject.js';
import { Camera } from './Camera.js';
import { DrawingContext } from '../utils/DrawingContext.js';
import { Vec3 } from '../utils/Vec3.js';

export class Renderer {
    objects: GameObject[] = [];
    camera: Camera = new Camera();
    
    ctx: DrawingContext;

    /** 
     * Renderer
     * @param canvas Scene will be rendered in canvas
     * @param context If define, the function in which every objects will be attached to this renderer
     */
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

    /** Add an object to be rendered */
    addObject(object: GameObject) {
        this.objects.push(object);
    }

    /** Render into the context all the known objects */
    render() {
        //Projection
        this.ctx.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
        this.objects
            .sort(
                (a, b) =>
                    Vec3.distanceSquared(b.transform.position) -
                    Vec3.distanceSquared(a.transform.position),
            )
            .forEach(o => {
                let drawPath = new Path2D();

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
                        Vec3.dotProduct(
                            this.camera.normal,
                            this.camera.position,
                        );
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

                let contour = points.slice(0, 2);
                for (let i = 2; i < points.length; i++) {
                    // let p = new Path2D();
                    // p.moveTo(contour[0].proj[0], contour[0].proj[1]);
                    // p.ellipse(
                    //     contour[0].proj[0],
                    //     contour[0].proj[1],
                    //     6,
                    //     6,
                    //     0,
                    //     0,
                    //     360,
                    // );
                    // p.ellipse(
                    //     contour[0].proj[0],
                    //     contour[0].proj[1],
                    //     4,
                    //     4,
                    //     0,
                    //     0,
                    //     360,
                    // );
                    // p.moveTo(contour[0].proj[0], contour[0].proj[1]);
                    // for (let k = 1; k < contour.length; k++) {
                    //     p.lineTo(contour[k].proj[0], contour[k].proj[1]);
                    //     p.ellipse(
                    //         contour[k].proj[0],
                    //         contour[k].proj[1],
                    //         4,
                    //         4,
                    //         0,
                    //         0,
                    //         360,
                    //     );
                    //     p.moveTo(contour[k].proj[0], contour[k].proj[1]);
                    // }
                    // this.ctx.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
                    // if (points[i + 0]) {
                    //     let b = new Path2D();
                    //     b.moveTo(points[i + 0].proj[0], points[i + 0].proj[1]);
                    //     b.ellipse(
                    //         points[i + 0].proj[0],
                    //         points[i + 0].proj[1],
                    //         4,
                    //         4,
                    //         0,
                    //         0,
                    //         360,
                    //     );
                    //     p.addPath(b);
                    // }
                    // this.ctx.ctx.stroke(p);
                    // console.log('');

                    let vectPro: number[] = [];
                    for (let j = 0; j < contour.length; j++) {
                        vectPro.push(
                            sens(
                                contour[(j + 1) % contour.length],
                                contour[j],
                                points[i],
                            ),
                        );
                    }
                    if (
                        vectPro[0] > 0 &&
                        vectPro[vectPro.length - 1] > 0 &&
                        vectPro.length > 2
                    ) {
                        while (vectPro[0] > 0) {
                            const firstElemV = vectPro.shift();
                            const firstElemC = contour.shift();
                            if (firstElemV) vectPro.push(firstElemV);
                            if (firstElemC) contour.push(firstElemC);
                        }
                    }
                    let ind2: number[] = [];
                    vectPro.forEach((v, i) => {
                        if (v > 0) ind2.push(i);
                    });

                    if (ind2.length === 1) {
                        contour = [
                            ...contour.slice(0, (ind2[0] + 1) % contour.length),
                            points[i],
                            ...contour.slice((ind2[0] + 1) % contour.length),
                        ];
                    } else if (ind2.length > 1) {
                        contour.splice(ind2[1], ind2.length - 1, points[i]);
                    }
                }
                contour.forEach((c, i) => {
                    if (i === 0) drawPath.moveTo(c.proj[0], c.proj[1]);
                    else drawPath.lineTo(c.proj[0], c.proj[1]);
                });
                drawPath.lineTo(contour[0].proj[0], contour[0].proj[1]);
                this.ctx.ctx.fill(drawPath, 'nonzero');
                this.ctx.ctx.stroke(drawPath);
            });

        //Draw
        // this.ctx.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
        // this.ctx.ctx.fill()
        // this.ctx.ctx.stroke(a);
    }
}

function sens(
    c1: {
        pos: Vec3;
        proj: number[];
    },
    c2: {
        pos: Vec3;
        proj: number[];
    },
    p: {
        pos: Vec3;
        proj: number[];
    },
) {
    const p1 = new Vec3(c1.proj[0], c1.proj[1], 0);
    const p2 = new Vec3(c2.proj[0], c2.proj[1], 0);
    const p3 = new Vec3(p.proj[0], p.proj[1], 0);
    const v1 = Vec3.sub(p1, p2);
    const v2 = Vec3.sub(p3, p2);
    return Math.sign(Vec3.vectorialProduct(v1, v2).z);
}
