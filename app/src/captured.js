import React from 'react';

const CapturedList = (props) => {
    const capturedPieces = props.captured.map((piece, i) => {
        return <li key={i}>{piece}</li>
    });

    return (
        <div>
            <div>{`${props.player === 'white' ? 'White' : 'Black'}'s captured pieces:`}</div>
            <div className="capture-box">
                <ul>{capturedPieces}</ul>
            </div>
        </div>
    );
}

export default CapturedList;