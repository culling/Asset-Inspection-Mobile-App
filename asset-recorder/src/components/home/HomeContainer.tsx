import React from 'react';
import './../Default.css';
import IntroductionContainer from './IntroductionContainer';

interface ContainerProps {
  name: string;
}

const HomeContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      {/* <strong>{name}</strong> */}
      {/* <p>Welcome!</p> */}
      <IntroductionContainer name={name} />
    </div>
  );
};

export default HomeContainer;
