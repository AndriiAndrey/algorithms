import { MinHeap } from '../minHeap';
import type { AdjacencyListType, AlgorithmType, EdgeType } from './types';

const MAX_DISTANCE = 1000000;
const TARGETS = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197];

export class Graph {
  private adjacencyList: AdjacencyListType = new Map();
  private shortestPaths: Map<number, number> = new Map();

  private algorithms: Record<AlgorithmType, (source: number) => void> = {
    dfs: (source: number) => this.dfs(source, 0, new Set([source])),
    dijkstra: (source: number) => this.dijkstra(source, 0),
    'dijkstra-optimized': (source: number) => this.dijkstraOptimized(source, 0),
  };

  constructor(input: string) {
    this.adjacencyList = this.parseGraphFromString(input);
  }

  private parseGraphFromString(input: string): AdjacencyListType {
    const graph = new Map<number, EdgeType[]>();
    const lines = input.trim().split('\n');

    for (const line of lines) {
      const [nodeStr, ...edgesStr] = line.split('\t');
      const node = parseInt(nodeStr!);
      const edges: EdgeType[] = edgesStr.filter(Boolean).map((e) => {
        const [toStr, weightStr] = e.split(',');
        return {
          to: parseInt(toStr!),
          weight: parseInt(weightStr!),
        };
      });
      graph.set(node, edges);
    }

    return graph;
  }

  private dfs(node: number, currentCost: number, visited: Set<number>): void {
    if (this.shortestPaths.has(node) && this.shortestPaths.get(node)! <= currentCost) {
      return;
    }

    this.shortestPaths.set(node, currentCost);

    for (const edge of this.adjacencyList.get(node) || []) {
      if (!visited.has(edge.to)) {
        visited.add(edge.to);
        this.dfs(edge.to, currentCost + edge.weight, visited);
        visited.delete(edge.to);
      }
    }
  }

  private dijkstra(startNode: number, startingCost: number): void {
    const visited: Set<number> = new Set([]);
    const queue: [number, number][] = [[startingCost, startNode]];

    while (queue.length > 0) {
      queue.sort((a, b) => a[0] - b[0]);
      const [currentDist, node] = queue.shift()!;

      if (visited.has(node)) continue;

      visited.add(node);
      this.shortestPaths.set(node, currentDist);

      for (const edge of this.adjacencyList.get(node) || []) {
        if (!visited.has(edge.to)) {
          queue.push([currentDist + edge.weight, edge.to]);
        }
      }
    }
  }

  private dijkstraOptimized(startNode: number, startingCost: number): void {
    const distances = new Map<number, number>();
    const heap = new MinHeap<[number, number]>((a, b) => a[0] - b[0]);

    distances.set(startNode, startingCost);
    heap.push([startingCost, startNode]);

    while (!heap.isEmpty()) {
      const [dist, node] = heap.pop()!;
      if ((distances.get(node) ?? MAX_DISTANCE) < dist) continue;
      if (this.shortestPaths.has(node)) continue;

      this.shortestPaths.set(node, dist);

      for (const edge of this.adjacencyList.get(node) || []) {
        const newDist = dist + edge.weight;
        if (!distances.has(edge.to) || newDist < distances.get(edge.to)!) {
          distances.set(edge.to, newDist);
          heap.push([newDist, edge.to]);
        }
      }
    }
  }

  computeShortestPaths(source: number, algorithm: AlgorithmType): Map<number, number> {
    this.shortestPaths.clear();

    const strategy = this.algorithms[algorithm];
    if (!strategy) {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
    strategy(source);

    return this.shortestPaths;
  }

  getResultString(targets: number[] = TARGETS): string {
    return targets.map((node) => this.shortestPaths.get(node) ?? MAX_DISTANCE).join(',');
  }
}
