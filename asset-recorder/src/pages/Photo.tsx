/* eslint-disable import/first */

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon, IonButton, IonText } from '@ionic/react';
import React, { Component } from 'react';
const INITIAL_STATE = {
  photo: '',
  photo2: '',
  latitude: null,
  longitude: null

};

import { Plugins, CameraResultType } from '@capacitor/core';
import { State } from 'ionicons/dist/types/stencil-public-runtime';
const { Camera } = Plugins;


export class Photo extends Component {
  state: any = {};
  // props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  async getGps() {
    const supported = 'mediaDevices' in navigator;
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition((pos: any) => {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      this.setState({
        latitude: crd.latitude,
        longitude: crd.longitude
      });
    }, (err: any) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }, options);
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
    const { photo, photo2, latitude, longitude } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Photos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="location">
            {latitude !== null && longitude !== null &&
              <IonText id="location">{latitude}, {longitude}</IonText>
            }
          </div>
          <IonButton color="primary" onClick={() => this.getGps()}>
            Update Location
          </IonButton>

          <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={photo} ></IonImg>
          {/* <IonFab color="primary" vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton color="primary" onClick={() => this.takePicture()}>
              <IonIcon name="add" />
            </IonFabButton>
          </IonFab> */}
          <IonButton color="primary" onClick={() => this.takePicture()}>
            Take Photo 1
          </IonButton>

          <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={photo2} ></IonImg>
          <IonButton color="primary" onClick={() => this.takePicture2()}>
            Take Photo 2
          </IonButton>
        </IonContent>
      </IonPage >
    );
  };
}
export default Photo;