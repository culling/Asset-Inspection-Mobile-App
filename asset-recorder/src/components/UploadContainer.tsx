import React from 'react';
import './Default.css';

import {IonButton} from '@ionic/react';

interface ContainerProps {
  name: string;
}

let saveAll = ()=>{
    console.log("Save All Clicked");
}

const UploadContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
        <IonButton onClick={e=>{ saveAll()}}>Save to Cloud
        </IonButton>
    </div>
  );
};

export default UploadContainer;
