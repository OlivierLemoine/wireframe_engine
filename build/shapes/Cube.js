import { Vec3 } from '../utils/Vec3.js';
import { Mesh } from './Mesh.js';
export class Cube extends Mesh {
    constructor() {
        super();
        this.vectex = [
            new Vec3(-0.5, -0.5, -0.5),
            new Vec3(0.5, -0.5, -0.5),
            new Vec3(0.5, 0.5, -0.5),
            new Vec3(-0.5, 0.5, -0.5),
            new Vec3(-0.5, -0.5, 0.5),
            new Vec3(0.5, -0.5, 0.5),
            new Vec3(0.5, 0.5, 0.5),
            new Vec3(-0.5, 0.5, 0.5),
        ];
    }
}
