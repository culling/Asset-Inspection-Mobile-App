import React, {useState, useEffect, useRef} from 'react';
import '../Default.css';
import { IonList, IonContent, IonToast } from '@ionic/react';
import AssetListItem from '../assetListItem/AssetListItem';
import axios from 'axios';

import ServerConverter from "./../../models/ServerConverter";
import { Settings } from 'http2';

interface ContainerProps {
  name: string;
  settings: any;
}

const PreviousSessionsContainer: React.FC<ContainerProps> = ({ name, settings }) => {
  const [previousAssets, setPreviousAssets] = useState([]);

  
  const [successfulDownloadToast, setSuccessfulDownloadToast] = useState(false);
  const [noUnsyncedAssetsToast, setNoUnsyncedAssetsToast] = useState(false);

  let isRendered = useRef(false);

  
  const getPreviousAssets = (server: string) =>{
    console.log("previousAssets.map: ", previousAssets.map);
    const url= `${server}/assets`;
    axios.get(url).then((res) => {
        if (!isRendered.current){
          console.log(res.data);
          setPreviousAssets(res.data);

        }
        setSuccessfulDownloadToast(true);
    });
  }


  useEffect(() => {

    console.log("settings: " , settings);
    getPreviousAssets(settings.serverUrl);
    return () => {
      isRendered.current = true;
    };
  }, []);

  function convertFromServer(serverJson : any){
    let serverConverter = new ServerConverter();
    return serverConverter.convert(serverJson);
  }

  return (
    <IonContent>
      <IonList inset={true}>
        {Array.isArray(previousAssets) && previousAssets.map((previousAsset) => {
          return convertFromServer(previousAsset);
        }).map( (previousAsset, i) => <AssetListItem asset={previousAsset} key={i} deletable={false}/>
        )}
      </IonList>

      <IonToast
        isOpen={successfulDownloadToast}
        onDidDismiss={() => setSuccessfulDownloadToast(false)}
        message="Remote asset inventory has been downloaded."
        duration={5000}
      />
      <IonToast
        isOpen={noUnsyncedAssetsToast}
        onDidDismiss={() => setNoUnsyncedAssetsToast(false)}
        message="Local asset inventory has been uploaded and cleared."
        duration={5000}
      />

    </IonContent>
  );
};

export default PreviousSessionsContainer;
