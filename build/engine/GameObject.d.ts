import { Transform } from './Transform.js';
import { Renderer } from './Renderer.js';
import { Vec3 } from '../utils/Vec3.js';
export declare class GameObject {
    static renderer: Renderer | undefined;
    transform: Transform;
    private mesh;
    constructor();
    addToScene(): void;
    getShape(): {
        vertices: Vec3[];
        edges: Int16Array[];
    };
}
