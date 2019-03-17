export class Vec3 {
    values: Float64Array = new Float64Array(3).fill(0);

    constructor();
    constructor(vec3: Vec3);
    constructor(x: number, y: number, z: number);
    constructor(...arg: any[]) {
        if (arg.length > 0) {
            if (arg[0] instanceof Vec3) {
                const v: Vec3 = arg[0];
                this.values[0] = v.values[0];
                this.values[1] = v.values[1];
                this.values[2] = v.values[2];
            } else {
                const x: number = arg[0],
                    y: number = arg[1],
                    z: number = arg[2];
                this.values[0] = x;
                this.values[1] = y;
                this.values[2] = z;
            }
        } 
    }

    public get x(): number {
        return this.values[0];
    }

    public get y(): number {
        return this.values[1];
    }

    public get z(): number {
        return this.values[2];
    }

    static add(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    static add(vec3: Vec3, n: number): Vec3;
    static add(a: Vec3, b: Vec3 | number): Vec3 {
        let res = new Vec3();
        if (typeof b === 'number') {
            res.values[0] = a.values[0] + b;
            res.values[1] = a.values[1] + b;
            res.values[2] = a.values[2] + b;
        } else {
            res.values[0] = a.values[0] + b.values[0];
            res.values[1] = a.values[1] + b.values[1];
            res.values[2] = a.values[2] + b.values[2];
        }
        return res;
    }

    static sub(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    static sub(vec3: Vec3, n: number): Vec3;
    static sub(a: Vec3, b: Vec3 | number): Vec3 {
        let res = new Vec3();
        if (typeof b === 'number') {
            res.values[0] = a.values[0] - b;
            res.values[1] = a.values[1] - b;
            res.values[2] = a.values[2] - b;
        } else {
            res.values[0] = a.values[0] - b.values[0];
            res.values[1] = a.values[1] - b.values[1];
            res.values[2] = a.values[2] - b.values[2];
        }
        return res;
    }

    static multiply(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    static multiply(vec3: Vec3, n: number): Vec3;
    static multiply(a: Vec3, b: Vec3 | number): Vec3 {
        let res = new Vec3();
        if (typeof b === 'number') {
            res.values[0] = a.values[0] * b;
            res.values[1] = a.values[1] * b;
            res.values[2] = a.values[2] * b;
        } else {
            res.values[0] = a.values[0] * b.values[0];
            res.values[1] = a.values[1] * b.values[1];
            res.values[2] = a.values[2] * b.values[2];
        }
        return res;
    }

    static divide(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    static divide(vec3: Vec3, n: number): Vec3;
    static divide(a: Vec3, b: Vec3 | number): Vec3 {
        let res = new Vec3();
        if (typeof b === 'number') {
            res.values[0] = a.values[0] / b;
            res.values[1] = a.values[1] / b;
            res.values[2] = a.values[2] / b;
        } else {
            res.values[0] = a.values[0] / b.values[0];
            res.values[1] = a.values[1] / b.values[1];
            res.values[2] = a.values[2] / b.values[2];
        }
        return res;
    }

    static dotProduct(vec3_1: Vec3, vec3_2: Vec3): number {
        return (
            vec3_1.values[0] * vec3_2.values[0] +
            vec3_1.values[1] * vec3_2.values[1] +
            vec3_1.values[2] * vec3_2.values[2]
        );
    }

    static vectorialProduct(vec3_1: Vec3, vec3_2: Vec3): Vec3 {
        let res = new Vec3();
        res.values[0] =
            vec3_1.values[1] * vec3_2.values[2] -
            vec3_1.values[2] * vec3_2.values[1];
        res.values[1] =
            -vec3_1.values[0] * vec3_2.values[2] +
            vec3_1.values[2] * vec3_2.values[0];
        res.values[2] =
            vec3_1.values[0] * vec3_2.values[1] -
            vec3_1.values[1] * vec3_2.values[0];
        return res;
    }
}
