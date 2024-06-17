import React, { useState } from 'react';
import "../styles/FeedChoice.css"

function FeedChoice({ onSelectMode }) {
    const [selectedMode, setSelectedMode] = useState('recent'); // Initial mode

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
        onSelectMode(mode); // Notify parent component about the selected mode
    };

    return (
        <div className='feed-choice-container'>
            <div
                className={`feed-choice ${selectedMode === 'recent' ? 'active' : ''}`}
                onClick={() => handleModeChange('recent')}
            >
                Recent
            </div>
            <div
                className={`feed-choice ${selectedMode === 'for-you' ? 'active' : ''}`}
                onClick={() => handleModeChange('for-you')}
            >
                For You Page
            </div>
        </div>
    );
}

export default FeedChoice;
