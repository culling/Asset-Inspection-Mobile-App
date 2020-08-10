/* eslint-disable import/first */

import MapSection from '../map/Map' // import the map here

import { IonContent, IonImg, IonButton, IonText, IonInput, IonLabel } from '@ionic/react';

import React, { Component, useState } from 'react';
const INITIAL_STATE = {
  map: null,
  latitude: null,
  longitude: null,
  showAssetIdPhoto: true,
  assetIdPhotoUrl: "",
  assetIdPhoto: "",
  assetId: "",
  showSerialNumberPhoto: true,
  serialNumberPhotoUrl: "",
  serialNumberPhoto: "",
  serialNumber: "",
  assetType: "",
  company: "",
  assetTypeChanged: false
};


import { Plugins, CameraResultType } from '@capacitor/core';
import { Assets, AssetsContextConsumer, Asset, saveAssets } from '../../models/AssetsContext';
import { SettingsContextConsumer, Settings } from '../../models/SettingsContext';
const { Camera } = Plugins;





export class NewAssetComponent extends Component {
  state: any = { ...INITIAL_STATE };

  async getGps() {
    // const supported = 'mediaDevices' in navigator;
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
      assetIdPhotoUrl: imageUrl
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
      serialNumberPhotoUrl: imageUrl
    })
  }


  render() {
    const { latitude,
      longitude,
      assetIdPhotoUrl,
      assetId,
      serialNumberPhotoUrl,
      serialNumber,
      company,
      assetType,
      assetTypeChanged,
      showAssetIdPhoto,
      showSerialNumberPhoto
    } = this.state;
    // let [assetTypeChanged, setAssetTypeChanged] = useState(false);


    return (


      <IonContent className="ion-padding">

        <div className="location">
          {latitude !== null && longitude !== null &&
            <div>
              <IonText id="location">{latitude}, {longitude}</IonText>
              <MapSection location={{ lat: latitude, lng: longitude, text: "" }} zoomLevel={17} />
            </div>
          }

        </div>
        <IonButton color="primary" onClick={() => this.getGps()} expand="block">
          Update Location
        </IonButton>

        <div className={assetIdPhotoUrl == '' ?  "serialNumberPhotoContainer": "serialNumberPhotoContainer photoContainer" }>
          {(assetIdPhotoUrl !== '') && showAssetIdPhoto &&
            <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={assetIdPhotoUrl} ></IonImg>
          }
          {(assetIdPhotoUrl !== '') &&
            <IonButton onClick={
              e => this.setState({ showAssetIdPhoto: !showAssetIdPhoto })
            } expand="block">
              {showAssetIdPhoto ?
                <span>Hide Asset Id Photo</span> :
                <span>Show Asset Id Photo</span>}
            </IonButton>
          }

          <IonButton color="primary" onClick={() => {
            this.takeAssetIdPicture();
            this.setState({ showAssetIdPhoto: true });
          }} expand="block">
            {(assetIdPhotoUrl == '') ?
              <span>Take Photo of assetID</span> :
              <span>Update Photo of assetID </span>}
          </IonButton>

        </div>

        <div className={serialNumberPhotoUrl == '' ? "serialNumberPhotoContainer" : "serialNumberPhotoContainer photoContainer" }>
          {(serialNumberPhotoUrl !== '') && (showSerialNumberPhoto) &&
            <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={serialNumberPhotoUrl} ></IonImg>
          }
          {(serialNumberPhotoUrl !== '') &&
            <IonButton onClick={
              e => this.setState({ showSerialNumberPhoto: !showSerialNumberPhoto })
            } expand="block">
              {showSerialNumberPhoto ?
                <span>Hide Serial Number Photo</span> :
                <span>Show Serial Number Photo</span>}
            </IonButton>
          }
          <IonButton color="primary" onClick={() => {
            this.takeSerialNumberPicture();
            this.setState({ showSerialNumberPhoto: true });
          }} expand="block">
            {(serialNumberPhotoUrl === '') ?
              <span>Take Photo of serial number</span> :
              <span>Update Photo of serial number</span>}
          </IonButton>


        </div>

        <div>
          <IonLabel>Asset Id</IonLabel>
          <IonInput id="assetId" value={assetId} placeholder="Asset Id" onIonChange={
            e => { this.setState({ assetId: e.detail.value }) }
          }></IonInput>
        </div>

        <div>
          <IonLabel>Serial Number</IonLabel>
          <IonInput id="serialNumber" value={serialNumber} placeholder="Serial number" onIonChange={
            e => { this.setState({ serialNumber: e.detail.value }) }
          }></IonInput>
        </div>

        <SettingsContextConsumer>
          {(context: Settings) => (<div>
            <div>
              <IonLabel>Asset Type</IonLabel>
              <IonInput id="assetType" value={(assetTypeChanged) ? assetType : context.defaultAssetType} placeholder="Enter Asset Type" onIonChange={
                e => {
                  this.setState({ assetTypeChanged: true })
                  this.setState({ assetType: e.detail.value })
                }
              }></IonInput>
            </div>

            <IonLabel>Company</IonLabel>
            <IonInput readonly={true} id="company" value={context.company} placeholder="Company" onIonChange={
              e => { this.setState({ company: e.detail.value }) }
            }></IonInput>
          </div>
          )}
        </SettingsContextConsumer>
        <div>
          <AssetsContextConsumer>
            {(context: Assets) => (
              <IonButton onClick={e => {
                console.log("Save Clicked");
                console.log("assetId", assetId);
                const asset = {
                  latitude: latitude,
                  longitude: longitude,
                  inspection_time: Date.now().toString(),
                  assetType: assetType,
                  assetIdText: assetId,
                  assetIdPhoto: null,
                  assetIdPhotoUrl: assetIdPhotoUrl,
                  serialNumberText: serialNumber,
                  serialNumberPhoto: null,
                  serialNumberPhotoUrl: serialNumberPhotoUrl,
                  company: company
                } as Asset;

                context.assets ?
                  context.assets.push(asset) :
                  context.assets = [asset];

                saveAssets(context.assets);
                this.setState({ ...INITIAL_STATE });
                console.log(context.assets);
              }//Close onClick method


              } expand="block">Save</IonButton>
            )}
          </AssetsContextConsumer>
          <IonButton onClick={(e) => {
            console.log("clear clicked");
            this.setState({ ...INITIAL_STATE });
          }} expand="block">Clear</IonButton>

        </div>
      </IonContent>
      // </IonPage >
    );
  };
}
export default NewAssetComponent;