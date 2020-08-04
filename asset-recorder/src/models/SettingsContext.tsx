import React, { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';

export interface Settings {
    company: string;
    defaultAssetType: string;
}


const { Storage } = Plugins;

export async function saveSettings(settings: Settings) {
    await Storage.set({
        key: 'settings',
        value: JSON.stringify(settings)
    });
}


let SettingsContext = createContext({} as Settings);
const defaultSettings = {
    company: "Acme Inc. 2"
}


let SettingsContextProvider = SettingsContext.Provider;


// let SettingsContextProvider = ( children : React.ReactNode, settings : Settings ) => {
//     const [currentSettings, setCurrentSettings] = useState(settings || defaultSettings);

//     const saveSettings = (values: Settings) => {
//         setCurrentSettings(values);
//         // return values;
//     }

//     useEffect(() => {
//         Promise.resolve(Storage.get({ key: 'settings' }).then(
//             (result) => {
//                 if (typeof result.value === 'string') {
//                     setCurrentSettings(JSON.parse(result.value) as Settings);
//                 }
//             },
//             (reason) => console.log("Failed to load settings from storage because of: " + reason)
//         ));
//     }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

//     return (
//         <SettingsContext.Provider
//             value={{ company: currentSettings.company, defaultAssetType : currentSettings.defaultAssetType }}
//         >

//         </SettingsContext.Provider>
//     )
// }

let SettingsContextConsumer = SettingsContext.Consumer;

export { SettingsContext, SettingsContextProvider, SettingsContextConsumer };