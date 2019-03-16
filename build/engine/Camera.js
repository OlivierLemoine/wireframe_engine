import { Vec3 } from '../utils/Vec3.js';
export class Camera {
    constructor() {
        this.position = new Vec3();
        this.normal = new Vec3(0, 0, 1);
        this.isometricFactor = 10;
        this.zoom = 50;
    }
}
