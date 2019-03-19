export declare class Vec3 {
    values: Float64Array;
    /**
     * 0 initialize Vect3
     */
    constructor();
    /**
     * Copy constructor
     */
    constructor(vec3: Vec3);
    /**
     * Initialize to x, y and z
     */
    constructor(x: number, y: number, z: number);
    readonly x: number;
    readonly y: number;
    readonly z: number;
    static eq(vec1: Vec3, vec2: Vec3): boolean;
    static add(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    static add(vec3: Vec3, n: number): Vec3;
    static sub(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    static sub(vec3: Vec3, n: number): Vec3;
    static multiply(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    static multiply(vec3: Vec3, n: number): Vec3;
    static divide(vec3_1: Vec3, vec3_2: Vec3): Vec3;
    static divide(vec3: Vec3, n: number): Vec3;
    static dotProduct(vec3_1: Vec3, vec3_2: Vec3): number;
    static distanceSquared(vec3: Vec3): number;
    static vectorialProduct(vec3_1: Vec3, vec3_2: Vec3): Vec3;
}
