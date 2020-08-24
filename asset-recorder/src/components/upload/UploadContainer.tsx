import React, { useState } from 'react';
import './../Default.css';

import { IonButton, IonToast } from '@ionic/react';
// import axios from 'axios';
import { AssetsContextConsumer, saveLocal,  } from '../../contexts/AssetsContext';
import {Assets} from './../../types';
import {Cloud} from '../../dataLocations';
import UploadInformationContainer from './UploadInformationContainer';


interface ContainerProps {
  name: string;
  settings: any;
}


const UploadContainer: React.FC<ContainerProps> = ({ name, settings }) => {
  const [successfulUploadToast, setSuccessfulUploadToast] = useState(false);
  const [noUnsyncedAssetsToast, setNoUnsyncedAssetsToast] = useState(false);
  return (
    <div className="container">
      <UploadInformationContainer />
      <AssetsContextConsumer>
        {(context: Assets) => (
          <div>
            <IonButton onClick={e => {
              console.log("Save All Clicked");

              console.log("Assets:", context.assets);
              Cloud.uploadToCloud(context.assets, settings, (err: any, success: any) => {
                if (err == null) {
                  setSuccessfulUploadToast(true);
                  console.log("Upload Success: ", success);
                }
              });
            }
            }>Save to Cloud
          </IonButton>
            <IonToast
              isOpen={successfulUploadToast}
              onDidDismiss={() => setSuccessfulUploadToast(false)}
              message="Local asset inventory has been uploaded and cleared."
              duration={5000}
            />
            <IonToast
              isOpen={noUnsyncedAssetsToast}
              onDidDismiss={() => setNoUnsyncedAssetsToast(false)}
              message="Local asset inventory has been uploaded and cleared."
              duration={5000}
            />
          </div>
        )}
      </AssetsContextConsumer>

    </div>

  );
};

export default UploadContainer;
