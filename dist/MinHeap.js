"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinHeap = void 0;
class MinHeap {
    constructor() {
        this.heap = Array.from({ length: 10000 });
        this.head = 1;
        this.tail = 1;
        this.next = 1;
    }
    find(fn) {
        for (let i = this.head; i < this.next; i++) {
            if (fn(this.heap[i]))
                return this.heap[i];
        }
        return null;
    }
    add(node) {
        this.push(node);
        const nodeScore = node.getScore();
        let parentIndex = this.next >> 1;
        let idx = this.tail;
        let parent = this.heap[parentIndex];
        // console.log(`parentIdx = ${parentIndex}, parent = ${parent}`);
        while (parentIndex > 0 && parent.getScore() < nodeScore) {
            this.heap[idx] = parent;
            this.heap[parentIndex] = node;
            idx = parentIndex;
            parentIndex >>= 1;
            parent = this.heap[parentIndex];
        }
    }
    unshift() {
        if (this.next === 1)
            return null;
        const ret = this.heap[this.head];
        const last = this.pop();
        const lastScore = last.getScore();
        let idx = this.head;
        this.heap[idx] = last;
        while (this.hasSon(idx)) {
            const [minidx, minScore] = this.getMinimumScore(idx);
            if (minScore > lastScore)
                break;
            this.heap[idx] = this.heap[minidx];
            this.heap[minidx] = last;
            idx = minidx;
        }
        return ret;
    }
    hasSon(idx) {
        const left = idx << 1;
        return left <= this.tail;
    }
    getMinimumScore(idx) {
        const left = idx << 1;
        const right = left + 1;
        const leftNode = this.heap[left];
        const leftScore = leftNode.getScore();
        if (right > this.tail)
            return [left, leftScore];
        const rightScore = this.heap[right].getScore();
        const minScore = rightScore < leftScore ? rightScore : leftScore;
        const min = rightScore < leftScore ? right : left;
        return [min, minScore];
    }
    pop() {
        const ret = this.heap[this.tail];
        this.tail -= 1;
        this.next -= 1;
        return ret;
    }
    push(node) {
        this.heap[this.next] = node;
        this.tail = this.next;
        this.next += 1;
    }
}
exports.MinHeap = MinHeap;
