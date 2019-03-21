import { GameObject } from './GameObject';

export class Behaviour {
    init: ((gameObject: GameObject) => void | undefined) | null = null;
    update: ((gameObject: GameObject) => void | undefined) | null = null;
}
