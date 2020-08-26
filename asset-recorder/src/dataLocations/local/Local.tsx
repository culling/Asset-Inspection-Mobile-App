import { Asset, Settings } from '../../types';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

class Local {
    /**
     * Save assets
     * @param assets to save
     */
    static async saveAssets(assets: Asset[]) {
        await Storage.set({
            key: 'assets',
            value: JSON.stringify(assets)
        });
    }

    /** 
     * Load Assets
     * @param callback is called with the loaded assets
     */
    static async loadAssets(callback: any) {
        Storage.get({ key: 'assets' }).then(
            (result) => {
                if (typeof result.value === 'string') {
                    callback(JSON.parse(result.value))
                }
            },
            (reason) => console.log("Failed to load settings from storage because of: " + reason)
        )
    }

    /**
     * Load settings
     * @param callback is called with the loaded settings
     */
    static async loadSettings(callback: any) {
        Storage.get({ key: 'settings' }).then(
            (result) => {
                if (typeof result.value === 'string') {
                    // setCurrentSettings(JSON.parse(result.value) as Settings);
                    callback(JSON.parse(result.value));
                }
            },
            (reason) => console.log("Failed to load settings from storage because of: " + reason)
        )
    }
    /**
     * Save settings
     * @param settings to save
     */
    static async saveSettings(settings: Settings) {
        await Storage.set({
            key: 'settings',
            value: JSON.stringify(settings)
        });
    }


}

export default Local;