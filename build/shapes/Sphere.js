import { Vec3 } from '../utils/Vec3.js';
import { Mesh } from './Mesh.js';
export class Sphere extends Mesh {
    constructor(resolution) {
        super();
        const PI2 = 2 * Math.PI;
        const step = PI2 / resolution;
        for (let i = 0; i < PI2; i += step) {
            for (let j = 0; j < PI2; j += step) {
                this.vectex.push(new Vec3(Math.cos(j) * Math.cos(i), Math.sin(i), Math.sin(j) * Math.cos(i)));
            }
        }
    }
}
//# sourceMappingURL=Sphere.js.map