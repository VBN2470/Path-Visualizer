
import MinHeapAStar from "./HeapAStar";

export function findOptimalPathAStar(grid, startNode, endNode) {
    const visitedNodesInOrder = [startNode];
    const nodes = findAllNodes(grid);
    for (let node of nodes) {
        node.f = Infinity; 
        node.g = Infinity;
        node.h = Infinity;
    }
    startNode.h = findHeuristicDistance(startNode, endNode);
    startNode.g = 0;
    startNode.f = startNode.h;
    const pq = new MinHeapAStar([startNode]);

    while (pq.heap.length) {
        const currentNode = pq.remove();
        const neighbours = findNeighbours(currentNode, grid);
        for (let node of neighbours) {
            if (node.isWall) continue;
            const w = node.isWeight ? 10 : 1;
            const gScoreSoFar = currentNode.g + w;
            if (gScoreSoFar < node.g) {
                node.previous = currentNode;
                node.h = findHeuristicDistance(node, endNode);
                node.g = gScoreSoFar;
                node.f = node.g + node.h;
                visitedNodesInOrder.push(node);
                if (node === endNode) return visitedNodesInOrder;
                pq.insert(node);
            }
        }
    }
    return visitedNodesInOrder;
}

function findAllNodes(grid) {
    const nodes = [];
    for (let row of grid) {
        for (let node of row) {
            nodes.push(node);
        }
    }
    return nodes;
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

function findHeuristicDistance(x, y) {
    return Math.abs(x.row - y.row) + Math.abs(x.col - y.col);
}

export function findPathAStar(endNode) {
    const nodes = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        nodes.unshift(currentNode);
        currentNode = currentNode.previous;
    }
    return nodes;
}
