import { Navigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";


export default function Private(props) 
{
    const loggedData = useContext(UserContext);
    return(
        //IF THE USER'S DETAILS ARE IN THE LOCAL STORAGE THEN TAKE USER TO THE CHILD COMPONENT {TRACK}
        // ELSE TAKE USER BACK TO LOGIN
        loggedData.loggedUser!==null?
        <props.Component/>
        :
        <Navigate to="/login"/>
    )
}