import { Vec3 } from './Vec3.js';

export class Quaternion {
    values: Float64Array = new Float64Array(4).fill(0);

    public get x(): number {
        return this.values[0];
    }

    public get y(): number {
        return this.values[1];
    }

    public get z(): number {
        return this.values[2];
    }

    public get w(): number {
        return this.values[3];
    }

    /**
     * 0 initialize Quaternion
     */
    constructor();
    /**
     * Copy constructor
     */
    constructor(quat: Quaternion);
    /**
     * Initialize from euler angle
     */
    constructor(alpha: number, beta: number, gamma: number);
    /**
     * Initialize
     */
    constructor(x: number, y: number, z: number, w: number);
    constructor(...arg: any[]) {
        if (arg.length > 0) {
            if (arg[0] instanceof Quaternion) {
                const v = arg[0] as Quaternion;
                this.values[0] = v.values[0];
                this.values[1] = v.values[1];
                this.values[2] = v.values[2];
                this.values[3] = v.values[3];
            } else if (arg.length === 4) {
                const x: number = arg[0],
                    y: number = arg[1],
                    z: number = arg[2],
                    w: number = arg[3];
                this.values[0] = x;
                this.values[1] = y;
                this.values[2] = z;
                this.values[3] = w;
            } else {
                const x: number = arg[0],
                    y: number = arg[1],
                    z: number = arg[2];
                this.values = Quaternion.multiply(
                    Quaternion.multiply(
                        Quaternion.fromAngleAround(1, 0, 0, x),
                        Quaternion.fromAngleAround(0, 1, 0, y),
                    ),
                    new Quaternion(0, 0, 1, z),
                ).values;
            }
        }
    }

    static fromAngleAround(x: number, y: number, z: number, angle: number) {
        let res = new Quaternion();
        res.values[0] = Math.cos(angle / 2);
        res.values[1] = x * Math.sin(angle / 2);
        res.values[2] = y * Math.sin(angle / 2);
        res.values[3] = z * Math.sin(angle / 2);
        return res;
    }

    rotate(point: Vec3) {
        let p = new Quaternion(0, point.x, point.y, point.z);
        let res = Quaternion.multiply(
            Quaternion.multiply(this, p),
            Quaternion.conjugate(this),
        );
        return new Vec3(res.y, res.z, res.w);
    }

    static add(quat1: Quaternion, quat2: Quaternion) {
        let res = new Quaternion();
        res.values[0] = quat1.x + quat2.x;
        res.values[1] = quat1.y + quat2.y;
        res.values[2] = quat1.z + quat2.z;
        res.values[3] = quat1.w + quat2.w;
        return res;
    }

    static multiply(quat1: Quaternion, quat2: Quaternion) {
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

    static conjugate(quat: Quaternion) {
        return new Quaternion(quat.x, -quat.y, -quat.z, -quat.w);
    }

    static normalize(quat: Quaternion) {
        const size = Math.sqrt(
            quat.x ** 2 + quat.y ** 2 + quat.z ** 2 + quat.w ** 2,
        );
        return new Quaternion(
            quat.x / size,
            quat.y / size,
            quat.z / size,
            quat.w / size,
        );
    }
}
