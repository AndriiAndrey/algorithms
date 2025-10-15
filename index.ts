import { Graph } from './src/graph/graph';

const graphInputFile = Bun.file('./src/graph/graph-input.txt');
const graphInputStr = await graphInputFile.text();
const graph = new Graph(graphInputStr);

graph.computeShortestPaths(1, 'dfs');
const resultDfs = graph.getResultString();

graph.computeShortestPaths(1, 'dijkstra');
const resultDijkstra = graph.getResultString();

graph.computeShortestPaths(1, 'dijkstra-optimized');
const resultDijkstraOptimized = graph.getResultString();

console.log('--------------graph------------');
console.log('result DFS', resultDfs);
console.log('result Dijkstra', resultDijkstra);
console.log('result Dijkstra optimized', resultDijkstraOptimized);
console.log('-------------------------------');
