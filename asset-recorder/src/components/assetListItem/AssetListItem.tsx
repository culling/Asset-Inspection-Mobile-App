import React from 'react';
import '../Default.css';
import { IonLabel, IonItem } from '@ionic/react';


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
