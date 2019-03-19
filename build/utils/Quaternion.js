import { Vec3 } from './Vec3.js';
export class Quaternion {
    constructor(...arg) {
        this.values = new Float64Array(4).fill(0);
        if (arg.length > 0) {
            if (arg[0] instanceof Quaternion) {
                const v = arg[0];
                this.values[0] = v.values[0];
                this.values[1] = v.values[1];
                this.values[2] = v.values[2];
                this.values[3] = v.values[3];
            }
            else if (arg.length === 4) {
                const x = arg[0], y = arg[1], z = arg[2], w = arg[3];
                this.values[0] = x;
                this.values[1] = y;
                this.values[2] = z;
                this.values[3] = w;
            }
            else {
                const x = arg[0], y = arg[1], z = arg[2];
                this.values = Quaternion.multiply(Quaternion.multiply(Quaternion.fromAngleAround(1, 0, 0, x), Quaternion.fromAngleAround(0, 1, 0, y)), Quaternion.fromAngleAround(0, 0, 1, z)).values;
            }
        }
    }
    get x() {
        return this.values[0];
    }
    get y() {
        return this.values[1];
    }
    get z() {
        return this.values[2];
    }
    get w() {
        return this.values[3];
    }
    static fromAngleAround(x, y, z, angle) {
        let res = new Quaternion();
        res.values[0] = Math.cos(angle / 2);
        res.values[1] = x * Math.sin(angle / 2);
        res.values[2] = y * Math.sin(angle / 2);
        res.values[3] = z * Math.sin(angle / 2);
        return res;
    }
    rotate(point) {
        let p = new Quaternion(0, point.x, point.y, point.z);
        let res = Quaternion.multiply(Quaternion.multiply(this, p), Quaternion.conjugate(this));
        return new Vec3(res.y, res.z, res.w);
    }
    static add(quat1, quat2) {
        let res = new Quaternion();
        res.values[0] = quat1.x + quat2.x;
        res.values[1] = quat1.y + quat2.y;
        res.values[2] = quat1.z + quat2.z;
        res.values[3] = quat1.w + quat2.w;
        return res;
    }
    static multiply(quat1, quat2) {
        let res = new Quaternion();
        res.values[0] =
            quat1.x * quat2.x -
                quat1.y * quat2.y -
                quat1.z * quat2.z -
                quat1.w * quat2.w;
        res.values[1] =
            quat1.x * quat2.y +
                quat1.y * quat2.x +
                quat1.z * quat2.w -
                quat1.w * quat2.z;
        res.values[2] =
            quat1.x * quat2.z -
                quat1.y * quat2.w +
                quat1.z * quat2.x +
                quat1.w * quat2.y;
        res.values[3] =
            quat1.x * quat2.w +
                quat1.y * quat2.z -
                quat1.z * quat2.y +
                quat1.w * quat2.x;
        return res;
    }
    static conjugate(quat) {
        return new Quaternion(quat.x, -quat.y, -quat.z, -quat.w);
    }
    static normalize(quat) {
        const size = Math.sqrt(Math.pow(quat.x, 2) + Math.pow(quat.y, 2) + Math.pow(quat.z, 2) + Math.pow(quat.w, 2));
        return new Quaternion(quat.x / size, quat.y / size, quat.z / size, quat.w / size);
    }
}
