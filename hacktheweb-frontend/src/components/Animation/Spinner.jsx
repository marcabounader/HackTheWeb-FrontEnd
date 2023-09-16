import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const SpinningIcon = () => {
    return (
        <div>
            <FontAwesomeIcon
                icon={faSpinner}
                className="icon spinning"
            />
        </div>
    );
};

export default SpinningIcon;
