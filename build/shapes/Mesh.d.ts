import { Vec3 } from '../utils/Vec3.js';
export declare class Mesh {
    vectex: Vec3[];
    faces: Int16Array[];
    normals: Vec3[];
    updateNormals(): void;
}
