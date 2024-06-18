"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Astar = void 0;
const MinHeap_1 = require("./MinHeap");
const Node_1 = require("./Node");
class Astar {
    constructor(initialState, finalNode, heuristic) {
        this.finalNode = finalNode;
        this.heuristic = heuristic;
        this.open = new MinHeap_1.MinHeap();
        this.close = [];
        const startNode = new Node_1.Node(initialState, 0);
        this.open.add(startNode);
        // this.openState = new Set<string>();
        this.closeState = new Set();
    }
    solve() {
        let node;
        while (node = this.open.unshift()) {
            if (this.isFinal(node))
                return this.reconstructPath(node);
            this.close.push(node);
            this.closeState.add(node.toString());
            for (const neighbor of node) {
                if (neighbor === null || neighbor === undefined)
                    continue;
                if (this.isInClose(neighbor))
                    continue;
                neighbor.setH(this.heuristic(neighbor.getState(), this.finalNode.getState()));
                neighbor.setParent(node);
                if (!this.switchIfNeeded(neighbor))
                    this.open.add(neighbor);
            }
        }
        return false;
    }
    reconstructPath(finalNode) {
        let node = finalNode;
        let ret = [];
        while (node !== null) {
            ret.push(node);
            node = node.getParent();
        }
        ret = ret.reverse();
        ret.forEach(node => {
            console.log(node.toString());
        });
        return ret;
    }
    switchIfNeeded(newNode) {
        const openNode = this.open.find((n) => n.isEqual(newNode));
        if (openNode === null)
            return false;
        if (newNode.getScore() > openNode.getScore())
            return true;
        openNode.h = newNode.h;
        openNode.g = newNode.g;
        openNode.setParent(newNode.getParent());
        return true;
    }
    isInClose(node) {
        // const isInCLose = this.close.some((n) => n.isEqual(node));
        // for (let i = 0; i < this.close.length; i++) {
        //   if (this.close[i].isEqual(node)) return true;
        // }
        // return false;
        // console.log("this.inClose() = ", isInCLose);
        // return this.close.some((n) => n.isEqual(node));
        return this.closeState.has(node.stringState);
    }
    isFinal(node) {
        // return true;
        return node.isEqual(this.finalNode);
    }
}
exports.Astar = Astar;
