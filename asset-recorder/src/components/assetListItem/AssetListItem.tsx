import React, { useState } from 'react';
import '../Default.css';
import { IonLabel, IonItem, IonCheckbox } from '@ionic/react';
import { AssetsContextConsumer, Assets, AssetsContextProvider } from '../../models/AssetsContext';
import { filter } from 'ionicons/icons';


interface ContainerProps {
    children?:React.ReactNode;
    asset: any;
}

const AssetListItem: React.FC<ContainerProps> = (
    props: { children?: React.ReactNode,
    asset: any }) => {
    return (
        <IonItem>
            {props.children}
            <IonLabel>{props.asset.assetIdText}</IonLabel>
            <p>{props.asset.serialNumberText}</p>
        </IonItem>
    )
}

export default AssetListItem;
