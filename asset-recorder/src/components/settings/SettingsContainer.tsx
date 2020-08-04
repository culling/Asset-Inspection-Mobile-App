import React, {useState, useEffect, useRef} from 'react';
import { SettingsContextConsumer, Settings } from '../../models/SettingsContext';
import { IonLabel, IonInput, IonButton, IonContent, IonListHeader, IonList, IonItem } from '@ionic/react';


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [company, setCompany] = useState("");
  const [defaultAssetType, setDefaultAssetType] = useState("Computer");


  return (
    <IonContent>
      <IonList>
      
        <IonItem>
          <IonLabel>Company</IonLabel>
          <IonInput id="company" value={company} placeholder="Company" onIonChange={
          e => { setCompany(e.detail.value ? e.detail.value : "") }
          }></IonInput>
        </IonItem>

        {/* <IonItem>
          <IonLabel>Default Asset Type</IonLabel>
          <IonInput id="defaultAssetType" value={defaultAssetType} placeholder="Default Asset Type" onIonChange={
          e => { setDefaultAssetType(e.detail.value ? e.detail.value : "") }
          }></IonInput>
        </IonItem> */}
      
      </IonList>
    <SettingsContextConsumer>
    {(context: Settings) => (<div>
      <IonButton onClick={e=>{
        context.company = company;
        // context.defaultAssetType = defaultAssetType;
      }} expand="block">Save</IonButton>
     </div> )
    }
    </SettingsContextConsumer>


    </IonContent>
  );
};

export default ExploreContainer;
