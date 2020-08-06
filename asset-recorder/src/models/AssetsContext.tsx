import React, { createContext, useEffect, useState } from 'react';
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

const initalAssets = [] as Asset[];

const { Storage } = Plugins;

export async function saveAssets(assets: Asset[]) {
    await Storage.set({
        key: 'assets',
        value: JSON.stringify(assets)
    });
}


export async function loadAssets() {

    Promise.resolve(Storage.get({ key: 'assets' }).then(
        (result) => {
            if (typeof result.value === 'string') {
                return(JSON.parse(result.value) as Asset[]);
            }
            else{
                return initalAssets;
            }
        },
        (reason) => console.log("Failed to load settings from storage because of: " + reason)
    ));
}



let AssetsContext = createContext({} as Assets);

// let AssetsContextProvider = AssetsContext.Provider;

let AssetsContextProvider = ( props: { children: React.ReactNode; }) => {
    const [assets, setAssets] = useState( initalAssets );

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
        <AssetsContext.Provider
            value={{assets: assets}}
        >{props.children}</AssetsContext.Provider>
    )
}

let AssetsContextConsumer = AssetsContext.Consumer;

export { AssetsContext, AssetsContextProvider, AssetsContextConsumer };