import { GameObject } from './GameObject.js';
import { Camera } from './Camera.js';
import { DrawingContext } from '../utils/DrawingContext.js';

export class Renderer {
    objects: GameObject[] = [];
    camera: Camera = new Camera();

    ctx: DrawingContext;

    constructor(canvas: HTMLCanvasElement, context?: Function) {
        this.ctx = {
            ctx: canvas.getContext('2d') || new CanvasRenderingContext2D(),
            height: canvas.height,
            width: canvas.width
        };

        if (context) {
            GameObject.renderer = this;
            context();
            GameObject.renderer = undefined;
        }
    }

    addObject(object: GameObject) {
        this.objects.push(object);
    }

    render() {}
}
