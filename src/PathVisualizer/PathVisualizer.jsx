
import React, { useState, useEffect } from 'react';
import './PathVisualizer.css';
import Info from './Info/Info';
import NavBar from './NavBar/NavBar';
import Node from './Node/Node';
import { findOptimalPathAStar, findPathAStar } from '../Algorithms/AStar';
import { findOptimalPathBFS, findPathBFS } from '../Algorithms/BreadthFirstSearch';
import { findDFS } from '../Algorithms/DepthFirstSearch';
import { findOptimalPathDijkstra, findPathDijkstra } from '../Algorithms/Djikstra';
import { findRecursiveDivisionMaze } from '../Mazes/RecursiveDivision';

let NUM_ROWS = 15;
let NUM_COLS = 40;

let START_NODE_ROW = Math.floor(NUM_ROWS / 2);
let START_NODE_COL = 4;
let FINISH_NODE_ROW = Math.floor(NUM_ROWS / 2);
let FINISH_NODE_COL = NUM_COLS - START_NODE_COL - 1;

const PathVisualizer = () => {
    
    const [grid, setGrid] = useState([]);
    const [keyCode, setKeyCode] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [isStartClicked, setIsStartClicked] = useState(false);
    const [isTargetClicked, setIsTargetClicked] = useState(false);
    const [isWeightedAlgorithm, setIsWeightedAlgorithm] = useState(false);

    useEffect(() => {
        const grid = findInitialGrid();
        document.addEventListener('keydown', e => handleKeyDown(e));
        document.addEventListener('keyup', () => handleKeyUp());
        setGrid(grid);
    }, []);

    const handleMouseDown = (row, col) => {
        if (!isLocked && row === START_NODE_ROW && col === START_NODE_COL) {
            setIsStartClicked(true);
            console.log('Start Node...');
        }
        else if (!isLocked && row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            setIsTargetClicked(true);
            console.log('Target Node...');
        }
        else if (!isAnimating) {
            if (keyCode !== 87) {
                const newGrid = findNewGridWithWallToggled(grid, row, col);
                setGrid(newGrid);
                setIsMousePressed(true);       
            } else if (keyCode === 87 && isWeightedAlgorithm) {
                const newGrid = findNewGridWithWeightToggled(grid, row, col);
                setGrid(newGrid);
                setIsMousePressed(true);
            }
        }
    }

    function handleMouseOver(row, col) {
        if (isStartClicked && !isLocked && !(row === FINISH_NODE_ROW && col === FINISH_NODE_COL)) {
            const newGrid = findNewGridWithNewStart(grid, row, col);
            setGrid(newGrid);
            console.log('Moving...');
        }
        else if (isTargetClicked && !isLocked && !(row === START_NODE_ROW && col === START_NODE_COL)) {
            const newGrid = findNewGridWithNewTarget(grid, row, col);
            setGrid(newGrid);
        } else {
            if (!isMousePressed) return null;
            if (keyCode !== 87) {
                const newGrid = findNewGridWithWallToggled(grid, row, col);
                setGrid(newGrid);
                setIsMousePressed(true);
                console.log('Moving...');
            } else if (keyCode === 87 && isWeightedAlgorithm) {
                const newGrid = findNewGridWithWeightToggled(grid, row, col);
                setGrid(newGrid);
                setIsMousePressed(true);
            }
        }
        
    }

    const handleMouseUp = (row, col) => {
        if (isStartClicked) {
            const newGrid = findNewGridWithNewStart(grid, row, col);
            setGrid(newGrid);
            setIsStartClicked(false)
        } else if (isTargetClicked) {
            const newGrid = findNewGridWithNewTarget(grid, row, col);
            setGrid(newGrid);
            setIsTargetClicked(false);
        }
        setIsMousePressed(false);
    }

    const handleKeyDown = e => {
        setKeyCode(e.keyCode);
    }

    const handleKeyUp = () => {
        setKeyCode(false)
    }

    const toggleAlgorithmType = e => {
        const id = e.target.id;
        if (id === 'AStar' || id === 'Dijkstra' || id === 'GreedyBFS') {
            setIsWeightedAlgorithm(true);
        } else {
            setIsWeightedAlgorithm(false);
        }
    }

    const isAnimatingNow = () => {
        return isAnimating;
    }

    const clearGrid = () => {
        const currentGrid = grid.slice();
        for (let row of currentGrid) {
            for (let node of row) {
                node.distance = Infinity;
                node.isVisited = false;
                node.isWall = false;
                node.isWeight = false;
                node.previous = null;
                const currentNode = document.getElementById(`node-${node.row}-${node.col}`);
                currentNode.className = 'node';
            }
        }
        const startNode = document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`);
        startNode.className = 'node node-start';
        const endNode = document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`);
        endNode.className = 'node node-finish';
        setGrid(currentGrid);
        setIsMousePressed(false);
        setIsAnimating(false);
        setIsClicked(false);
        setIsLocked(false);
    }

    const clearPath = () => {
        const currentGrid = grid.slice();
        for (let row of currentGrid) {
            for (let node of row) {
                node.distance = Infinity;
                node.isVisited = false;
                node.previous = null;
                const currentNode = document.getElementById(`node-${node.row}-${node.col}`);
                if (currentNode.className === 'node shortest-path-weight' || node.isWeight) {
                    currentNode.className = 'node node-weight';
                } else if (['node node-visited', 'node node-shortest-path'].indexOf(currentNode.className) !== -1) {
                    currentNode.className = 'node';
                }
            }
        }
        const startNode = document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`);
        startNode.className = 'node node-start';
        const endNode = document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`);
        endNode.className = 'node node-finish';
        setGrid(currentGrid);
        setIsMousePressed(false);
        setIsAnimating(false);
        setIsClicked(false);
        setIsLocked(false);
    }

    const clearWalls = () => {
        const currentGrid = grid.slice();
        for (let row of currentGrid) {
            for (let node of row) {
                if (node.isWall) {
                    node.isWall = !node.isWall;
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
                }
            }
        }
        setGrid(currentGrid);
        setIsMousePressed(false);
    }

    const clearWeights = () => {
        const currentGrid = grid.slice();
        for (let row of currentGrid) {
            for (let node of row) {
                if (node.isWeight) {
                    node.isWeight = !node.isWeight;
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
                }
            }
        }
        setGrid(currentGrid)
        setIsMousePressed(false);
    }

    function animateAStar(visitedNodesInOrder, nodesInShortestPathAStar) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length - 1) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathAStar);
                }, 20*i);
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 20*i);
        }
    }

    function animateBFS(visitedNodesInOrder, nodesInShortestPathBFS) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length - 1) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathBFS);
                }, 20*i);
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 20*i);
        }
    }

    function animateDFS(visitedNodesInOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 20*i);
        }
        setTimeout(() => {
            setIsAnimating(false);
        }, 3200);
    }

    function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length - 1) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 20*i);

                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 20*i);
        }
    }

    function animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                const currentNode = document.getElementById(`node-${node.row}-${node.col}`);
                if (node.isWeight) {
                    currentNode.className = 'node shortest-path-weight';
                } else {
                    currentNode.className = 'node node-shortest-path';
                }
            }, 40*i);
        }
        setTimeout(() => {
            setIsAnimating(false);
            setIsLocked(true);
        }, 1600);
    }

    const runAStar = () => {
        if (isClicked) clearPath();
        setIsAnimating(true);
        setIsClicked(true);
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = findOptimalPathAStar(grid, startNode, endNode);
        const nodesInShortestPathAStar = findPathAStar(endNode);
        animateAStar(visitedNodesInOrder, nodesInShortestPathAStar);
    }

    const runBFS = () => {
        if (isClicked) clearPath();
        setIsAnimating(true);
        setIsClicked(true);
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = findOptimalPathBFS(grid, startNode, endNode);
        const nodesInShortestPathBFS = findPathBFS(endNode);
        animateBFS(visitedNodesInOrder, nodesInShortestPathBFS);
    }

    const runDFS = () => {
        if (isClicked) clearPath();
        setIsAnimating(true);
        setIsClicked(true);
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = findDFS(grid, startNode, endNode);
        animateDFS(visitedNodesInOrder);
    }

    const runDijkstra = () => {
        if (isClicked) clearPath();
        setIsAnimating(true);
        setIsClicked(true);
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = findOptimalPathDijkstra(grid, startNode, endNode);
        const nodesInShortestPathOrder = findPathDijkstra(endNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    const runGreedyBFS = () => {

    }

    const runRecursiveDivision = () => {
        setIsAnimating(true);
        const visitedNodesInOrder = findRecursiveDivisionMaze(grid);
        animateMaze(visitedNodesInOrder);
    }

    const animateMaze = visitedNodesInOrder => {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                node.isWall = true;
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-wall';
            }, 12 * i);
        }
        setTimeout(() => {
            setIsAnimating(false);
        }, 8*visitedNodesInOrder.length);
    }

    return (
        <>
            <NavBar
                runAStar={runAStar}
                runBFS={runBFS}
                runDFS={runDFS}
                runDijkstra={runDijkstra}
                runGreedyBFS={runGreedyBFS}
                runRecursiveDivision={runRecursiveDivision}
                clearGrid={clearGrid}
                clearPath={clearPath}
                clearWalls={clearWalls}
                clearWeights={clearWeights}
                isAnimating={isAnimatingNow}
                toggleAlgorithmType={e => toggleAlgorithmType(e)}></NavBar>
            <Info></Info>
            <table className="grid">
                <tbody>
                    {
                        grid.map((row, rowIdx) => {
                            return (
                                <tr key={rowIdx}>
                                    {
                                        row.map((node, nodeIdx) => {
                                            const { row, col, isStart, isFinish, isWall, isWeight } = node;
                                            return (
                                                <Node
                                                    key={nodeIdx}
                                                    row={row}
                                                    col={col}
                                                    isStart={isStart}
                                                    isFinish={isFinish}
                                                    isWall={isWall}
                                                    isWeight={isWeight}
                                                    isMousePressed={isMousePressed}
                                                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                                                    onMouseOver={(row, col) => handleMouseOver(row, col)}
                                                    onMouseUp={() => handleMouseUp(row, col)}/>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

const findInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < NUM_COLS; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
}

const createNode = (row, col) => {
    return {
        row,
        col, 
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isWeight: false,
        previous: null
    };
}

const findNewGridWithNewStart = (grid, row, col) => {
    const newGrid = grid.slice();
    for (let currentRow of newGrid) {
        for (let node of currentRow) {
            node.isStart = false;
            if (node === newGrid[row][col]) {
                node.isStart = true;
                START_NODE_ROW = row;
                START_NODE_COL = col;
            }
        }
    }
    return newGrid
}

const findNewGridWithNewTarget = (grid, row, col) => {
    const newGrid = grid.slice();
    for (let currentRow of newGrid) {
        for (let node of currentRow) {
            node.isFinish = false;
            if (node === newGrid[row][col]) {
                node.isFinish = true;
                FINISH_NODE_ROW = row;
                FINISH_NODE_COL = col;
            }
        }
    }
    return newGrid;
}

const findNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
        isWeight: false
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

const findNewGridWithWeightToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: false,
        isWeight: !node.isWeight,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

export default PathVisualizer
