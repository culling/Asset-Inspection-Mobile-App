import React, { useState, useEffect, useRef } from 'react';
import '../Default.css';
import { IonList, IonContent, IonToast } from '@ionic/react';
import AssetListItem from '../assetListItem/AssetListItem';

import ServerConverter from "./../../models/ServerConverter";
import { Cloud } from '../../data';

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

  useEffect(() => {
    console.log("settings: ", settings);
    Cloud.getPreviousAssets(settings.serverUrl).then((previousAssets) => {
      if (previousAssets && previousAssets.length === 0) {
        setNoRemoteAssetsToast(true);
      } else {
        setPreviousAssets(previousAssets);
        setSuccessfulDownloadToast(true);
      }
    });
    return () => {
      isRendered.current = true;
    };
  }, []);

  function convertFromServer(serverJson: any) {
    let serverConverter = new ServerConverter();
    return serverConverter.convert(serverJson);
  }

  return (
    <IonContent>
      <IonList inset={true}>
        {Array.isArray(previousAssets) && previousAssets.map((previousAsset) => {
          return convertFromServer(previousAsset);
        }).map((previousAsset, i) => <AssetListItem
          key={i}
          asset={previousAsset}
          />
        )}
      </IonList>

      <IonToast
        isOpen={loadingAssetsToast}
        onDidDismiss={() => setLoadingAssetsToast(false)}
        message="Fetching inspections from remote server."
        duration={5000}
      />

      <IonToast
        isOpen={successfulDownloadToast}
        onDidDismiss={() => setSuccessfulDownloadToast(false)}
        message="Asset inspections have been downloaded."
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
