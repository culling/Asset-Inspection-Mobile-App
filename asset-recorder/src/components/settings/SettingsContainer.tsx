import React, { useState } from 'react';
import { SettingsContextConsumer, Settings, saveSettings } from '../../models/SettingsContext';
import { IonLabel, IonInput, IonButton, IonContent, IonList, IonItem } from '@ionic/react';


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  // const [company, setCompany] = useState("");
  // const [defaultAssetType, setDefaultAssetType] = useState("");
  const [serverSettingsOpen, setServerSettingsOpen] = useState(false);

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


            <IonButton onClick={e => {
              setServerSettingsOpen(!serverSettingsOpen)
            }} expand="block" color={serverSettingsOpen?"medium":"warning"}>{serverSettingsOpen? <span>Hide Server Settings</span> : <span>Show Server Settings</span>}</IonButton>

            {serverSettingsOpen && 
            <div className="content">
            <IonItem>
              <IonLabel><strong>Server Url: </strong></IonLabel>
              <IonInput id="defaultAssetType" value={context.serverUrl} placeholder="https://assetrecorder-postgress-1.herokuapp.com" onIonChange={
                e => {
                  // setDefaultAssetType(e.detail.value ? e.detail.value : "") 
                  context.serverUrl = e.detail.value ? e.detail.value : ""
                }
              }></IonInput>
            </IonItem>

            <IonButton onClick={e => {
              console.log("Remove all items");
              fetch(`${context.serverUrl}/db/drop`)
                .then(res => { return res.json() })
                .then(json => console.log(json))
                .catch(err => console.log(`An error occoured: ${err}`));

            }} expand="block" color="danger">Drop and recreate Asset Database</IonButton>
            </div>
          }


          </IonList>


          <IonButton onClick={e => {
            const settings = {
              company: context.company,
              defaultAssetType: context.defaultAssetType,
              serverUrl: context.serverUrl
            }
            saveSettings(settings);
          }} expand="block">Save</IonButton>

        </div>)
        }
      </SettingsContextConsumer>



    </IonContent>
  );
};

export default ExploreContainer;
