"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = exports.Point = void 0;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Point = Point;
class Node {
    constructor(state, g) {
        this.state = state;
        this.g = g;
        // console.log("new Node state.length = ", this.state);
        this.max = this.state[0].length;
        this.zero = this.getZero();
        this.parent = null;
        this.h = 0;
        this.stringState = this.toString();
    }
    getZero() {
        for (let i = 0; i < this.max; i++) {
            for (let j = 0; j < this.max; j++) {
                // console.log("getZero this.state = ", this.state, `this.state[i/${i}] = ${this.state[i]}`);
                if (this.state[i][j] === 0)
                    return new Point(i, j);
            }
        }
        return new Point(1, 2);
    }
    getState() { return this.state; }
    setParent(node) {
        this.parent = node;
    }
    getParent() { return this.parent; }
    getScore() {
        return this.g + this.h;
    }
    toString() { return this.state.flat().toString(); }
    isEqual(node) {
        return this.stringState === node.stringState;
    }
    setH(number) {
        this.h = number;
    }
    getNeighbor(turn) {
        let point;
        switch (turn) {
            case 0:
                point = new Point(this.zero.x - 1, this.zero.y);
                break;
            case 1:
                point = new Point(this.zero.x + 1, this.zero.y);
                break;
            case 2:
                point = new Point(this.zero.x, this.zero.y - 1);
                break;
            case 3:
                point = new Point(this.zero.x, this.zero.y + 1);
                break;
            default:
                point = new Point(0, 0);
        }
        return this.getNewState(point);
    }
    getNewState(point) {
        if (point.x < 0 || point.y < 0 || point.x >= this.max || point.y >= this.max)
            return null;
        const ret = this.state.map((row) => row.slice());
        ret[this.zero.x][this.zero.y] = this.state[point.x][point.y];
        ret[point.x][point.y] = 0;
        // console.log("zero =" , this.zero)
        // console.log("point =" , point)
        // console.log("getNew State new STate = ", ret)
        return ret;
    }
    [Symbol.iterator]() {
        let turn = 0;
        return {
            next: () => {
                if (turn < 4) {
                    const state = this.getNeighbor(turn);
                    turn++;
                    return {
                        value: state && new Node(state, this.g + 1),
                        done: false
                    };
                }
                else {
                    return { done: true };
                }
            }
        };
    }
}
exports.Node = Node;
