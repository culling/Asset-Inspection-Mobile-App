import axios from 'axios';

import { Asset } from '../../types';
import { Settings } from '../../models/SettingsContext';
// import { saveLocal } from '../../models/AssetsContext';
import { Local } from './../';

class Cloud {
    /**
     * Upload to cloud
     * @param assets to upload to cloud
     * @param settings holding the server Url
     * @param callback function called when all assets have been saved or an error has been thrown
     */
    static async uploadToCloud(assets: Asset[], settings: Settings, callback?: any) {
        let countSaved = 0;
        while (assets.length > 0) {
            const asset = assets.pop();
            if (asset === undefined) {
                console.log("asset not ready to be uploaded\n", "asset is undefined");
                return;
            }

            console.log("Asset to be loaded to cloud:", asset);
            asset.assetIdPhoto = null;
            asset.assetIdPhotoUrl = null;
            asset.serialNumberPhoto = null;
            asset.serialNumberPhotoUrl = null;

            axios.post(`${settings.serverUrl}/assets`, asset)
                .then(response => {
                    console.log("Response: " + JSON.stringify(response));
                    countSaved++;
                    Local.saveAssets(assets);
                })
                .catch(e => {
                    assets.push(asset);
                    callback(e, countSaved);
                });

        }
        callback(null, countSaved);
    }



    /**
     * Get previous assets from server
     * @param server to pull previous assets from
     */
    static async getPreviousAssets(server: string) {
        const url = `${server}/assets`;
        return await axios.get(url).then((res: any) => {
            return (res.data);
        });
    }

}

export default Cloud;