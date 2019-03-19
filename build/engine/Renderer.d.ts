import { GameObject } from './GameObject.js';
import { Camera } from './Camera.js';
import { DrawingContext } from '../utils/DrawingContext.js';
export declare class Renderer {
    objects: GameObject[];
    camera: Camera;
    ctx: DrawingContext;
    /**
     * Renderer
     * @param canvas Scene will be rendered in canvas
     * @param context If define, the function in which every objects will be attached to this renderer
     */
    constructor(canvas: HTMLCanvasElement, context?: (renderer: Renderer) => undefined);
    /** Add an object to be rendered */
    addObject(object: GameObject): void;
    /** Render into the context all the known objects */
    render(): void;
}
