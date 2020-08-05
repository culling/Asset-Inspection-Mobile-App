import React, {useState} from 'react';
import { SettingsContextConsumer, Settings, saveSettings } from '../../models/SettingsContext';
import { IonLabel, IonInput, IonButton, IonContent, IonList, IonItem } from '@ionic/react';


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  // const [company, setCompany] = useState("");
  // const [defaultAssetType, setDefaultAssetType] = useState("");


  return (
    <IonContent>
          <SettingsContextConsumer>
          {(context: Settings) => (<div>
      <IonList>
      
        <IonItem>
          <IonLabel><strong>Company</strong></IonLabel>
          <IonInput id="company" value={context.company} placeholder="Company" onIonChange={
          e => { 
            //setCompany(e.detail.value ? e.detail.value : "") 
            context.company = e.detail.value ? e.detail.value : "";
          }
          }></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel><strong>Default Asset Type: </strong></IonLabel>
          <IonInput id="defaultAssetType" value={context.defaultAssetType} placeholder="Default Asset Type" onIonChange={
          e => { 
            // setDefaultAssetType(e.detail.value ? e.detail.value : "") 
            context.defaultAssetType = e.detail.value ? e.detail.value : ""
          }
          }></IonInput>
        </IonItem>
      
      </IonList>


      <IonButton onClick={e=>{
        const settings = {
          company: context.company,
          defaultAssetType: context.defaultAssetType
        }
        saveSettings(settings);
      }} expand="block">Save</IonButton>
     </div> )
    }
    </SettingsContextConsumer>
    


    </IonContent>
  );
};

export default ExploreContainer;
