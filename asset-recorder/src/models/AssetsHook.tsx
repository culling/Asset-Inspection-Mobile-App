// Assets Hook - src/hooks/useSettings
import {useContext} from "react";
import {AssetsContext} from "./AssetsContext";

export default () => {
   const context = useContext(AssetsContext);

   return context;
};