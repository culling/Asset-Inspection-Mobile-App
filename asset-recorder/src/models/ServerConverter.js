class ServerConverter{
    
    convert = (sqlJson) => {
        return {
            latitude: sqlJson.latitude,
            longitude: sqlJson.longitude,
            assetIdText: sqlJson.asset_id_text,
            serialNumberText: sqlJson.serial_number_text,
            inspection_time: sqlJson.inspection_time,
            assetType: sqlJson.asset_type
        };
    };

}

export default ServerConverter;