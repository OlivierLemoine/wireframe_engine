import { Transform } from './Transform.js';
import { Mesh } from '../shapes/Mesh.js';
import { Cube } from '../shapes/Cube.js';
import { Sphere } from '../shapes/Sphere.js';
import { Behaviour } from './Behaviour.js';
export class GameObject {
    constructor(...arg) {
        this.behaviour = new Behaviour();
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
        if (arg[0] instanceof GameObject) {
            const copy = arg[0];
            this.behaviour = copy.behaviour;
            this.transform = new Transform(copy.transform);
            this.transform.gameObject = this;
            this.mesh = new Mesh(copy.mesh);
        }
        if (GameObject.renderer)
            GameObject.renderer.addObject(this);
        if (this.behaviour.init)
            this.behaviour.init(this);
    }
    /**
     * Add the GameObject to the scene
     * @param renderer The renderer to be attatch to
     */
    addToScene(renderer) {
        renderer.addObject(this);
    }
}
