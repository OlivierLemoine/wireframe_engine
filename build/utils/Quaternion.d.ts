import { Vec3 } from './Vec3.js';
export declare class Quaternion {
    values: Float64Array;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
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
    static fromAngleAround(x: number, y: number, z: number, angle: number): Quaternion;
    rotate(point: Vec3): Vec3;
    static add(quat1: Quaternion, quat2: Quaternion): Quaternion;
    static multiply(quat1: Quaternion, quat2: Quaternion): Quaternion;
}
