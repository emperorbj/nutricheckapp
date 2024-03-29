import { useContext, useEffect, useState } from "react"
import { UserContext } from "./contexts/UserContext"
import Food from "./Food"


export default function Track()

{
    const loggedData = useContext(UserContext)

    const [foodItems,setFoodItems] = useState([])
    
    const[food,setFood] = useState(null)

    function searchFood(e)
    {
        if(e.target.value!=="")

        {
            fetch(`http://localhost:8000/foods/${e.target.value}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${loggedData.loggedUser.token}`
                }
            })
            .then((response)=> response.json())
            .then((data)=>{
                if(data.message===undefined)
                {
                    setFoodItems(data)
                }
                else
                {
                    setFoodItems([])
                }
                
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        else
        {
            setFoodItems([])
        }



    }




useEffect(()=>{
    console.log(food)
})

    return(
        <>
        <section className="track-container">

            <div className="search">

                    <input className="search-input" onChange={searchFood}
                    type="search" placeholder="Search Food Item"/>

                    {
                        foodItems.length!==0?(
                            <div className="search-results">

                                {
                                    foodItems.map((item)=>{
                                        return (
                                            <p className="item" onClick={()=>{
                                                setFood(item);
                                            }} key={item._id}>{item.name}</p>
                                        )
                                    })
                                }

                            </div> 
                        ):null
                    }

            </div>
            {
                food!==null?(
                    <Food foodie = {food}/>
                )
                :null
            }
            


        </section>
        </>

    )
}



