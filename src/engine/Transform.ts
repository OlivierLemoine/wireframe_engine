import { Vec3 } from '../utils/Vec3.js';
import { GameObject } from './GameObject.js';
import { Quaternion } from '../utils/Quaternion.js';

export class Transform {
    gameObject: GameObject;

    private _position: Vec3 = new Vec3();
    rotation: Quaternion = new Quaternion(1, 0, 0, 0);

    private parent: Transform | null = null;
    private _children: Transform[] = [];

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

    public get children(): Transform[] {
        return this._children;
    }

    constructor(gameObject: GameObject);
    /**
     * Copy constructor
     */
    constructor(transform: Transform);
    constructor(...arg: any[]) {
        if (arg[0] instanceof GameObject) {
            const gameObject = arg[0] as GameObject;
            this.gameObject = gameObject;
        } else {
            const transform = arg[0] as Transform;

            this._position = new Vec3(transform._position);
            this.rotation = new Quaternion(transform.rotation);
            this._scale = new Vec3(transform._scale);
            this._children = [];
            transform._children.forEach(c => {
                let tmp: GameObject = new GameObject(c.gameObject);
                this.addChild(tmp.transform);
            });

            this.parent = transform.parent;

            this.gameObject = transform.gameObject;
        }
    }

    translate(vec3: Vec3): undefined;
    translate(x: number, y: number, z: number): undefined;
    translate(...arg: any[]) {
        if (arg[0] instanceof Transform) {
            this._position = Vec3.add(this._position, arg[0]);
        } else {
            const tmp = new Vec3(arg[0], arg[1], arg[2]);
            this._position = Vec3.add(this._position, tmp);
        }
    }

    rotate(alpha: number, beta: number, gamma: number) {
        this.rotation = Quaternion.multiply(
            this.rotation,
            new Quaternion(alpha, beta, gamma),
        );
    }

    addChild(transform: Transform) {
        this._children.push(transform);
        transform.parent = this;
    }
}
