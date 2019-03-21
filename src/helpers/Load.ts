import { GameObject } from '../engine/GameObject.js';
import { Vec3 } from '../utils/Vec3.js';

export async function Load(
    file: string,
    type: 'obj' | 'undefined',
): Promise<GameObject> {
    let req = await fetch(file).then(d => d.text());

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
                            child.mesh.vectex.push(
                                new Vec3(
                                    parseFloat(find[1]),
                                    parseFloat(find[2]),
                                    parseFloat(find[3]),
                                ),
                            );
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
}

function balance(g: GameObject) {
    let barry = g.mesh.vectex.reduce((prev, curr) => Vec3.add(prev, curr));
    barry = Vec3.divide(barry, g.mesh.vectex.length);
    g.mesh.vectex = g.mesh.vectex.map(v => Vec3.sub(v, barry));
    g.transform.translate(barry);
}
