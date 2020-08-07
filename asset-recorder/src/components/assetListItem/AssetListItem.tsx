import React from 'react';
import '../Default.css';
import { IonLabel, IonItem, IonCheckbox } from '@ionic/react';
import { AssetsContextConsumer, Assets, AssetsContextProvider } from '../../models/AssetsContext';
import { filter } from 'ionicons/icons';


interface ContainerProps {
    asset: any;
    deletable: boolean;
    onSelectedFunction: any; 
}


const AssetListItem: React.FC<ContainerProps> = ({ asset, deletable, onSelectedFunction }) => {
    return (

        <IonItem>
            <IonLabel>{asset.assetIdText}</IonLabel>
            <p>{asset.serialNumberText}</p>

            <div>
                {deletable &&
                    <IonCheckbox slot="start" onClick={e => {
                        console.log("asset: ", asset);
                        onSelectedFunction(asset);
                    }} />
                }
            </div>


        </IonItem>

    )
}

export default AssetListItem;
