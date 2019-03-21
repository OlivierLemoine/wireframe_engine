import { GameObject } from '../engine/GameObject.js';
import { Vec3 } from '../utils/Vec3.js';

export async function Load(
    file: string,
    type: 'obj' | 'undefined',
): Promise<GameObject> {
    let req = await fetch(file).then(d => d.text());

    let res = new GameObject();

    switch (type) {
        case 'obj':
            let regx = /v ([-0-9.]+) ([-0-9.]+) ([-0-9.]+)/g;
            let exec = regx.exec(req);
            while (exec !== null) {
                res.mesh.vectex.push(
                    new Vec3(
                        parseFloat(exec[1]),
                        parseFloat(exec[2]),
                        parseFloat(exec[3]),
                    ),
                );
                exec = regx.exec(req);
            }
            break;

        default:
            break;
    }

    return res;
}
