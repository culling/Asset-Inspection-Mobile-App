import React, {useState, useEffect, useRef} from 'react';
import '../Default.css';
import { IonList, IonContent } from '@ionic/react';
import AssetListItem from '../assetListItem/AssetListItem';
import axios from 'axios';

import ServerConverter from "./../../models/ServerConverter";

interface ContainerProps {
  name: string;
}

const PreviousSessionsContainer: React.FC<ContainerProps> = ({ name }) => {
  const [previousAssets, setPreviousAssets] = useState([]);


  let isRendered = useRef(false);

  
  const getPreviousAssets = () =>{
    console.log("previousAssets.map: ", previousAssets.map);
    const url= "https://assetrecorder-postgress-1.herokuapp.com/assets";
    axios.get(url).then((res) => {
        if (!isRendered.current){
          console.log(res.data);
          setPreviousAssets(res.data);
        }
    });
  }


  useEffect(() => {
    getPreviousAssets();
    return () => {
      isRendered.current = true;
    };
  }, []);

  function convertFromServer(serverJson : any){
    let serverConverter = new ServerConverter();
    return serverConverter.convert(serverJson);
  }

  return (
    <IonContent>
      <IonList inset={true}>
        {Array.isArray(previousAssets) && previousAssets.map((previousAsset) => {
          return convertFromServer(previousAsset);
        }).map( (previousAsset, i) => <AssetListItem asset={previousAsset} key={i} deletable={false}/>
        )}
      </IonList>
    </IonContent>
  );
};

export default PreviousSessionsContainer;
