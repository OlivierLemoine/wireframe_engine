import { GameObject } from './GameObject';

export class Behaviour {
    init: ((gameObject: GameObject) => undefined) | null = null;
    update: ((gameObject: GameObject) => undefined) | null = null;
}
