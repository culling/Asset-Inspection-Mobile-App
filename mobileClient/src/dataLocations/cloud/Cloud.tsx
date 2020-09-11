import axios from 'axios';

import { Asset, Settings } from '../../types';
import { Local } from '..';

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

            axios.post(`${settings.serverUrl}/assets`, asset, {headers: {'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"}})
                .then((response: any) => {
                    console.log("Response: " + JSON.stringify(response));
                    countSaved++;
                    Local.saveAssets(assets);
                })
                .catch((e: any) => {
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
            let assets = res.data.map((assetSqlJson: any) => {return this.convert(assetSqlJson)});
            return (assets);
        });
    }

    /**
     * Conver results back from the server to the local Asset type
     * @param sqlJson is the SQL json for each row returned from the remote server
     */
    static convert (sqlJson: any){
        return {
            latitude: sqlJson.latitude,
            longitude: sqlJson.longitude,
            assetIdText: sqlJson.asset_id_text,
            serialNumberText: sqlJson.serial_number_text,
            inspection_time: sqlJson.inspection_time,
            assetType: sqlJson.asset_type,
            assetIdPhotoUrl: sqlJson.asset_id_photo_url,
            serialNumberPhotoUrl: sqlJson.serial_number_photo_url
        };
    };


}

export default Cloud;