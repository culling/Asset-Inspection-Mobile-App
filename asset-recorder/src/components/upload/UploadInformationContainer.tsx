import React from 'react';
import './../Default.css';
import { IonGrid, IonRow, IonCol, IonCardContent } from '@ionic/react';

interface ContainerProps {

}

const UploadInformationContainer: React.FC<ContainerProps> = ({  }) => {
    return (
        // <div className="container">
            <IonGrid>
                <IonRow>
                    <IonCol sizeSm="12" sizeMd="12">
                        <br />
                        <br />
                        <p>Upload will save the asset inspections to the remote database</p>
                        <p>Asset inspections will be cleared from the local device</p>

                    </IonCol>
                </IonRow>
            </IonGrid>
        // </div>

    );
};

export default UploadInformationContainer;