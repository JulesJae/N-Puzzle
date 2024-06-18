import { MinHeap } from "./MinHeap";
import { Node } from "./Node";
import { Heuristic, State } from "./type";


export class Astar {
  private open: MinHeap<Node>;
  private close: Node[];
  private closeState: Set<string>;

  constructor(initialState: State, private finalNode: Node, private heuristic: Heuristic) {
    this.open = new MinHeap();
    this.close = [];

    const startNode = new Node(initialState, 0);

    this.open.add(startNode);
    // this.openState = new Set<string>();
    this.closeState = new Set<string>();
  }

  solve() {
    let node;

    while (node = this.open.unshift()) {

      if (this.isFinal(node)) return this.reconstructPath(node);

      this.close.push(node);
      this.closeState.add(node.toString());
      for (const neighbor of node) {
        if (neighbor === null || neighbor === undefined) continue;
        if (this.isInClose(neighbor)) continue;

        neighbor.setH(this.heuristic(neighbor.getState(), this.finalNode.getState()));
        neighbor.setParent(node);

        if (!this.switchIfNeeded(neighbor)) 
          this.open.add(neighbor);

      }
    }
    
    return false;
  }

  private reconstructPath(finalNode: Node) {
    let node: Node | null = finalNode;
    let ret = [];

    while (node !== null) {
      ret.push(node);
      node = node.getParent()
    }

    ret = ret.reverse()
    ret.forEach(node => {
      console.log (node.toString());
    });
    return ret;
  }

  private switchIfNeeded(newNode: Node): boolean {
    const openNode = this.open.find((n) => n.isEqual(newNode));

    if (openNode === null) return false;
    if (newNode.getScore() > openNode.getScore()) return true;

    openNode.h = newNode.h;
    openNode.g = newNode.g;
    openNode.setParent(newNode.getParent() as Node)
    return true;
  }

  private isInClose(node: Node): boolean {
    // const isInCLose = this.close.some((n) => n.isEqual(node));
    // for (let i = 0; i < this.close.length; i++) {
    //   if (this.close[i].isEqual(node)) return true;
    // }
    // return false;
    // console.log("this.inClose() = ", isInCLose);
    // return this.close.some((n) => n.isEqual(node));
    return this.closeState.has(node.stringState);
  }

  private isFinal(node: Node): boolean {
    // return true;
    return node.isEqual(this.finalNode);
  }


}