import { Vec3 } from '../utils/Vec3.js';
import { GameObject } from './GameObject.js';
export declare class Transform {
    gameObject: GameObject;
    position: Vec3;
    scale: Vec3;
    parent: Transform | null;
    children: Transform[];
    constructor(gameObject: GameObject);
}
