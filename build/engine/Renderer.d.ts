import { GameObject } from './GameObject.js';
import { Camera } from './Camera.js';
import { DrawingContext } from '../utils/DrawingContext.js';
export declare class Renderer {
    objects: GameObject[];
    camera: Camera;
    ctx: DrawingContext;
    constructor(canvas: HTMLCanvasElement, context?: Function);
    addObject(object: GameObject): void;
    render(): void;
}
