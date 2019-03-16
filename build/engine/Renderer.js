import { GameObject } from './GameObject.js';
import { Camera } from './Camera.js';
export class Renderer {
    constructor(canvas, context) {
        this.objects = [];
        this.camera = new Camera();
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
    addObject(object) {
        this.objects.push(object);
    }
    render() { }
}
