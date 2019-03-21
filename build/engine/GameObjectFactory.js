import { GameObject } from './GameObject.js';
export function GameObjectFactory(model) {
    let facto = function* (model) {
        while (1) {
            yield new GameObject(model);
        }
    };
    let gene = facto(model);
    return {
        model: model,
        new: function () {
            return gene.next().value;
        },
    };
}
//# sourceMappingURL=GameObjectFactory.js.map