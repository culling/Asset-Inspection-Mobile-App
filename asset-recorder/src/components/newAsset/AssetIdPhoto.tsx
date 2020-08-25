import React from 'react';
import '../Default.css';
import { IonImg, IonButton } from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/core';


interface ContainerProps {
    state: any;
    setState: any;
}



const AssetIdPhoto: React.FC<ContainerProps> = (
    props: { state: any, setState: any }) => {

    /**
     * Take a picture of the asset id and set in state
     */
    const takeAssetIdPicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl
        });
        let imageUrl = (image.dataUrl != undefined) ? image.dataUrl : "";


        props.setState({
            ...props.state,
            showAssetIdPhoto: true,
            assetIdPhotoUrl: imageUrl
        });
    }

    return (
        <>
            {/* // ------------- Asset ID Photo ----------------*/}
            <div className={props.state.assetIdPhotoUrl === '' ? "assetIdPhotoContainer" : "assetIdPhotoContainer photoContainer"} >
                {/** Only show the photo and associated buttons if the photo url is not empty */}
                {
                    (props.state.assetIdPhotoUrl !== '') &&
                    <div>

                        {(props.state.showAssetIdPhoto) &&
                            <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={props.state.assetIdPhotoUrl} ></IonImg>
                        }
                        <IonButton onClick={
                            e => props.setState({ ...props.state, showAssetIdPhoto: !props.state.showAssetIdPhoto })
                        } expand="block">
                            {props.state.showAssetIdPhoto ?
                                <span>Hide Asset Id Photo</span> :
                                <span>Show Asset Id Photo</span>}
                        </IonButton>
                    </div>
                }
                <IonButton color="primary" onClick={() => {
                    takeAssetIdPicture();
                    props.setState({ ...props.state, showAssetIdPhoto: true });
                }} expand="block">
                    {(props.state.assetIdPhotoUrl === '') ?
                        <span>Take Photo of assetID</span> :
                        <span>Update Photo of assetID </span>}
                </IonButton>

            </div >
        </>
    )
}

export default AssetIdPhoto;
