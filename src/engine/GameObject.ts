import { Transform } from './Transform.js';
import { Renderer } from './Renderer.js';
import { Mesh } from '../shapes/Mesh.js';
import { Vec3 } from '../utils/Vec3.js';

export class GameObject {
    static renderer: Renderer | undefined;

    transform: Transform = new Transform();
    private mesh: Mesh = new Mesh();

    constructor() {
        if (GameObject.renderer) GameObject.renderer.addObject(this);
    }

    addToScene() {
        throw 'unimplemented';
    }

    getShape(): { vertices: Vec3[]; edges: Int16Array[] } {
        return { vertices: [], edges: [] };
    }
}
