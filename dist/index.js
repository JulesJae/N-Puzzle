"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Astar_1 = require("./Astar");
const Node_1 = require("./Node");
const heuristics_1 = __importDefault(require("./heuristics"));
const solvable_1 = require("./solvable");
function calculateFinalState(state) {
    const size = state[0].length;
    const max = size * size;
    const ret = [];
    for (let i = 0; i < size; i++) {
        const r = [];
        for (let j = 0; j < size; j++)
            r.push((i * size + j + 1) % max);
        ret.push(r);
    }
    return ret;
}
const state = [
    [0, 4, 5],
    [3, 1, 6],
    [2, 8, 7]
];
const state2 = [
    [1, 2, 3],
    [4, 5, 6],
    [0, 7, 8]
];
const state3 = [
    [1, 6, 4],
    [5, 0, 3],
    [2, 7, 8]
];
const state5 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 0, 8]
];
const state4 = [
    [4, 2, 3],
    [5, 0, 6],
    [8, 1, 7]
];
const savable = [
    [1, 2, 3],
    [4, 5, 0],
    [7, 8, 6]
];
const difficult = [
    [8, 6, 7],
    [2, 5, 4],
    [3, 0, 1]
];
const difficult4 = [
    [14, 12, 15, 11],
    [9, 10, 13, 8],
    [6, 7, 0, 5],
    [2, 1, 3, 4],
];
const medium4 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 12, 10, 11],
    [13, 14, 0, 15],
];
function main() {
    const stateUsed = medium4;
    if (!(0, solvable_1.isSolvable)(stateUsed)) {
        console.log("Puzzle impossible to solve");
        return;
    }
    console.log("Puzzle possible to solve");
    const finalState = calculateFinalState(stateUsed);
    // console.log(finalState);
    const aStar = new Astar_1.Astar(stateUsed, new Node_1.Node(finalState, 0), heuristics_1.default.manhattan);
    aStar.solve();
}
main();
