import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  archiveOutline,
  archiveSharp,
  saveOutline,
  saveSharp,
  settingsOutline,
  settingsSharp,
  homeOutline,
  homeSharp,
  documentOutline,
  documentSharp,
  documentsOutline,
  documentsSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/page/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'New Asset',
    url: '/page/NewAsset',
    iosIcon: documentOutline,
    mdIcon: documentSharp
  },
  {
    title: 'Current Session',
    url: '/page/CurrentSession',
    iosIcon: documentsOutline,
    mdIcon: documentsSharp
  },
  {
    title: 'Upload To Cloud',
    url: '/page/Upload',
    iosIcon: saveOutline,
    mdIcon: saveSharp
  },
  {
    title: 'Previous Sessions',
    url: '/page/PreviousSessions',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Settings',
    url: '/page/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="menu-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem 
                  className={location.pathname === appPage.url ? 'selected' : ''} 
                  routerLink={appPage.url} 
                  routerDirection="none" 
                  lines="none" 
                  detail={false}
                >
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
