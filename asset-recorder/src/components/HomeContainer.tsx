import React from 'react';
import './Default.css';

interface ContainerProps {
  name: string;
}

const HomeContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Welcome!</p>
    </div>
  );
};

export default HomeContainer;
