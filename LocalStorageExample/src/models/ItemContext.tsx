import React, { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';


export interface Item {
    description : string;
}

export interface Items {
    items : Item[];
}


const { Storage } = Plugins;

export async function saveItems(ms : Item[]) {
    await Storage.set({
        key: 'items',
        value: JSON.stringify(ms)
    });
}

let ItemsContext = createContext({} as Items);

// let ItemsContextProvider = ItemsContext.Provider;

// function ItemsContextProvider(props: { children: React.ReactNode; }) {
    
//     const [initialItems, setInitialItems] = useState([] as Item[]);

//     useEffect(() => {
//         Promise.resolve(Storage.get({key: 'Items'}).then(
//             (result: { value: string; }) => {
//                 if (typeof result.value === 'string') {
//                     setInitialItems(JSON.parse(result.value) as Item[]);
//                 }
//             },
//             (reason: string) => console.log("Failed to load Items from storage because of: " + reason)
//         ));
//     }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

//     return (
//         <ItemsContext.Provider value={{Items : initialItems}}>{props.children}</ItemsContext.Provider>
//     )
// }


function ItemsContextProvider(props: { children: React.ReactNode; }) {
    
    const [initialItems, setInitialItems] = useState([] as Item[]);
    
    useEffect(() => {
        console.log("useEffect: Triggered");
        Promise.resolve(Storage.get({key: 'items'}).then(
            (result) => {
                console.log("Result: :", result);
                if (typeof result.value === 'string') {
                    // console.log(JSON.parse(result.value));
                    setInitialItems(JSON.parse(result.value) as Item[]);
                }
            },
            (reason) => console.log("Failed to load Items from storage because of: " + reason)
        ));
    }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

    return (
        <ItemsContext.Provider value={{items : initialItems}}>{props.children}</ItemsContext.Provider>
    )
}


let ItemsContextConsumer = ItemsContext.Consumer;

export { ItemsContext, ItemsContextProvider, ItemsContextConsumer };