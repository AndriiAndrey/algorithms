# algorithms

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

# Comparing Shortest Path Algorithms in Graphs

## 1. **DFS (Brute Force)**

- **How it works**: Tries every possible path from the start to all other nodes using recursion.
- **Speed**: Very slow as the graph grows (can take forever on large graphs).
- **Memory**: Uses some memory to keep track of visited paths.
- **Best for**: Tiny graphs or testing ideas.

### Pros

- Simple to write.
- Works even when there are negative edge weights.

### Cons

- Too slow for anything beyond small graphs.
- Not practical in real-world use cases.

---

## 2. **Dijkstra (Basic Version)**

- **How it works**: Greedily chooses the closest unvisited node using a list to track distances.
- **Speed**: Okay for small or moderately sized graphs, but slows down as the number of nodes increases.
- **Memory**: Stores all nodes and edges.
- **Best for**: When performance isn't critical and the graph is small.

### Pros

- Easy to understand and implement.
- Always finds the shortest path if all weights are positive.

### Cons

- Gets slow when many nodes or connections exist.
- Re-sorting the list over and over is inefficient.

---

## 3. **Dijkstra (Optimized with Min-Heap)**

- **How it works**: Like the basic version, but uses a binary heap (priority queue) to always grab the closest node quickly.
- **Speed**: Fast, even on large graphs.
- **Memory**: A bit more due to the heap, but still manageable.
- **Best for**: Real-world use (maps, networks, games, etc.) where performance matters.

### Pros

- Much faster than the basic version.
- Scales well to large graphs.
- Commonly used in real systems.

### Cons

- Harder to code (requires a custom min-heap implementation or 3rd party library).
- Doesn't work with negative edge weights.

## Result validation

here is result output:

```
result DFS 253,172,197,242,331,402,143,272,249,265
result Dijkstra 253,172,197,242,331,402,143,272,249,265
result Dijkstra optimized 253,172,197,242,331,402,143,272,249,265
```

you should see same result if run bun command:

```bash
bun run index.ts
```

as an test input was taken [input_random_1_4.txt](https://github.com/beaunus/stanford-algs/blob/master/testCases/course2/assignment2Dijkstra/input_random_1_4.txt)
and output result should match with [output_random_1_4.txt](https://github.com/beaunus/stanford-algs/blob/master/testCases/course2/assignment2Dijkstra/output_random_1_4.txt)
