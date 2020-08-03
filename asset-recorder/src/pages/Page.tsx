import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import UploadContainer from '../components/UploadContainer';
import HomeContainer from '../components/HomeContainer';
import NewAssetContainer from '../components/NewAssetContainer';
import './Page.css';



const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  function getDisplayName() {
    interface IDisplayNames{
      [key : string] : any
    }

    const displayNames : IDisplayNames = {
      "NewAsset":"New Asset"
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
        {name !== "Home" && name !== "NewAsset" && name !== "Upload" &&
          <ExploreContainer name={name} />
        }

      </IonContent>
    </IonPage>
  );
};

export default Page;
