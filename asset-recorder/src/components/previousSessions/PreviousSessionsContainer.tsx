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
  const [noRemoteAssetsToast, setNoRemoteAssetsToast] = useState(false);
  const [loadingAssetsToast, setLoadingAssetsToast] = useState(true);

  let isRendered = useRef(false);

  
  const getPreviousAssets = (server: string) =>{
    console.log("previousAssets.map: ", previousAssets.map);
    const url= `${server}/assets`;
    axios.get(url).then((res) => {
        if (!isRendered.current){
          console.log(res.data);
          setPreviousAssets(res.data);
        }
        if(res.data && res.data.length === 0 ){
          setNoRemoteAssetsToast(true);
        }else{
          setSuccessfulDownloadToast(true);
        }

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
        isOpen={loadingAssetsToast}
        onDidDismiss={() => setLoadingAssetsToast(false)}
        message="Fetching inspections has been downloaded."
        duration={5000}
      />

      <IonToast
        isOpen={successfulDownloadToast}
        onDidDismiss={() => setSuccessfulDownloadToast(false)}
        message="Remote asset inspections has been downloaded."
        duration={5000}
      />
      <IonToast
        isOpen={noRemoteAssetsToast}
        onDidDismiss={() => setNoRemoteAssetsToast(false)}
        message="There are no remote asset inspections."
        duration={5000}
      />

    </IonContent>
  );
};

export default PreviousSessionsContainer;
