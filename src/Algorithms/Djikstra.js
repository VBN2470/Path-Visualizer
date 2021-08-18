
import MinHeapDijkstra from "./HeapDijkstra"

export function findOptimalPathDijkstra(grid, startNode, endNode) {
    const visitedNodesInOrder = [startNode];
    startNode.distance = 0;
    const pq = new MinHeapDijkstra([startNode]);
    while (pq.heap.length) {
        const currentNode = pq.remove();
        const neighbours = findNeighbours(currentNode, grid);
        for (let node of neighbours) {
            if (node.isWall || node.isVisited) continue;
            let w = node.isWeight ? 4 : 1;
            if (currentNode.distance + w < node.distance) {
                node.distance = currentNode.distance + w;
                node.previous = currentNode;
                node.isVisited = true;
                visitedNodesInOrder.push(node);
                if (node === endNode) return visitedNodesInOrder;
                pq.insert(node);
            }
        }
    }
}

function findNeighbours(node, matrix) {
    const neighbours = [];
    const m = matrix.length;
    const n = matrix[0].length;
    const { row, col } = node;
    const DIR = [[-1, 0], [0, 1], [0, -1], [1, 0]];
    for (let [di, dj] of DIR) {
        let x = row + di;
        let y = col + dj;
        if (x >= 0 && x < m && y >= 0 && y < n) {
            neighbours.push(matrix[x][y]);
        }
    }
    return neighbours
}

export function findPathDijkstra(endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previous;
    }
    return path;
}
