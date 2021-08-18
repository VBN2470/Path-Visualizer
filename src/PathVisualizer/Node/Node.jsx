
import React from 'react';
import './Node.css';

const Node = props => {

    const {row, col, isStart, isFinish, isWall, isWeight, onMouseDown, onMouseOver, onMouseUp} = props;
    const extraClassName = isStart ? 'node-start' : isFinish ? 'node-finish' : isWall ? 'node-wall' : 
                        isWeight ? 'node-weight' : '';
    return (
        <td 
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={e => {e.preventDefault(); onMouseDown(row, col)}}
            onMouseOver={() => onMouseOver(row, col)}
            onMouseUp={() => onMouseUp(row, col)}>
        </td>
    );
}

export default Node;
