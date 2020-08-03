/* eslint-disable import/first */

import MapSection from './map/Map' // import the map here

import { IonButtons, IonMenuButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon, IonButton, IonText, IonInput, IonLabel } from '@ionic/react';

import React, { Component } from 'react';
const INITIAL_STATE = {
  map: null,
  latitude: null,
  longitude: null,
  assetIdPhoto: "",
  assetId:"",
  serialNumberPhoto: "",
  serialNumber: "",
  assetType: "",
  company:""
};


import { Plugins, CameraResultType } from '@capacitor/core';
import { State } from 'ionicons/dist/types/stencil-public-runtime';
import { Assets, AssetsContextConsumer, AssetsContextProvider } from '../models/AssetContext';
const { Camera } = Plugins;




 
export class NewAssetComponent extends Component {
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



  async takeAssetIdPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.setState({
      assetIdPhoto: imageUrl
    })
  }

  async takeSerialNumberPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.setState({
      serialNumberPhoto: imageUrl
    })
  }

  render() {
    const {  latitude, longitude, assetIdPhoto, assetId, serialNumberPhoto,serialNumber,assetType, company } = this.state;
    return (
      // <IonPage>
      //  <IonHeader>
      //   <IonToolbar>
      //     <IonButtons slot="start">
      //       <IonMenuButton />
      //     </IonButtons>
      //     <IonTitle>New Asset</IonTitle>
      //   </IonToolbar>
      // </IonHeader>


        <IonContent className="ion-padding">

          <div className="location">
            {latitude !== null && longitude !== null &&
              <div>
              <IonText id="location">{latitude}, {longitude}</IonText>
              <MapSection location={{lat: latitude, lng: longitude,text: ""}} zoomLevel={17} /> 
              </div>
            }

          </div>
          <IonButton color="primary" onClick={() => this.getGps()}>
            Update Location
          </IonButton>

          <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={assetIdPhoto} ></IonImg>

          <IonButton color="primary" onClick={  () => this.takeAssetIdPicture()}>
            {(assetIdPhoto !== null)?     
            <span>Take Photo of assetID</span>:
            <span>Update Photo of assetID </span>} 
          </IonButton>

          <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={serialNumberPhoto} ></IonImg>
          <IonButton color="primary" onClick={  () => this.takeSerialNumberPicture()}>
            {(serialNumberPhoto !== null)?
            <span>Take Photo of serial number</span>:
            <span>Update Photo of serial number</span>}
          </IonButton>


          <div>
          <IonLabel>Asset Id</IonLabel>
          <IonInput id="assetId" value={assetId} placeholder="Asset Id" onIonChange={
            e => {this.setState({assetId: e.detail.value})}
            }></IonInput>
          </div>

          <div>
          <IonLabel>Serial Number</IonLabel>
          <IonInput id="serialNumber" value={serialNumber} placeholder="serial number" onIonChange={
            e => {this.setState({serialNumber: e.detail.value})}
            }></IonInput>
          </div>


          <div>
          <IonLabel>Asset Type</IonLabel>
          <IonInput id="assetType" value={assetType} placeholder="Enter Asset Type" onIonChange={
            e => {this.setState({assetType: e.detail.value})}
            }></IonInput>
          </div>
          
          <IonLabel>Company</IonLabel>
          <IonInput id="company" value={company} placeholder="Company" onIonChange={
            e => {this.setState({company: e.detail.value})}
            }></IonInput>


<AssetsContextConsumer>
        {(context : Assets) => (
        <IonButton onClick={e=> {
          console.log("Save Clicked");
          console.log("assetId", assetId);
          
          context.assets ? 
          context.assets.push(
            {latitude: latitude,
            longitude: longitude,
            inspection_time :  Date.now().toString(),
            assetType: assetType,
            assetIdText: assetId,
            serialNumberText: serialNumber,
            serialNumberPhoto: null,
            company: company}
          ) :
          context.assets = [
            {latitude: latitude,
            longitude: longitude,
            inspection_time :  Date.now().toString(),
            assetType: assetType,
            assetIdText: assetId,
            serialNumberText: serialNumber,
            serialNumberPhoto: null,
            company: company}
          ];


          console.log(context.assets);
        }//Close onClick method

        
        }>Save</IonButton>
        )}
          </AssetsContextConsumer>

        </IonContent>
      // </IonPage >
    );
  };
}
export default NewAssetComponent;