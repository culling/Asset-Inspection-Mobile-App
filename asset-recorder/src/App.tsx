import Menu from './components/Menu';
import Page from './pages/Page';
import NewAsset from './pages/NewAsset';
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
import {Asset, AssetsContextProvider} from "./models/AssetContext";

const App: React.FC = () => {

  return (
    <IonApp>
      <AssetsContextProvider value={{assets: [] as Asset[]}}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/:name" component={Page} exact />
            <Redirect from="/" to="/page/Home" exact />

            <Route path="/page/NewAsset" component={NewAsset} exact />

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      </AssetsContextProvider>
    </IonApp>
  );
};

export default App;
