
export function findRecursiveDivisionMaze(grid) {
    const visitedNodesInOrder = [];
    const HEIGHT = grid.length;
    const WIDTH = grid[0].length;

    for (let col = 0; col < WIDTH; col++) {
        const node = grid[0][col];
        visitedNodesInOrder.push(node);
    }

    for (let row = 0; row < HEIGHT; row++) {
        const nodeOne = grid[row][0];
        const nodeTwo = grid[row][WIDTH - 1];
        visitedNodesInOrder.push(nodeOne, nodeTwo);
    }

    for (let col = 0; col < WIDTH; col++) {
        const node = grid[HEIGHT - 1][col];
        visitedNodesInOrder.push(node);
    }

    recursiveDivisionHelper(grid, visitedNodesInOrder, 2, HEIGHT - 3, 2, WIDTH - 3, 'horizontal');

    return visitedNodesInOrder;
}

function recursiveDivisionHelper(grid, visitedNodesInOrder, rowStart, rowEnd, colStart, colEnd, orientation) {

    if (rowStart > rowEnd || colStart > colEnd) return;

    if (orientation === 'horizontal') {
        let potentialRows = [];
        for (let num = rowStart; num <= rowEnd; num += 2) {
            potentialRows.push(num);
        }
        let potentialCols = [];
        for (let num = colStart - 1; num <= colEnd; num += 2) {
            potentialCols.push(num);
        }
        let randomRowIdx = Math.floor(Math.random() * potentialRows.length);
        let randomColIdx = Math.floor(Math.random() * potentialCols.length);
        let currentRow = potentialRows[randomRowIdx];
        let randomCol = potentialCols[randomColIdx];
        for (let col = colStart - 1; col <= colEnd + 1; col++) {
            if (col === randomCol) continue;
            const node = grid[currentRow][col];
            if (node.isStart || node.isFinish) continue; 
            visitedNodesInOrder.push(node);
        }
        if (currentRow - 2 - rowStart > colEnd - colStart) {
            recursiveDivisionHelper(grid, visitedNodesInOrder, rowStart, currentRow - 2, colStart, colEnd, orientation);
        } else {
            recursiveDivisionHelper(grid, visitedNodesInOrder, rowStart, currentRow - 2, colStart, colEnd, "vertical");
        } 
        if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            recursiveDivisionHelper(grid, visitedNodesInOrder, currentRow + 2, rowEnd, colStart, colEnd, orientation);
        } else {
            recursiveDivisionHelper(grid, visitedNodesInOrder, currentRow + 2, rowEnd, colStart, colEnd, "vertical");
        }

    } else {
        let potentialCols = [];
        for (let num = colStart; num <= colEnd; num += 2) {
            potentialCols.push(num);
        }
        let potentialRows = [];
        for (let num = rowStart - 1; num <= rowStart + 1; num += 2) {
            potentialRows.push(num);
        }
        let randomColIdx = Math.floor(Math.random() * potentialCols.length);
        let randomRowIdx = Math.floor(Math.random() * potentialRows.length);
        let currentCol = potentialCols[randomColIdx];
        let randomRow = potentialRows[randomRowIdx];
        for (let row = rowStart - 1; row <= rowEnd + 1; row++) {
            if (row === randomRow) continue;
            const node = grid[row][currentCol];
            if (node.isStart || node.isFinish) continue; 
            visitedNodesInOrder.push(node);
        }
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            recursiveDivisionHelper(grid, visitedNodesInOrder, rowStart, rowEnd, colStart, currentCol - 2, "horizontal");
        } else {
            recursiveDivisionHelper(grid, visitedNodesInOrder, rowStart, rowEnd, colStart, currentCol - 2, orientation);
        }
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            recursiveDivisionHelper(grid, visitedNodesInOrder, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal");
        } else {
            recursiveDivisionHelper(grid, visitedNodesInOrder, rowStart, rowEnd, currentCol + 2, colEnd, orientation);
        }
    }
}
