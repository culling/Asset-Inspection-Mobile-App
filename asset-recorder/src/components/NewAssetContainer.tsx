import React from 'react';
import './Default.css';

import {NewAssetComponent} from "./NewAssetComponent";

interface ContainerProps {
}

const NewAssetContainer: React.FC<ContainerProps> = ({}) => {
  return (
        <NewAssetComponent />
  );
};

export default NewAssetContainer;
