export type State = number[][];

export type Point = {
  x: number,
  y: number
};

export type Heuristic = (state: State, finalState: State) => number;