import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const SpinningIcon = () => {
    return (
        <div>
            <FontAwesomeIcon
                icon={faSpinner}
                className="icon spinning w-[50px] h-[50px]"
            />
        </div>
    );
};

export default SpinningIcon;
