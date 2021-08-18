
import React from 'react';
import './Info.css';
import '../PathVisualizer';
import ListGroup from 'react-bootstrap/ListGroup';

const Info = () => {
    
    return (
        <div className="info">
            <ListGroup horizontal>
                <ListGroup.Item>
                    <div className="start"></div> Start Node
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="target"></div> Target Node
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="wall"></div> Wall Node
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="weight"></div> Weight Node
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="visited"></div> Visited Node
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="unvisited"></div> Unvisited Node
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="shortest-path"></div> Shortest Path Node
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default Info
