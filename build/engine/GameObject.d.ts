import { Transform } from './Transform.js';
import { Renderer } from './Renderer.js';
import { Mesh } from '../shapes/Mesh.js';
import { Behaviour } from './Behaviour.js';
export declare class GameObject {
    static renderer: Renderer | undefined;
    behaviour: Behaviour;
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
     * Copy constructor
     * @param copy Copy from copy
     */
    constructor(copy: GameObject);
    /**
     * Add the GameObject to the scene
     * @param renderer The renderer to be attatch to
     */
    addToScene(renderer: Renderer): void;
}
