// src/components/AnimatedSubmitButton.jsx

import React from 'react';
import styles from './SubmitButton.module.css';

// The component now receives its state and a 'disabled' flag via props
const SubmitButton = ({ buttonState }) => {
    const getButtonText = () => {
        if (buttonState === 'idle') return 'SEND';
        if (buttonState === 'done') return 'DONE';
        return '';
    };

    return (
        <button
            // The button is disabled if it's not in the 'idle' state
            disabled={buttonState !== 'idle'}
            className={`${styles.button} ${styles[buttonState] || ''}`}
        >
            <span className={styles.buttonContent}>{getButtonText()}</span>
            {buttonState === 'sending' && (
                <div className={styles.birdBox}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className={styles.bird}></div>
                    ))}
                </div>
            )}
        </button>
    );
};

export default SubmitButton;