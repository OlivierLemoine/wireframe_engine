import { Vec3 } from '../utils/Vec3.js';
import { GameObject } from './GameObject.js';
export declare class Transform {
    gameObject: GameObject;
    private _position;
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
    private parent;
    private _children;
    readonly children: Transform[];
    constructor(gameObject: GameObject);
    translate(vec3: Vec3): void;
    addChild(transform: Transform): void;
}
