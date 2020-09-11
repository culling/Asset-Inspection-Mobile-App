import React from 'react';
import './../Default.css';
import { IonText, IonContent, IonGrid, IonRow, IonCol, IonCardContent } from '@ionic/react';

interface ContainerProps {
    name: string;
}

const IntroductionContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <strong>Asset Recorder</strong>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol sizeSm="12" sizeMd="12">
                        <br />
                        <br />
                        <p>For initial setup, select <strong>Settings</strong> from the menu</p>

                        {/* <p>The asset recorder is designed to record assets in situation quickly and efficiently</p>
                        <p>For initial setup, go to "Settings" and put the company of the assets, and a default device type as required</p>
                        <p>To get started with creating a new asset inspection, just select <strong>New Asset</strong></p>
                        <p>To review the inspections, select <strong>Current Session</strong></p>
                        <p>To upload to the remote database, select <strong>Upload</strong></p>
                        <p>To review asset inspections from the remote database, select <strong>Previous Sessions</strong></p> */}
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>

    );
};

export default IntroductionContainer;