import { Node } from "./Node";
import { Point, State } from "./type";

function findElement(el: number, state: State): Point {
  const size = state[0].length;
  const idx = state.flat().findIndex((e) => e == el) + 1;
  const y = idx % size;
  const x = idx - y * size;

  return { x, y };
}

export default {

  manhattan: (current: State, final: State) => {
    let distance = 0;

    current.forEach((row, y) => {
      row.forEach((el, x) => {
        const finalPlace = findElement(el, final);

        distance += Math.abs(x - finalPlace.x) + Math.abs(y - finalPlace.y);
      })
    })

    return distance;
  }


}