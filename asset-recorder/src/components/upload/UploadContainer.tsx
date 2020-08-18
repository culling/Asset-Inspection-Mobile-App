import React, { useState } from 'react';
import './../Default.css';

import { IonButton, IonToast } from '@ionic/react';
import axios from 'axios';
import { Assets, AssetsContextConsumer, saveAssets, uploadToCloud } from '../../models/AssetsContext';
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

              // while (context.assets.length > 0) {
              //   const asset = context.assets.pop();
              //   if (asset === undefined) {
              //     console.log("asset not ready to be uploaded\n", "asset is undefined");
              //     return;
              //   }
              //   console.log("Asset:", asset);
              //   axios.post(`${settings.serverUrl}/assets`, asset)
              //     .then(response => {
              //       console.log("Response: " + JSON.stringify(response));
              //       if(context.assets.length === 0){
              //         setSuccessfulUploadToast(true);
              //       }
              //       saveAssets(context.assets);
              //     })
              //     .catch(e => context.assets.push(asset));
              //   }
              uploadToCloud(context.assets, settings, (err: any, success: any) => {
                if (err !== null) {
                  console.error("Error with saving: " + err);
                  return;
                } else {
                  setSuccessfulUploadToast(true);
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
