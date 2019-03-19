import { Vec3 } from '../utils/Vec3.js';
import { GameObject } from './GameObject.js';
export class Transform {
    constructor(...arg) {
        this._position = new Vec3();
        this._scale = new Vec3(1, 1, 1);
        this.parent = null;
        this._children = [];
        if (arg[0] instanceof GameObject) {
            const gameObject = arg[0];
            this.gameObject = gameObject;
        }
        else {
            const transform = arg[0];
            this._position = new Vec3(transform._position);
            this._scale = new Vec3(transform._scale);
            this._children = [];
            transform._children.forEach(c => {
                let tmp = new GameObject(c.gameObject);
                this.addChild(tmp.transform);
            });
            this.parent = transform.parent;
            this.gameObject = transform.gameObject;
        }
    }
    /**
     * Get : global position
     * */
    get position() {
        let res = this._position;
        if (this.parent) {
            res = Vec3.add(res, this.parent.position);
        }
        return res;
    }
    /**
     * | Set : local position
     * */
    set position(value) {
        this._position = value;
    }
    /**
     * Get : global scale
     * */
    get scale() {
        let res = this._scale;
        if (this.parent) {
            res = Vec3.multiply(res, this.parent.scale);
        }
        return res;
    }
    /**
     * | Set : local scale
     * */
    set scale(value) {
        this._scale = value;
    }
    get children() {
        return this._children;
    }
    translate(...arg) {
        if (arg[0] instanceof Transform) {
            this._position = Vec3.add(this._position, arg[0]);
        }
        else {
            const tmp = new Vec3(arg[0], arg[1], arg[2]);
            this._position = Vec3.add(this._position, tmp);
        }
    }
    addChild(transform) {
        this._children.push(transform);
        transform.parent = this;
    }
}
