import React, { useState } from 'react';
import "../styles/FeedChoice.css"

function FeedChoice({ onSelectMode }) {
    const [selectedMode, setSelectedMode] = useState(false); // Initial mode

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
        onSelectMode(mode); 
    };

    return (
        <div className='feed-choice-container'>
            <div
                className={`feed-choice ${selectedMode === false ? 'active' : ''}`}
                onClick={() => handleModeChange(false)}
            >
                Recent
            </div>
            <div
                className={`feed-choice ${selectedMode === true ? 'active' : ''}`}
                onClick={() => handleModeChange(true)}
            >
                For You Page
            </div>
        </div>
    );
}

export default FeedChoice;
