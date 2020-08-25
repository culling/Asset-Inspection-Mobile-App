import React, { useState, useEffect, useRef } from 'react';
import '../Default.css';
import { IonList, IonContent, IonToast, IonSpinner } from '@ionic/react';
import AssetListItem from '../assetListItem/AssetListItem';

import { Cloud } from '../../dataLocations';

interface ContainerProps {
  settings: any;
}

const PreviousSessionsContainer: React.FC<ContainerProps> = ({ settings }) => {
  const [previousAssets, setPreviousAssets] = useState([]);
  const [successfulDownload, setSuccessfulDownload] = useState(false);
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
        setSuccessfulDownload(true);
        setSuccessfulDownloadToast(true);
      }
    });
    return () => {
      isRendered.current = true;
    };
  }, []);

  return (
    <IonContent>
      {
        successfulDownload ?
          <IonList inset={true}>
            {Array.isArray(previousAssets) && previousAssets.map((previousAsset, i) =>
              <AssetListItem key={i} asset={previousAsset} />
            )}
          </IonList> :
          <div style={{ "height": "100%", marginLeft: "auto", marginRight: "auto", width:"100%", verticalAlign:"middle", alignItems:"center", justifyContent:"center", display: "flex" }}>
            <IonSpinner name="crescent" style={{ "height": "100%", width:"10%",  verticalAlign:"middle", alignItems:"center", justifyContent:"center"  }} />
          </div>
      }

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
