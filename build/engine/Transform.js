import { Vec3 } from '../utils/Vec3.js';
export class Transform {
    constructor() {
        this.position = new Vec3();
        this.scale = new Vec3(1, 1, 1);
    }
}
