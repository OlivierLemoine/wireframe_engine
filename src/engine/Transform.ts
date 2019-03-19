import { Vec3 } from '../utils/Vec3.js';
import { GameObject } from './GameObject.js';

export class Transform {
    gameObject: GameObject;

    position: Vec3 = new Vec3();
    scale: Vec3 = new Vec3(1, 1, 1);

    parent: Transform | null = null;
    children: Transform[] = [];

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;
    }
}
