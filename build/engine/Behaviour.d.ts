import { GameObject } from './GameObject';
export declare class Behaviour {
    init: ((gameObject: GameObject) => void | undefined) | null;
    update: ((gameObject: GameObject) => void | undefined) | null;
}
