import { Transform } from './Transform.js';
import { Mesh } from '../shapes/Mesh.js';
import { Cube } from '../shapes/Cube.js';
import { Sphere } from '../shapes/Sphere.js';
export class GameObject {
    constructor(...arg) {
        this.transform = new Transform(this);
        switch (arg[0]) {
            case 'cube':
                this.mesh = new Cube();
                break;
            case 'sphere':
                this.mesh = new Sphere(arg[1]);
                break;
            default:
                this.mesh = new Mesh();
                break;
        }
        if (GameObject.renderer)
            GameObject.renderer.addObject(this);
    }
    /**
     * Add the GameObject to the scene
     * @param renderer The renderer to be attatch to
     */
    addToScene(renderer) {
        renderer.addObject(this);
    }
}
