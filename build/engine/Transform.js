import { Vec3 } from '../utils/Vec3.js';
export class Transform {
    constructor(gameObject) {
        this._position = new Vec3();
        this._scale = new Vec3(1, 1, 1);
        this.parent = null;
        this._children = [];
        this.gameObject = gameObject;
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
    translate(vec3) {
        this._position = Vec3.add(this._position, vec3);
    }
    addChild(transform) {
        this._children.push(transform);
        transform.parent = this;
    }
}
