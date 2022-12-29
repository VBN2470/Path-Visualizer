
export function findDFS(grid, startNode, endNode) {
    const nodes = [];
    const stack = [startNode];
    while (stack.length) {
        const currentNode = stack.pop();
        const currentNeighbours = findNeighbours(currentNode, grid);
        if (!currentNode.isVisited) {
            currentNode.isVisited = true;
            nodes.push(currentNode);
            if (currentNode === endNode) {
                return nodes;
            }
            currentNeighbours.forEach(neighbour => {
                stack.push(neighbour);
            });
        }
    }
    return nodes;
}

function findNeighbours(node, matrix) {
    const neighbours = [];
    const m = matrix.length;
    const n = matrix[0].length;
    const { row, col } = node;
    const DIR = [[0, -1], [-1, 0], [0, 1], [1, 0]];
    for (let [di, dj] of DIR) {
        let x = row + di;
        let y = col + dj;
        if (x >= 0 && x < m && y >= 0 && y < n) {
            neighbours.push(matrix[x][y]);
        }
    }
    return neighbours;
}
