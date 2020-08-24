import React, { createContext, useEffect, useState } from 'react';
import { Asset, Assets } from './../types';
import { Local } from './../data';

const initalAssets = [] as Asset[];

/**
 * Assets context
 */
let AssetsContext = createContext({} as Assets);

/**
 * Assets Context Provider
 * @param props are child react nodes that can access the context
 */
let AssetsContextProvider = (props: { children: React.ReactNode; }) => {
    const [assets, setAssets] = useState(initalAssets);

    useEffect(() => {
        Promise.resolve(
            Local.loadAssets(setAssets)
        );
    }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

    return (
        <AssetsContext.Provider value={{ assets: assets }}>
            {props.children}
        </AssetsContext.Provider>
    )
}



/**
 * Assets Context Consumer 
 * Can use the assets context provided by the provider
 */
let AssetsContextConsumer = AssetsContext.Consumer;

export { AssetsContext, AssetsContextProvider, AssetsContextConsumer };