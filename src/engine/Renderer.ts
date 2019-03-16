import { GameObject } from './GameObject.js';

export class Renderer {
    objects: GameObject[] = [];

    constructor(context: Function) {
        GameObject.renderer = this;
        context();
        GameObject.renderer = undefined;
    }

    addObject(object: GameObject) {
        this.objects.push(object);
    }
}
