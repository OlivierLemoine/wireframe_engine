var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GameObject } from '../engine/GameObject.js';
import { Vec3 } from '../utils/Vec3.js';
export function Load(file, type) {
    return __awaiter(this, void 0, void 0, function* () {
        let req = yield fetch(file).then(d => d.text());
        let res = new GameObject();
        let child = new GameObject();
        switch (type) {
            case 'obj':
                const lines = req.split('\n');
                for (const line of lines) {
                    switch (line[0] + line[1]) {
                        case 'o ':
                            if (child.mesh.vectex.length > 0) {
                                balance(child);
                                res.transform.addChild(child.transform);
                                child = new GameObject();
                            }
                            break;
                        case 'v ':
                            let r = /v ([-0-9.]+) ([-0-9.]+) ([-0-9.]+)/g;
                            let find = r.exec(line);
                            if (find) {
                                child.mesh.vectex.push(new Vec3(parseFloat(find[1]), parseFloat(find[2]), parseFloat(find[3])));
                            }
                            break;
                        default:
                            break;
                    }
                }
                balance(child);
                res.transform.addChild(child.transform);
                break;
            default:
                break;
        }
        return res;
    });
}
function balance(g) {
    let barry = g.mesh.vectex.reduce((prev, curr) => Vec3.add(prev, curr));
    barry = Vec3.divide(barry, g.mesh.vectex.length);
    g.mesh.vectex = g.mesh.vectex.map(v => Vec3.sub(v, barry));
    g.transform.translate(barry);
}
//# sourceMappingURL=Load.js.map