
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Tutorial from '../Tutorial/Tutorial';
import './NavBar.css';
import '../PathVisualizer';

const NavBar = props => {
    
    const [mainButton, setMainButton] = useState(
        <Button id="default" className="btn" variant="success">
            <i className="fas fa-arrow-circle-left"></i> Visualize Algorithm!</Button>
        );
    const [tutorial, setTutorial] = useState(true);

    const { clearGrid, clearPath, clearWalls, clearWeights, isAnimating,
        runAStar, runBFS, runDFS, runDijkstra, runGreedyBFS, runRecursiveDivision, 
        toggleAlgorithmType } = props;

    const runAlgorithm = e => {
        const id = e.target.id;
        if (id === 'AStar') runAStar();
        if (id === 'BFS') runBFS();
        if (id === 'DFS') runDFS();
        if (id === 'Dijkstra') runDijkstra();
        if (id === 'GreedyBFS') runGreedyBFS();
    }

    const toggleButtonState = e => {
        const name = e.target.innerHTML;
        setMainButton(
            <Button id={e.target.id} variant="success" onClick={e => {runAlgorithm(e);}}>
                <i className="fas fa-eye"></i> Visualize {name}!</Button>
        )
    }

    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="">
                <h3 style={{color : 'white'}}>
                    <i className="far fa-compass"></i> Path Visualizer
                </h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                        <Dropdown.Item id="AStar" disabled={isAnimating()} onClick={e => {
                            toggleButtonState(e); 
                            toggleAlgorithmType(e);
                            clearPath();
                        }}>
                            A* Search
                        </Dropdown.Item>
                        <Dropdown.Item id="BFS" disabled={isAnimating()} onClick={e => {
                            toggleButtonState(e);
                            toggleAlgorithmType(e);
                            clearWeights();
                            clearPath();

                        }}>
                            Breadth-First Search
                        </Dropdown.Item>
                        <Dropdown.Item id="DFS" disabled={isAnimating()} onClick={e => {
                            toggleButtonState(e);
                            toggleAlgorithmType(e);
                            clearWeights();
                            clearPath();
                        }}>
                            Depth-First Search
                        </Dropdown.Item>
                        <Dropdown.Item id="Dijkstra" disabled={isAnimating()} onClick={e => {
                            toggleButtonState(e);
                            toggleAlgorithmType(e);
                            clearPath()
                        }}>
                            Dijkstra's Algorithm
                        </Dropdown.Item>
                        <Dropdown.Item id="GreedyBFS" disabled={1} onClick={e => {
                            toggleButtonState(e);
                            toggleAlgorithmType(e);
                            clearPath()
                        }}>
                            Greedy Best-First Search (TBA)
                        </Dropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Mazes" id="basic-nav-dropdown">
                        <Dropdown.Item id="Recursive" disabled={isAnimating()} onClick={() => {
                            clearGrid();
                            runRecursiveDivision();
                        }}>
                            Recursive Division
                        </Dropdown.Item>
                    </NavDropdown>
                    {isAnimating() 
                        ? 
                        <Button disabled={true} variant="success">
                            <i className="fas fa-spinner"></i> Visualizing Algorithm...
                        </Button> 
                        : mainButton
                    }
                    <Button disabled={isAnimating()} onClick={() => clearWalls()} variant="primary">Clear Walls</Button>
                    <Button disabled={isAnimating()} onClick={() => clearWeights()} variant="primary">Clear Weights</Button>
                    <Button disabled={isAnimating()} onClick={() => clearPath()} variant="primary">Clear Path</Button>
                    <Button disabled={isAnimating()} onClick={() => clearGrid()} variant="danger">
                        <i className="fas fa-redo-alt"></i> Reset Grid
                    </Button>
                    <Button disabled={isAnimating()} onClick={() => setTutorial(true)} variant="info">
                        <i className="fas fa-book-open"></i> Tutorial
                    </Button>
                    <Tutorial
                        tutorial = {tutorial}
                        showTutorial={setTutorial} 
                    />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;
