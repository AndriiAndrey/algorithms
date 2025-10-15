export type EdgeType = { to: number; weight: number };
export type AdjacencyListType = Map<number, EdgeType[]>;
export type ComparatorType<T> = (a: T, b: T) => number;
export type AlgorithmType = 'dfs' | 'dijkstra' | 'dijkstra-optimized';
