import React from 'react';
import '../Default.css';
import { IonLabel, IonItem, IonCheckbox } from '@ionic/react';


interface ContainerProps {
    asset: any;
    deletable: boolean;
  }
  

const AssetListItem: React.FC<ContainerProps> = ({ asset, deletable }) => {
    return(
        <IonItem>
            <IonLabel>{asset.assetIdText}</IonLabel>
            <p>{asset.serialNumberText}</p>
            {deletable &&
                <IonCheckbox slot="start" />
            }
        </IonItem>
)}

export default AssetListItem;
