import React from 'react';
import '../Default.css';
import { IonList, IonContent, IonButton } from '@ionic/react';
import { AssetsContextConsumer, Assets } from '../../models/AssetsContext';
import AssetListItem from '../assetListItem/AssetListItem';

interface ContainerProps {
  name: string;
}

const CurrentSessionContainer: React.FC<ContainerProps> = ({ name }) => {



  return (
    <IonContent>
      <IonList inset={true}>
        <AssetsContextConsumer>
          {(context: Assets) => (<div>
            {(context.assets.length >0) ?
            <IonList>
            {context.assets.map((asset, i)=>{
                return <AssetListItem key={i} asset={asset} deletable={true} />
            }
              
            )}
            </IonList>
          : <h2>There are no current Asset Inspections waiting to be saved</h2>}
          </div>
        )}
        </AssetsContextConsumer>
        </IonList>
        <IonButton onClick={e=>{
          console.log("Delete elements");

          }}>Delete</IonButton>
    </IonContent>

  );
};

export default CurrentSessionContainer;
