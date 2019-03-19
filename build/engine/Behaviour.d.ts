import { GameObject } from './GameObject';
export declare class Behaviour {
    init: ((gameObject: GameObject) => undefined) | null;
    update: ((gameObject: GameObject) => undefined) | null;
}
