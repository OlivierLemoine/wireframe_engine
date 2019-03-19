import { Vec3 } from '../utils/Vec3.js';

export class Mesh {
    vectex: Vec3[] = [];

    constructor();
    constructor(mesh: Mesh);
    constructor(...arg: any[]) {
        if (arg[0] instanceof Mesh) {
            const mesh = arg[0] as Mesh;
            mesh.vectex.forEach(v => {
                this.vectex.push(new Vec3(v));
            });
        }
    }
}
