import React, { useEffect } from 'react';
import './ExploreContainer.css';
import { IonButton, IonContent } from '@ionic/react';
import { Item, Items, ItemsContextConsumer, saveItems } from '../models/ItemContext';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  return (
    <IonContent>
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>

      <ItemsContextConsumer>
        {(context: Items) => (
          <div>
            <IonButton onClick={(e) => {
              console.log(context.items);
              let item: Item = { description: `Test Item ${context.items ? context.items.length : 0}` };
              context.items ? context.items.push(item) : context.items = [item];

              // saveItems(context.items);
              console.log(context.items)

            }
            }>
              Test Buttons!
          </IonButton>
            <IonButton onClick={e => {
              saveItems(context.items);
            }}>Save to Local Storage</IonButton>

          </div>
        )}

      </ItemsContextConsumer>
    </IonContent>
  );
};

export default ExploreContainer;
