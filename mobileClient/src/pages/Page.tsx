import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import UploadContainer from '../components/upload/UploadContainer';
import HomeContainer from '../components/home/HomeContainer';
import NewAssetContainer from '../components/newAsset/NewAssetContainer';
import PreviousSessionsContainer from '../components/previousSessions/PreviousSessionsContainer';
import CurrentSessionContainer from '../components/currentSession/CurrentSessionContainer';
import SettingsContainer from '../components/settings/SettingsContainer';
import './Page.css';
import { SettingsContextConsumer } from '../contexts/SettingsContext';
import { AssetsContextConsumer } from '../contexts/AssetsContext';
import {Assets, Settings} from '../types';


const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const componentsList: string[] = ["Home", "NewAsset", "Upload", "PreviousSessions", "CurrentSession", "Settings"]

  function getDisplayName() {
    interface IDisplayNames {
      [key: string]: any
    }

    const displayNames: IDisplayNames = {
      "NewAsset": "New Asset",
      "PreviousSessions": "Previous Sessions",
      "CurrentSession": "Current Session"
    };

    let displayName: string = name;
    if (Object.keys(displayNames).includes(name) === true) {
      displayName = displayNames[name];
    }

    return displayName;
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>{getDisplayName()}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <SettingsContextConsumer>
        {(settings: Settings) => (
          <IonContent>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">{name}</IonTitle>
              </IonToolbar>
            </IonHeader>

            {name === "Home" &&
              <HomeContainer name={name} />
            }

            {name === "NewAsset" &&
              <NewAssetContainer settings={settings} />
            }

            {name === "Upload" &&
              <UploadContainer name={name} settings={settings} />
            }

            {name === "PreviousSessions" &&
              <PreviousSessionsContainer settings={settings} />
            }

            {name === "CurrentSession" &&
              <AssetsContextConsumer>
                {(assetsContext: Assets) => (
                  <CurrentSessionContainer name={name} assetsProps={assetsContext.assets} />
                )}
              </AssetsContextConsumer>
            }

            {name === "Settings" &&
              <SettingsContainer name={name} />
            }

            {componentsList.includes(name) !== true &&
              <ExploreContainer name={name} />
            }

          </IonContent>
        )}
      </SettingsContextConsumer>
    </IonPage>
  );
};

export default Page;
