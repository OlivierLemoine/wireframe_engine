import { Transform } from './Transform.js';
import { Mesh } from '../shapes/Mesh.js';
import { Cube } from '../shapes/Cube.js';
export class GameObject {
    constructor(...arg) {
        this.transform = new Transform();
        switch (arg[0]) {
            case 'cube':
                this.mesh = new Cube();
                break;
            default:
                this.mesh = new Mesh();
                break;
        }
        if (GameObject.renderer)
            GameObject.renderer.addObject(this);
    }
    addToScene(renderer) {
        renderer.addObject(this);
    }
}
