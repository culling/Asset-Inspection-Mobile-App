import React from 'react';
import '../Default.css';
import { IonImg, IonButton } from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/core';


interface ContainerProps {
    state: any;
    setState: any;
}

const SerialNumberPhoto: React.FC<ContainerProps> = (
    props: { state: any, setState: any }) => {

    /**
     * Take a picture of the serial number and set in state
     */
    const takeSerialNumberPicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl
        });
        let imageUrl = (image.dataUrl != undefined) ? image.dataUrl : "";

        props.setState({
            ...props.state,
            showSerialNumberPhoto: true,
            serialNumberPhotoUrl: imageUrl
        });
    }

    return (
        <>
            {/* // ------------- Serial Number Photo ----------------*/}
            <div className={props.state.serialNumberPhotoUrl === '' ? "serialNumberPhotoContainer" : "serialNumberPhotoContainer photoContainer"} >
                {/** Only show the photo and associated buttons if the photo url is not empty */}
                {
                    (props.state.serialNumberPhotoUrl !== '') &&
                    <div>

                        {(props.state.showSerialNumberPhoto) &&
                            <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={props.state.serialNumberPhotoUrl} ></IonImg>
                        }
                        <IonButton onClick={
                            e => props.setState({ ...props.state, showSerialNumberPhoto: !props.state.showSerialNumberPhoto })
                        } expand="block">
                            {props.state.showSerialNumberPhoto ?
                                <span>Hide Serial Number Photo</span> :
                                <span>Show Serial Number Photo</span>}
                        </IonButton>
                    </div>
                }
                <IonButton color="primary" onClick={() => {
                    takeSerialNumberPicture();
                    props.setState({ ...props.state, showSerialNumberPhoto: true });
                }} expand="block">
                    {(props.state.serialNumberPhotoUrl === '') ?
                        <span>Take Photo of Serial Number</span> :
                        <span>Update Photo of Serial Number </span>}
                </IonButton>

            </div >
        </>
    )
}

export default SerialNumberPhoto;
