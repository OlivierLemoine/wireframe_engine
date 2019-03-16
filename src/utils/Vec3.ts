export class Vec3 {
    values: Float64Array = new Float64Array(3);

    constructor();
    constructor(vec3: Vec3);
    constructor(x: number, y: number, z: number);
    constructor(...arg: any[]) {
        if (arg) {
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
}

export namespace Vec3 {
    function add(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    function add(vec3: Vec3, n: number): Vec3;
    function add(a: Vec3, b: Vec3 | number): Vec3 {
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

    function sub(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    function sub(vec3: Vec3, n: number): Vec3;
    function sub(a: Vec3, b: Vec3 | number): Vec3 {
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

    function multiply(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    function multiply(vec3: Vec3, n: number): Vec3;
    function multiply(a: Vec3, b: Vec3 | number): Vec3 {
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

    function divide(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    function divide(vec3: Vec3, n: number): Vec3;
    function divide(a: Vec3, b: Vec3 | number): Vec3 {
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
}
