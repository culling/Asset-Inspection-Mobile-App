import Menu from './components/menu/Menu';
import Page from './pages/Page';

import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


/* Import models */
import {AssetsContextProvider} from "./contexts/AssetsContext";
import {SettingsContextProvider} from "./contexts/SettingsContext";

const App: React.FC = () => {

  return (
    <IonApp>
      <SettingsContextProvider>
      <AssetsContextProvider>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/:name" component={Page} exact />
            <Redirect from="/" to="/page/Home" exact />

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      </AssetsContextProvider>
      </SettingsContextProvider>
    </IonApp>
  );
};

export default App;
