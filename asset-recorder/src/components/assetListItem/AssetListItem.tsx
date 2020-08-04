import React from 'react';
import '../Default.css';
import { IonLabel, IonItem, IonCheckbox } from '@ionic/react';
import { AssetsContextConsumer, Assets, AssetsContextProvider } from '../../models/AssetsContext';
import { filter } from 'ionicons/icons';


interface ContainerProps {
    asset: any;
    deletable: boolean;
}


const AssetListItem: React.FC<ContainerProps> = ({ asset, deletable }) => {
    return (

        <IonItem>
            <IonLabel>{asset.assetIdText}</IonLabel>
            <p>{asset.serialNumberText}</p>

                <AssetsContextConsumer>
                    {(context: Assets) => (
                        <div>
                            {console.log("Context: ", context)}
                            {context.assets && context.assets.includes(asset) && deletable &&
                                <IonCheckbox slot="start" onClick={e => {
                                    console.log("asset: ", asset);
                                    console.log("assets: ", context.assets);

                                    const filteredAssets = context.assets.filter(unfilteredAsset => unfilteredAsset === asset);
                                    context.assets = filteredAssets;
                                    
                                }} />
                            }
                        </div>
                    )}
                </AssetsContextConsumer>

        </IonItem>

    )
}

export default AssetListItem;
