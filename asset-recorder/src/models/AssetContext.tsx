import { createContext } from 'react';

export interface Asset {
    location: string;
    time : string;
    assetType?: string;
    assetIdText: string;
    assetIdPhoto?: any;
    serialNumberText: string;
    serialNumberPhoto?: any;
}

export interface Assets {
    Assets : Asset[];
}

let AssetsContext = createContext({} as Assets);

let AssetsContextProvider = AssetsContext.Provider;

let AssetsContextConsumer = AssetsContext.Consumer;

export { AssetsContext, AssetsContextProvider, AssetsContextConsumer };