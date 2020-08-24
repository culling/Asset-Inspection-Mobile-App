import React, { useState, useContext, useEffect } from 'react';
import '../Default.css';
import { IonList, IonContent, IonButton, IonCheckbox } from '@ionic/react';
import { AssetsContextConsumer } from '../../models/AssetsContext';
import {Asset, Assets} from './../../types';
import { Local } from './../../data';
import AssetListItem from '../assetListItem/AssetListItem';

interface ContainerProps {
  name: string;
  assetsProps: Asset[];
}

const CurrentSessionContainer: React.FC<ContainerProps> = ({ name, assetsProps }) => {
  const [selectedAssets, setSelectedAssets] = useState([] as Asset[]);
  const [assets, setAssets] = useState(assetsProps);

  const clearCheckboxes = () => {
    document.querySelectorAll("ion-checkbox").forEach(checkbox => checkbox.checked = false);
  };

  return (
    <IonContent>
      <IonList inset={true}>
        {(assets.length > 0) ?
          <IonList>
            {assets.map((asset: Asset, i: any) => {

              return <div key={i}><AssetListItem key={i}
                asset={asset}
              >
                <IonCheckbox slot="start" onClick={e => {
                  const isChecked = e.currentTarget.checked;
                  let assets = [];
                  if (isChecked) {
                    assets = [...selectedAssets, asset];
                  } else {
                    const filteredAssets = selectedAssets.filter(unfilteredAsset => unfilteredAsset != asset);
                    assets = (filteredAssets);
                  }

                  setSelectedAssets(assets);
                }}
                ></IonCheckbox>
              </AssetListItem></div>
            })}
          </IonList> :
          <h2>There are no current Asset Inspections waiting to be saved</h2>}
      </IonList>
      <AssetsContextConsumer>
        {(context: Assets) => (
          <div>
            <IonButton onClick={e => {
              console.log("Delete elements");
              const filteredAssets = assets.filter((asset: Asset) => {

                return !selectedAssets.includes(asset);
              });

              console.log("selectedAssets: ", selectedAssets);
              console.log("filteredAssets: ", filteredAssets);

              setAssets(filteredAssets);
              Local.saveAssets(filteredAssets);
              context.assets = filteredAssets;


              console.log("assets: ", assets);
              clearCheckboxes();

            }} expand="block">Delete</IonButton>
          </div>)}</AssetsContextConsumer>
    </IonContent>
  );
};

export default CurrentSessionContainer;