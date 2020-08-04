class ServerConverter{
    constructor(){

    }

    convert = (sqlJson) => {
        return {
            latitude: sqlJson.latitude,
            longitude: sqlJson.longitude,
            assetIdText: sqlJson.assetidtext,
            serialNumberText: sqlJson.serialnumbertext,
            inspection_time: sqlJson.inspection_time,
            assetType: sqlJson.assettype
        };
    };

}

export default ServerConverter;