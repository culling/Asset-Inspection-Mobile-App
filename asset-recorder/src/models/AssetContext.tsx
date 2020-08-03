import { createContext } from 'react';

export interface Asset {
    latitude: string;
    longitude: string;
    time : string;
    assetType?: string;
    assetIdText: string;
    assetIdNewAsset?: any;
    serialNumberText: string;
    serialNumberPhoto?: any;
    company?: string;
}

export interface Assets {
    assets : Asset[];
}

let AssetsContext = createContext({} as Assets);

let AssetsContextProvider = AssetsContext.Provider;

let AssetsContextConsumer = AssetsContext.Consumer;

export { AssetsContext, AssetsContextProvider, AssetsContextConsumer };