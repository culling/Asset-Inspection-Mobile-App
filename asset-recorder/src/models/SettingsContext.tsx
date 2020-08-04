import { createContext } from 'react';

export interface Settings {
    company : string;
    defaultAssetType: string;
}

let SettingsContext = createContext({} as Settings);

let SettingsContextProvider = SettingsContext.Provider;

let SettingsContextConsumer = SettingsContext.Consumer;

export { SettingsContext, SettingsContextProvider, SettingsContextConsumer };