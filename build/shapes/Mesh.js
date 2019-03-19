import { Vec3 } from '../utils/Vec3.js';
export class Mesh {
    constructor(...arg) {
        this.vectex = [];
        if (arg[0] instanceof Mesh) {
            const mesh = arg[0];
            mesh.vectex.forEach(v => {
                this.vectex.push(new Vec3(v));
            });
        }
    }
}
