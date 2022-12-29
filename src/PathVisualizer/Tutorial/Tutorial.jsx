
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Tutorial.css';

export const Tutorial = ({ tutorial, showTutorial }) => {

    return (
        <Modal
            size="lg"
            show={tutorial}
            onHide={() => showTutorial(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Welcome to Path Visualizer!    
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This is quick tutorial on how to navigate this application.</p>
                <p> 
                    <i>If you wish to skip this tutorial, click on the <i class="fas fa-times"></i> icon above.</i> 
                </p>
                <h5>
                    What Are Path Algorithms?</h5>
                <div className="info-box">
                    <p>Path Algorithms are a set of algorithms that allow us to find a 
                        path (possibly <strong>shortest</strong>) between two vertices in a graph. 
                        This application allows you to interact with and visualize some awesome path 
                        algorithms that can help you enhance your understanding of some of the algorithms 
                        at hand.</p>
                </div>
                <h5>
                    How To Use This App</h5>
                <div className="demo-box">
                    <p><b>Step 1</b>: Select an Algorithm</p>
                    <p>Click on the Algorithms tab and select an algorithm 
                        from the dropdown menu.</p>
                    <p>Note that some algorithms are unweighted while others are weighted. If you select a weighted 
                        algorithm, you will be able to add weights onto the grid (see Step 2). </p>
                </div>
                <div className="demo-box">
                    <p><b>Step 2</b>: Adding Walls and Weights</p>
                    <p>All algorithms in this application utilise the interactive grid provided
                    to you. Before adding walls and weights, you can click on the start or target nodes 
                    and move them around to a different position on the grid. </p> 
                    <p> You can click and drag on the grid to add walls. If you have selected
                        a weighted algorithm, click and drag whilst holding the <div className='key'>W</div> key 
                        to add weights.</p>
                    <p>Walls are impenetrable whereas weights are penetrable. Passing through an unweighted node
                        incurs a cost of one unit. Passing through a weighted node however, incurs a cost of 10 units.
                    </p>
                </div>
                <div className="demo-box">
                    <p> <b>Step 3</b>: Visualizing an Algorithm and More </p>
                    <p> This is the fun part. Click on the <i className="fas fa-eye"></i> Visualize Algorithm button 
                        to witness your path algorithm in action! </p>
                    <p>
                        Algorithms which  <i> guarantee </i> a shortest path will display such a path once complete
                        (highlighted in yellow). If the shortest path passes through a weight node, this too will be
                        indicated in the path.
                    </p>
                    <p>Once the algorithm completes, you can perform other actions to modify or rerun your algorithm.
                        You will be able to use the navigation bar to clear the current path (if it exists), clear 
                        walls and weights, clear the board and select other path algorithms of your choice.</p>
                </div>
                <div className="demo-box">
                    <p> <b>Optional</b>: Generating Mazes </p>
                    <p> Click on the Mazes tab and select a maze generation algorithm to generate a randomized
                        maze. </p>
                    <p>You can then apply any path algorithm of your choice to witness it navigate through a maze. </p>
                </div>
                <div className="end-box">
                    <p> <b>Enjoy!</b>  </p>
                    <p>I hope you enjoy using this application and find it useful. If you wish to 
                        revisit this tutorial, you can do so by clicking on the <i className="fas fa-book-open"></i> Tutorial button 
                        located on the navigation bar or hitting the <div className='key'>F5</div> key to reload. 
                    </p>
                    <p>If you wish to view the source code for this application, please feel free to visit my 
                        <Button variant="primary">
                            GitHub
                        </Button></p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => showTutorial(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Tutorial;
