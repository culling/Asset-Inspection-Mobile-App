import React from 'react';
import './Default.css';

import { IonButton } from '@ionic/react';
import axios from 'axios';
import { Assets, AssetsContextConsumer } from '../models/AssetContext';


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
  return (
    <div className="container">
      <AssetsContextConsumer>
        {(context: Assets) => (
          <IonButton onClick={e => {
            console.log("Save All Clicked");

            // componentDidMount() {
            // Simple POST request with a JSON body using axios
            // const asset = {
            //   "latitude": 100000
            //   , "longitude": 10
            //   , "inspection_time": "1111"
            //   , "assetType": "Test"
            //   , "assetIdText": "22ded"
            //   , "serialNumberText": "33dde"
            // }

            const asset = context.assets.pop();
            axios.post('https://assetrecorder-postgress-1.herokuapp.com/assets', asset)
              .then(response => console.log("Response: " + JSON.stringify(response)));
            
          }
          }>Save to Cloud
          </IonButton>
        )}
      </AssetsContextConsumer>

    </div>

  );
};

export default UploadContainer;
