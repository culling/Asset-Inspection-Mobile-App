import React from 'react';
import './../Default.css';

import NewAssetComponent from "./NewAssetComponent";

interface ContainerProps {
  settings: any;
}

const NewAssetContainer: React.FC<ContainerProps> = ({settings}) => {
  return (
        <NewAssetComponent settings={settings} />
  );
};

export default NewAssetContainer;
