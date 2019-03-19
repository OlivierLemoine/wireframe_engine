import { Transform } from './Transform.js';
import { Renderer } from './Renderer.js';
import { Mesh } from '../shapes/Mesh.js';
export declare class GameObject {
    static renderer: Renderer | undefined;
    transform: Transform;
    mesh: Mesh;
    constructor();
    constructor(predefineShape: 'cube');
    constructor(predefineShape: 'sphere', resolution: number);
    addToScene(renderer: Renderer): void;
}
