import React, { createContext, useEffect, useState } from 'react';
import { Plugins } from '@capacitor/core';
import axios from 'axios';
import { Settings } from './SettingsContext';


export interface Asset {
    latitude: string;
    longitude: string;
    inspection_time: string;
    assetType?: string;
    assetIdText: string;
    assetIdPhoto?: any;
    assetIdPhotoUrl?: any;
    serialNumberText: string;
    serialNumberPhoto?: any;
    serialNumberPhotoUrl?: any;
    company?: string;
}

export interface Assets {
    assets: Asset[];
}

const initalAssets = [] as Asset[];

const { Storage } = Plugins;

export async function getPreviousAssets(server: string) {
    const url = `${server}/assets`;
    return await axios.get(url).then((res: any) => {
        return (res.data);
    });
}


export async function saveAssets(assets: Asset[]) {
    await Storage.set({
        key: 'assets',
        value: JSON.stringify(assets)
    });
}

export async function uploadToCloud(assets: Asset[], settings: Settings, callback?: any) {
    let countSaved = 0;
    while (assets.length > 0) {
        const asset = assets.pop();
        if (asset === undefined) {
            console.log("asset not ready to be uploaded\n", "asset is undefined");
            return;
        }
        
        console.log("Asset to be loaded to cloud:", asset);
        asset.assetIdPhoto      = null;
        asset.assetIdPhotoUrl   = null;
        asset.serialNumberPhoto = null;
        asset.serialNumberPhotoUrl =  null;

        axios.post(`${settings.serverUrl}/assets`, asset)
            .then(response => {
                console.log("Response: " + JSON.stringify(response));
                countSaved++;
                saveAssets(assets);
            })
            .catch(e => {
                assets.push(asset);
                callback(e, countSaved);
            });

    }
    callback(null, countSaved);
}

let AssetsContext = createContext({} as Assets);

let AssetsContextProvider = (props: { children: React.ReactNode; }) => {
    const [assets, setAssets] = useState(initalAssets);

    useEffect(() => {
        Promise.resolve(Storage.get({ key: 'assets' }).then(
            (result) => {
                if (typeof result.value === 'string') {
                    setAssets(JSON.parse(result.value) as Asset[]);
                }
            },
            (reason) => console.log("Failed to load settings from storage because of: " + reason)
        ));
    }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

    return (
        <AssetsContext.Provider value={{ assets: assets }}>
            {props.children}
        </AssetsContext.Provider>
    )
}

let AssetsContextConsumer = AssetsContext.Consumer;

export { AssetsContext, AssetsContextProvider, AssetsContextConsumer };