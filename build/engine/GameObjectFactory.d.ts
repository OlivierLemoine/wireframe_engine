import { GameObject } from './GameObject.js';
export declare function GameObjectFactory(model: GameObject): {
    model: GameObject;
    new: () => GameObject;
};
