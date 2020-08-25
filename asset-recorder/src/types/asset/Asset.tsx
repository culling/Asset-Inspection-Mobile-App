
/**
 * Asset interface for TypeScript
 */
export interface Asset {
    latitude: string;
    longitude: string;
    inspection_time: string;
    assetType?: string;
    assetIdText: string;
    assetIdPhoto?: any;
    assetIdPhotoUrl?: any;
    serialNumberText: string;
    serialNumberPhoto?: any;
    serialNumberPhotoUrl?: any;
    company?: string;
}

export interface Assets {
    assets: Asset[];
}