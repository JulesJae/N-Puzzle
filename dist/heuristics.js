"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findElement(el, state) {
    const size = state[0].length;
    const idx = state.flat().findIndex((e) => e == el) + 1;
    const y = idx % size;
    const x = idx - y * size;
    return { x, y };
}
exports.default = {
    manhattan: (current, final) => {
        let distance = 0;
        current.forEach((row, y) => {
            row.forEach((el, x) => {
                const finalPlace = findElement(el, final);
                distance += Math.abs(x - finalPlace.x) + Math.abs(y - finalPlace.y);
            });
        });
        return distance;
    }
};
