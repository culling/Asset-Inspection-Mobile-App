import React, { useState, useEffect } from 'react';
import '../Default.css';
import { IonLabel, IonItem, IonImg, IonButton } from '@ionic/react';


interface ContainerProps {
    children?: React.ReactNode;
    asset: any;
}

const AssetListItem: React.FC<ContainerProps> = (props: { children?: React.ReactNode, asset: any }) => {
    const [expandItem, setExpandItem] = useState(false);
    const date = new Date(parseInt(props.asset.inspection_time));
    const [assetIdPhotoUrlExpand, setAssetIdPhotoUrlExpand] = useState(false);
    const [serialNumberPhotoUrlExpand, setSerialNumberPhotoUrlExpand] = useState(false);

    console.log(date.toISOString());

    return (
        <div>
            <IonItem >
                {props.children}
                <IonLabel>
                    {props.asset.assetIdText}
                    <p>{props.asset.serialNumberText}</p>
                </IonLabel>
                <IonButton size="small" onClick={() => { setExpandItem(!expandItem) }}>{expandItem? "Hide Details": "Show Details" }</IonButton>
            </IonItem>

            {expandItem &&
                <IonLabel>
                    <br />
                    <p><b>Details</b></p>
                    <p>Asset Id: {props.asset.assetIdText}</p>
                    {props.asset.assetIdPhotoUrl.length > 0 &&
                        <>{
                            assetIdPhotoUrlExpand ?
                                <>
                                    <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={props.asset.assetIdPhotoUrl} />
                                    <IonButton size="small" fill="clear" onClick={() => { setAssetIdPhotoUrlExpand(false) }}>Hide Asset Id Photo</IonButton>
                                </>
                                :
                                <IonButton size="small" fill="clear" onClick={() => { setAssetIdPhotoUrlExpand(true) }}>Show Asset Id Photo</IonButton>
                        }</>
                    }
                    <p>Serial Number: {props.asset.serialNumberText}</p>
                    {props.asset.serialNumberPhotoUrl.length > 0 &&
                        <>{
                            serialNumberPhotoUrlExpand ?
                                <>
                                    <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={props.asset.serialNumberPhotoUrl} />
                                    <IonButton size="small" fill="clear" onClick={() => { setSerialNumberPhotoUrlExpand(false) }}>Hide Serial Number Photo</IonButton>
                                </>
                                :
                                <IonButton size="small" fill="clear" onClick={() => { setSerialNumberPhotoUrlExpand(true) }}>Show Serial Number Photo</IonButton>
                        }</>
                    }
                    <p>Latitude: {props.asset.latitude}</p>
                    <p>Longitude: {props.asset.longitude}</p>
                    <p>Inspection Time: {date.toISOString()}</p>
                    <IonItem>
                    </IonItem>
                </IonLabel >
            }




        </div >
    )
}

export default AssetListItem;