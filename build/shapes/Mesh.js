import { Vec3 } from '../utils/Vec3.js';
export class Mesh {
    constructor() {
        this.vectex = [];
        this.faces = [];
        this.normals = [];
    }
    updateNormals() {
        this.normals = new Array(this.faces.length);
        this.faces.forEach((f, i) => {
            const vec1 = Vec3.sub(this.vectex[f[1]], this.vectex[f[0]]);
            const vec2 = Vec3.sub(this.vectex[f[2]], this.vectex[f[1]]);
            this.normals[i] = Vec3.vectorialProduct(vec1, vec2);
        });
    }
}
