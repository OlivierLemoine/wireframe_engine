import { Transform } from './Transform.js';
import { Renderer } from './Renderer.js';
import { Mesh } from '../shapes/Mesh.js';
import { Vec3 } from '../utils/Vec3.js';
import { Cube } from '../shapes/Cube.js';

export class GameObject {
    static renderer: Renderer | undefined;

    transform: Transform = new Transform();
    mesh: Mesh;

    constructor();
    constructor(predefineShape: 'cube');
    constructor(...arg: any[]) {
        switch (arg[0]) {
            case 'cube':
                this.mesh = new Cube();
                break;

            default:
                this.mesh = new Mesh();
                break;
        }

        if (GameObject.renderer) GameObject.renderer.addObject(this);
    }

    addToScene(renderer: Renderer) {
        renderer.addObject(this);
    }
}
