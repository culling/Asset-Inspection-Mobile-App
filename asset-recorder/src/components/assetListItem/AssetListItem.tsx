import React, { useState } from 'react';
import '../Default.css';
import { IonLabel, IonItem } from '@ionic/react';


interface ContainerProps {
    children?: React.ReactNode;
    asset: any;
}

const AssetListItem: React.FC<ContainerProps> = (props: { children?: React.ReactNode, asset: any }) => {
    const [expandItem, setExpandItem] = useState(false);
    const date = new Date(parseInt(props.asset.inspection_time));
    console.log(date.toISOString());
    return (
        <div>
            {expandItem ?
                <IonLabel>
                    <>{props.children}{props.asset.assetIdText}</>
                    <br />
                    <p>Details</p>
                    <p>Asset Id: {props.asset.assetIdText}</p>
                    <p>Serial Number: {props.asset.serialNumberText}</p>
                    <p>Latitude: {props.asset.latitude}</p>
                    <p>Longitude: {props.asset.longitude}</p>
                    <p>Inspection Time: {date.toISOString()}</p>
                <br />
                </IonLabel> :
                <IonItem onClick={() => { setExpandItem(!expandItem) }}>
                    <IonLabel>
                        {props.asset.assetIdText}
                        <p>{props.asset.serialNumberText}</p>
                    </IonLabel>
                </IonItem>
            }




        </div>
    )
}

export default AssetListItem;