import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useEffect } from "react"



export default function TrackDiet()
{

    const loggedData = useContext(UserContext)

    const [items,setItems] = useState([])

    useEffect(()=>{

        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userid}/03-28-2024`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            // console.log(loggedData.loggedUser)
            // setItems(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])



    return(

        <section className="container"> 

        </section>


    )
}
