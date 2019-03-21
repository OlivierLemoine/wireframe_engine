import { Vec3 } from '../utils/Vec3.js';
import { GameObject } from './GameObject.js';
import { Quaternion } from '../utils/Quaternion.js';
export declare class Transform {
    gameObject: GameObject;
    private _position;
    private _rotation;
    private parent;
    private _children;
    rotation: Quaternion;
    /**
     * Get : global position
     * */
    /**
    * | Set : local position
    * */
    position: Vec3;
    private _scale;
    /**
     * Get : global scale
     * */
    /**
    * | Set : local scale
    * */
    scale: Vec3;
    readonly children: Transform[];
    constructor(gameObject: GameObject);
    /**
     * Copy constructor
     */
    constructor(transform: Transform);
    getLocalPosition(): Vec3;
    translate(vec3: Vec3): undefined;
    translate(x: number, y: number, z: number): undefined;
    rotate(alpha: number, beta: number, gamma: number): void;
    addChild(transform: Transform): void;
}
