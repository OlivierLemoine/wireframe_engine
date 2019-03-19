import { GameObject } from './GameObject.js';

export function GameObjectFactory(model: GameObject) {
    let facto = function*(model: GameObject): IterableIterator<GameObject> {
        while (1) {
            yield new GameObject(model);
        }
    };

    let gene = facto(model);

    return {
        model: model,
        new: function() {
            return gene.next().value;
        },
    };
}
