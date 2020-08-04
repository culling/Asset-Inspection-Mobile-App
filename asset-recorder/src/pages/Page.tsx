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



const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  
  const componentsList :string[] = ["Home", "NewAsset", "Upload", "PreviousSessions", "CurrentSession", "Settings"]

  function getDisplayName() {
    interface IDisplayNames{
      [key : string] : any
    }

    const displayNames : IDisplayNames = {
      "NewAsset":"New Asset",
      "PreviousSessions": "Previous Sessions",
      "CurrentSession": "Current Session"
    };
    
    let displayName :string = name;
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

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name={name} /> */}
        {name === "Home" &&
          <HomeContainer name={name} />
        }
        {name === "NewAsset" &&
          <NewAssetContainer />
        }
        {name === "Upload" &&
          <UploadContainer name={name} />
        }
        {name === "PreviousSessions" &&
          <PreviousSessionsContainer name={name} />
        }
        {name === "CurrentSession" &&
          <CurrentSessionContainer name={name} />
        }
        {name === "Settings" && 
          <SettingsContainer name={name}/>
        }
        {componentsList.includes(name) !== true && 
          <ExploreContainer name={name} />
        }

      </IonContent>
    </IonPage>
  );
};

export default Page;
