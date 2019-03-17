export class Vec3 {
    constructor(...arg) {
        this.values = new Float64Array(3).fill(0);
        if (arg.length > 0) {
            if (arg[0] instanceof Vec3) {
                const v = arg[0];
                this.values[0] = v.values[0];
                this.values[1] = v.values[1];
                this.values[2] = v.values[2];
            }
            else {
                const x = arg[0], y = arg[1], z = arg[2];
                this.values[0] = x;
                this.values[1] = y;
                this.values[2] = z;
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
    static add(a, b) {
        let res = new Vec3();
        if (typeof b === 'number') {
            res.values[0] = a.values[0] + b;
            res.values[1] = a.values[1] + b;
            res.values[2] = a.values[2] + b;
        }
        else {
            res.values[0] = a.values[0] + b.values[0];
            res.values[1] = a.values[1] + b.values[1];
            res.values[2] = a.values[2] + b.values[2];
        }
        return res;
    }
    static sub(a, b) {
        let res = new Vec3();
        if (typeof b === 'number') {
            res.values[0] = a.values[0] - b;
            res.values[1] = a.values[1] - b;
            res.values[2] = a.values[2] - b;
        }
        else {
            res.values[0] = a.values[0] - b.values[0];
            res.values[1] = a.values[1] - b.values[1];
            res.values[2] = a.values[2] - b.values[2];
        }
        return res;
    }
    static multiply(a, b) {
        let res = new Vec3();
        if (typeof b === 'number') {
            res.values[0] = a.values[0] * b;
            res.values[1] = a.values[1] * b;
            res.values[2] = a.values[2] * b;
        }
        else {
            res.values[0] = a.values[0] * b.values[0];
            res.values[1] = a.values[1] * b.values[1];
            res.values[2] = a.values[2] * b.values[2];
        }
        return res;
    }
    static divide(a, b) {
        let res = new Vec3();
        if (typeof b === 'number') {
            res.values[0] = a.values[0] / b;
            res.values[1] = a.values[1] / b;
            res.values[2] = a.values[2] / b;
        }
        else {
            res.values[0] = a.values[0] / b.values[0];
            res.values[1] = a.values[1] / b.values[1];
            res.values[2] = a.values[2] / b.values[2];
        }
        return res;
    }
    static dotProduct(vec3_1, vec3_2) {
        return (vec3_1.values[0] * vec3_2.values[0] +
            vec3_1.values[1] * vec3_2.values[1] +
            vec3_1.values[2] * vec3_2.values[2]);
    }
    static vectorialProduct(vec3_1, vec3_2) {
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
