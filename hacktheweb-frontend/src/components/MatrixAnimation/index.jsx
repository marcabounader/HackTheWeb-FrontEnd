import React from 'react';
import styled, { keyframes } from 'styled-components';

const matrixAnimation = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const MatrixContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const MatrixText = styled.div`
  color: green;
  font-size: 16px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  animation: ${matrixAnimation} 10s linear infinite;
`;

const MatrixAnimation = () => {
  return (
    <MatrixContainer>
      <MatrixText>
        0101010101010101010101010101010101010101...
      </MatrixText>
    </MatrixContainer>
  );
};

export default MatrixAnimation;
