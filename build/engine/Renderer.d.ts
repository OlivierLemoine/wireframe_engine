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
     * @param autoUpdate If false, the user needs to define his own update function and call the render() method
     */
    constructor(canvas: HTMLCanvasElement, context?: (renderer: Renderer) => undefined, autoUpdate?: boolean);
    /** Add an object to be rendered */
    addObject(object: GameObject): void;
    /** Render into the context all the known objects */
    render(): void;
}
