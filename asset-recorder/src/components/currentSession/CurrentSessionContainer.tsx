import React from 'react';
import '../Default.css';
import { IonList, IonContent, IonButton } from '@ionic/react';
import { Asset } from '../../models/AssetsContext';
import AssetListItem from '../assetListItem/AssetListItem';

interface ContainerProps {
  name: string;
  assets: Asset[];
}

const CurrentSessionContainer: React.FC<ContainerProps> = ({ name, assets }) => {

  return (
    <IonContent>
      <IonList inset={true}>
        {(assets.length > 0) ?
          <IonList>
            {assets.map((asset: Asset, i: any) => {
              return <AssetListItem key={i} asset={asset} deletable={true} onSelectedFunction={
                (selectedAsset: Asset) => { console.log(selectedAsset) }
              } />
            })}
          </IonList> :
          <h2>There are no current Asset Inspections waiting to be saved</h2>}
      </IonList>
      <IonButton onClick={e => {
        console.log("Delete elements");
      }} expand="block">Delete</IonButton>
    </IonContent>
  );
};

export default CurrentSessionContainer;
