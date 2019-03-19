import { Transform } from './Transform.js';
import { Renderer } from './Renderer.js';
import { Mesh } from '../shapes/Mesh.js';
export declare class GameObject {
    static renderer: Renderer | undefined;
    transform: Transform;
    mesh: Mesh;
    /**
     * Create empty GameObject
     */
    constructor();
    /**
     * Create GameObject with cubic mesh
     */
    constructor(predefineShape: 'cube');
    /**
     * Create GameObject with spherical mesh
     * @param resolution Number of point per circle
     */
    constructor(predefineShape: 'sphere', resolution: number);
    /**
     * Add the GameObject to the scene
     * @param renderer The renderer to be attatch to
     */
    addToScene(renderer: Renderer): void;
}
