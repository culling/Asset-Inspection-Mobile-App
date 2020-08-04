import React, {useState} from 'react';
import './../Default.css';

import { IonButton,  IonToast } from '@ionic/react';
import axios from 'axios';
import { Assets, AssetsContextConsumer } from '../../models/AssetsContext';


interface ContainerProps {
  name: string;
}

// let saveAll = () => {
//   console.log("Save All Clicked");

//   // componentDidMount() {
//     // Simple POST request with a JSON body using axios
//     const article = { title: 'React POST Request Example' };
//     axios.post('https://reqres.in/api/articles', article)
//         .then(response => this.setState({ articleId: response.data.id }));
//   // }
// }

const UploadContainer: React.FC<ContainerProps> = ({ name }) => {
  const [successfulUploadToast, setSuccessfulUploadToast] = useState(false);
  const [noUnsyncedAssetsToast, setNoUnsyncedAssetsToast] = useState(false);
  return (
    <div className="container">
      <AssetsContextConsumer>
        {(context: Assets) => (
          <div>
          <IonButton onClick={e => {
            console.log("Save All Clicked");

            console.log("Assets:", context.assets);

            while (context.assets.length > 0) {
              const asset = context.assets.pop();
              if (asset === undefined) {
                console.log("asset not ready to be uploaded\n", "asset is undefined");
                return;
              }
              console.log("Asset:", asset);
              axios.post('https://assetrecorder-postgress-1.herokuapp.com/assets', asset)
                .then(response => {
                  console.log("Response: " + JSON.stringify(response));
                  if(context.assets.length === 0){
                    setSuccessfulUploadToast(true);
                  }
                })
                .catch(e => context.assets.push(asset));

              }

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
