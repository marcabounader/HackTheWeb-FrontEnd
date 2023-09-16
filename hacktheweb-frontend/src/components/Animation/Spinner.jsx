import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './spinner.css'
const SpinningIcon = ({className}) => {
    return (
        <div>
            <FontAwesomeIcon
                icon={faSpinner}
                className={`icon spinning ${className && className}`}
            />
        </div>
    );
};

export default SpinningIcon;
