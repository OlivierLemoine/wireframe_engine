import { Transform } from './Transform.js';
import { Mesh } from '../shapes/Mesh.js';
export class GameObject {
    constructor() {
        this.transform = new Transform();
        this.mesh = new Mesh();
        if (GameObject.renderer)
            GameObject.renderer.addObject(this);
    }
    addToScene() {
        throw 'unimplemented';
    }
}
