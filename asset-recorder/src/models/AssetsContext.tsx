import { createContext } from 'react';
import { Plugins } from '@capacitor/core';

export interface Asset {
    latitude: string;
    longitude: string;
    inspection_time : string;
    assetType?: string;
    assetIdText: string;
    assetIdPhoto?: any;
    assetIdPhotoUrl?: any;
    serialNumberText: string;
    serialNumberPhoto?: any;
    serialNumberPhotoUrl?: string;
    company?: string;
}

export interface Assets {
    assets : Asset[];
}


const { Storage } = Plugins;

export async function saveAssets(assets: Assets) {
    await Storage.set({
        key: 'assets',
        value: JSON.stringify(assets)
    });
}


let AssetsContext = createContext({} as Assets);

let AssetsContextProvider = AssetsContext.Provider;

let AssetsContextConsumer = AssetsContext.Consumer;

export { AssetsContext, AssetsContextProvider, AssetsContextConsumer };