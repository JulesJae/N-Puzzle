"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSolvable = void 0;
function countInversions(state) {
    let inversion = 0;
    const flatState = state.flat();
    for (let i = 0; i < flatState.length; i++) {
        for (let j = i + 1; j < flatState.length; j++) {
            if (flatState[j] > 0 && (flatState[j] < flatState[i])) {
                console.log(`Inversion: i = ${flatState[i]}, j = ${flatState[j]}`);
                inversion++;
            }
        }
    }
    console.log(`inversion = ${inversion}`);
    return inversion;
}
function findZero(state) {
    const N = state.length;
    for (let i = N - 1; i >= 0; i--)
        for (let j = N - 1; j >= 0; j--)
            if (state[i][j] === 0)
                return N - i;
    return 1;
}
function isSolvable(state) {
    const N = state.length;
    const inversions = countInversions(state);
    if (N & 1) {
        return !(inversions & 1);
    }
    const pos = findZero(state);
    if (pos & 1)
        return !(inversions & 1);
    return (inversions & 1) === 1;
}
exports.isSolvable = isSolvable;
