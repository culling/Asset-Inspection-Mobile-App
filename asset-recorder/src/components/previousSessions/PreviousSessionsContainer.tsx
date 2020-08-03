import React from 'react';
import '../Default.css';
import { IonHeader } from '@ionic/react';

interface ContainerProps {
  name: string;
}

const PreviousSessionsContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
        <IonHeader>Previous Sessions!</IonHeader>
        
    </div>
  );
};

export default PreviousSessionsContainer;
