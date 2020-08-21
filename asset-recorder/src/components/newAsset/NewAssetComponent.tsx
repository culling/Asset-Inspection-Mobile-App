/* eslint-disable import/first */

import MapSection from '../map/Map' // import the map here

import { IonContent, IonImg, IonButton, IonText, IonInput, IonLabel } from '@ionic/react';

import React, { Component, useState } from 'react';
const INITIAL_STATE = {
  map: "",
  latitude: "",
  longitude: "",
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
  assetTypeChanged: false,
  settings: {}
};


import { Plugins, CameraResultType } from '@capacitor/core';
import { Assets, AssetsContextConsumer, Asset, saveAssets } from '../../models/AssetsContext';
import AssetIdPhoto from './AssetIdPhoto';
import SerialNumberPhoto from './SerialNumberPhoto';
const { Camera } = Plugins;

/**
 * Import the settings from higher up
 */
interface ContainerProps {
  settings: any;
}

const NewAssetComponent: React.FC<ContainerProps> = ({ settings }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, company: settings.company, assetType: settings.defaultAssetType, settings: settings });

  /**
   * Get the GPS location and set in state
   */
  const getGps = async () => {
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

      setState({
        ...state,
        latitude: crd.latitude,
        longitude: crd.longitude
      });
    }, (err: any) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }, options);
  }


  // /**
  //  * Take a picture of the asset id and set in state
  //  */
  // const takeAssetIdPicture = async () => {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.DataUrl
  //   });
  //   let imageUrl = (image.dataUrl != undefined) ? image.dataUrl : "";

  //   setState({
  //     ...state,
  //     showAssetIdPhoto: true,
  //     assetIdPhotoUrl: imageUrl
  //   });
  // }

  /**
   * Take a serial number picture and set in state
   */
  const takeSerialNumberPicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    let imageUrl = (image.dataUrl != undefined) ? image.dataUrl : "";

    setState({
      ...state,
      showSerialNumberPhoto: true,
      serialNumberPhotoUrl: imageUrl,
    });
  }

  /**
   * Render the component
   */
  return (
    <IonContent className="ion-padding">
      {/* // ------------- Location ----------------*/}
      <div className="location">
        {state.latitude !== "" && state.longitude !== "" &&
          <div>
            <IonText id="location">{state.latitude}, {state.longitude}</IonText>
            <MapSection location={{ lat: state.latitude, lng: state.longitude, text: "" }} zoomLevel={17} />
          </div>
        }
      </div>

      <IonButton color="primary" onClick={() => getGps()} expand="block">
        Update Location
        </IonButton>

      {/* // ------------- Asset ID Photo ----------------*/}
      <AssetIdPhoto state={state} setState={setState} />

      {/* // ------------- Serial Number ID Photo ----------------*/}
      <SerialNumberPhoto state={state} setState={setState} />


      {/* // ------------- Text Boxes ----------------*/}
      <div>
        <IonLabel>Asset Id</IonLabel>
        <IonInput id="assetId" value={state.assetId} placeholder="Asset Id" onIonChange={
          e => {
            setState({ ...state, assetId: (e.detail.value != undefined) ? e.detail.value : "undefinedAssetId" })
          }
        }></IonInput>
      </div>

      <div>
        <IonLabel>Serial Number</IonLabel>
        <IonInput id="serialNumber" value={state.serialNumber} placeholder="Serial number" onIonChange={
          e => {
            setState({ ...state, serialNumber: (e.detail.value != undefined) ? e.detail.value : "undefinedSerialNumber" })
          }
        }></IonInput>
      </div>

      <div>
        <div>
          <IonLabel>Asset Type</IonLabel>
          <IonInput id="assetType" value={(state.assetTypeChanged) ? state.assetType : settings.defaultAssetType} placeholder="Enter Asset Type" onIonChange={
            e => {
              // setState({ ...state, assetTypeChanged: true });
              setState({ ...state, assetTypeChanged: true, assetType: (e.detail.value != undefined) ? e.detail.value : settings.defaultAssetType });
            }
          }></IonInput>
        </div>

        <IonLabel>Company</IonLabel>
        <IonInput readonly={true} id="company" value={settings.company} placeholder="Company" onIonChange={
          e => { setState({ ...state, company: (e.detail.value != undefined) ? (e.detail.value) : settings.company }) }
        }></IonInput>
      </div>

      {/* // ------------- Buttons ----------------*/}
      <div>
        <AssetsContextConsumer>
          {(context: Assets) => (
            <IonButton onClick={e => {
              console.log("Save Clicked");
              console.log("assetId", state.assetId);
              const asset = {
                latitude: state.latitude,
                longitude: state.longitude,
                inspection_time: Date.now().toString(),
                assetType: state.assetType,
                assetIdText: state.assetId,
                assetIdPhoto: state.assetIdPhoto,
                assetIdPhotoUrl: state.assetIdPhotoUrl,
                serialNumberText: state.serialNumber,
                serialNumberPhoto: state.serialNumberPhoto,
                serialNumberPhotoUrl: state.serialNumberPhotoUrl,
                company: state.company
              } as Asset;

              context.assets ?
                context.assets.push(asset) :
                context.assets = [asset];

              saveAssets(context.assets);
              setState({ ...INITIAL_STATE });
              console.log(context.assets);
            }//Close onClick method


            } expand="block">Save</IonButton>
          )}
        </AssetsContextConsumer>
        <IonButton onClick={(e) => {
          console.log("clear clicked");
          setState({ ...INITIAL_STATE });
        }} expand="block">Clear</IonButton>

      </div>
    </IonContent >

  );
};

export default NewAssetComponent;
