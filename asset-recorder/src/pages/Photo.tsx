/* eslint-disable import/first */

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon, IonButton } from '@ionic/react';
import React, { Component } from 'react';
const INITIAL_STATE = {
  photo: '',
  photo2: ''
};

import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;


export class Photo extends Component {
  state: any = {};
  // props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.setState({
      photo: imageUrl
    })
  }


  async takePicture2() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.setState({
      photo2: imageUrl
    })
  }

  render() {
    const { photo, photo2 } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Photos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={photo} ></IonImg>
          {/* <IonFab color="primary" vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton color="primary" onClick={() => this.takePicture()}>
              <IonIcon name="add" />
            </IonFabButton>
          </IonFab> */}
          <IonButton color="primary"  onClick={() => this.takePicture()}>
              Take Photo 1
          </IonButton>

          <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={photo2} ></IonImg>
          <IonButton color="primary"  onClick={() => this.takePicture2()}>
              Take Photo 2
          </IonButton>
        </IonContent>
      </IonPage >
    );
  };
}
export default Photo;