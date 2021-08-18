
export function findOptimalPathBFS(grid, startNode, endNode) {
    const nodes = [startNode];
    const Q = [startNode];
    while (Q.length) {
        const currentNode = Q.shift();
        const neighbours = findNeighbours(currentNode, grid);
        for (let neighbour of neighbours) {
            if (neighbour.isWall || neighbour.isVisited) continue;
            neighbour.isVisited = true;
            neighbour.previous = currentNode;
            nodes.push(neighbour);
            if (neighbour === endNode) return nodes;
            Q.push(neighbour);
        }
        startNode.previous = null;
    }
    return nodes;
}

function findNeighbours(node, matrix) {
    const neighbours = [];
    const m = matrix.length;
    const n = matrix[0].length;
    const {row, col} = node;
    const DIR = [[-1, 0], [0, 1], [0, -1], [1, 0]];
    for (let [di, dj] of DIR) {
        let x = row + di;
        let y = col + dj;
        if (x >= 0 && x < m && y >= 0 && y < n) {
            neighbours.push(matrix[x][y]);
        }
    }
    return neighbours;
}

export function findPathBFS(endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previous;
    }
    return path;
}
