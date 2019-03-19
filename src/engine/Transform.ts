import { Vec3 } from '../utils/Vec3.js';
import { GameObject } from './GameObject.js';

export class Transform {
    gameObject: GameObject;

    private _position: Vec3 = new Vec3();

    /**
     * Get : global position
     * */
    public get position(): Vec3 {
        let res = this._position;
        if (this.parent) {
            res = Vec3.add(res, this.parent.position);
        }
        return res;
    }
    /**
     * | Set : local position
     * */
    public set position(value: Vec3) {
        this._position = value;
    }
    private _scale: Vec3 = new Vec3(1, 1, 1);
    /**
     * Get : global scale
     * */
    public get scale(): Vec3 {
        let res = this._scale;
        if (this.parent) {
            res = Vec3.multiply(res, this.parent.scale);
        }
        return res;
    }
    /**
     * | Set : local scale
     * */
    public set scale(value: Vec3) {
        this._scale = value;
    }

    private parent: Transform | null = null;
    private _children: Transform[] = [];
    public get children(): Transform[] {
        return this._children;
    }

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;
    }

    translate(vec3: Vec3) {
        this._position = Vec3.add(this._position, vec3);
    }

    addChild(transform: Transform) {
        this._children.push(transform);
        transform.parent = this;
    }
}
