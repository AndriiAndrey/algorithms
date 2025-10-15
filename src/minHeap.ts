import type { ComparatorType } from './graph/types';

export class MinHeap<T> {
  private heap: T[] = [];
  private compare: ComparatorType<T>;

  constructor(compare: ComparatorType<T>) {
    this.compare = compare;
  }

  push(item: T): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown();
    return root;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index]!, this.heap[parentIndex]!) < 0) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex]!, this.heap[index]!];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown(): void {
    let index = 0;
    const lastIndex = this.heap.length - 1;
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestChildIndex = index;

      if (
        leftChildIndex <= lastIndex &&
        this.compare(this.heap[leftChildIndex]!, this.heap[smallestChildIndex]!) < 0
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex <= lastIndex &&
        this.compare(this.heap[rightChildIndex]!, this.heap[smallestChildIndex]!) < 0
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex !== index) {
        [this.heap[index], this.heap[smallestChildIndex]] = [
          this.heap[smallestChildIndex]!,
          this.heap[index]!,
        ];
        index = smallestChildIndex;
      } else {
        break;
      }
    }
  }
}
