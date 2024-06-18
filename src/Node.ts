import { State } from "./type";

export class Point {
  constructor(public x: number, public y: number) {}
}

export class Node {
  // private state: any;
  private zero: Point;
  private max: number;
  private parent: Node | null;
  public h: number;
  public stringState: string;

  constructor(private state: State, public g: number) {
    // console.log("new Node state.length = ", this.state);
    this.max = this.state[0].length;
    this.zero = this.getZero();
    this.parent = null;
    this.h = 0;
    this.stringState = this.toString()
  }

  getZero(): Point {
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

  setParent(node: Node) {
    this.parent = node;
  }

  getParent() { return this.parent; }

  getScore(): number {
    return this.g + this.h;
  }

  toString(): string { return this.state.flat().toString(); }

  isEqual(node: Node) {
    return this.stringState === node.stringState;
  }

  setH(number: number) {
    this.h = number;
  }

  private getNeighbor(turn: number) {
    let point: Point;

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

  private getNewState(point: Point): State | null {
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

        } else {

          return { done: true };

        }
      }
    }
  }
}