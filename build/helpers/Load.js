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
        switch (type) {
            case 'obj':
                let regx = /v ([-0-9.]+) ([-0-9.]+) ([-0-9.]+)/g;
                let exec = regx.exec(req);
                while (exec !== null) {
                    res.mesh.vectex.push(new Vec3(parseFloat(exec[1]), parseFloat(exec[2]), parseFloat(exec[3])));
                    exec = regx.exec(req);
                }
                break;
            default:
                break;
        }
        return res;
    });
}
