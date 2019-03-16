import { Vec3 } from "../utils/Vec3.js";

export class Camera{
    position: Vec3 = new Vec3();
    isometricFactor: number = 10;
    zoom: number = 50;
}