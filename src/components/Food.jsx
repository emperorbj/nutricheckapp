import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext'

export default function Food(props){

    const[eatenquantity,setEatenQuantity] = useState(100)
    const[foodie,setFoodie] = useState({})

    const [foodInitial,setFoodInitial] = useState({})

    const loggedData = useContext(UserContext)



    useEffect(()=>{
        setFoodie(props.foodie)
        setFoodInitial(props.foodie)
    },[props.foodie])




    function trackFoodItem()
    {
        let trackedItem = {
            userID:loggedData.loggedUser.userid,
            foodID:foodie._id,
            details:{
                protein:foodie.protein,
                carbohydrates:foodie.carbohydrates,
                fat:foodie.fat,
                fiber:foodie.fiber,
                calories:foodie.calories
            },
            quantity:eatenquantity
        }


        console.log(trackedItem);

        fetch("http://localhost:8000/track",{
            method:"POST",
            body:JSON.stringify(trackedItem),
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })


    }



    function calculateFoodGrams(e)
    {
        
        if(e.target.value!==0)
        {
            let quantity = Number(e.target.value);
            setEatenQuantity(quantity)
            let copyFood= {...foodie}

                copyFood.protein = (foodInitial.protein*quantity)/100
                copyFood.carbohydrates = (copyFood.carbohydrates*quantity)/100
                copyFood.fat = (copyFood.fat*quantity)/100
                copyFood.fiber = (copyFood.fiber*quantity)/100

                setFoodie(copyFood)
        }

        
    }

    return(

    <div className="food">

        <div className="food-img">
            <img className='food-image' src={foodie.image} alt="" />
        </div>

        <h3>{foodie.name}({foodie.calories}cal for {eatenquantity})g</h3>

        <div className="nutrient">
            <p className="nutrient-name">protein</p>
            <p className="nutrient-value">{foodie.protein}g</p>
        </div>

        <div className="nutrient">
            <p className="nutrient-name">carbs</p>
            <p className="nutrient-value">{foodie.carbohydrates}g</p>
        </div>

        <div className="nutrient">
            <p className="nutrient-name">fibres</p>
            <p className="nutrient-value">{foodie.fiber}g</p>
        </div>

        <div className="nutrient">
            <p className="nutrient-name">fats</p>
            <p className="nutrient-value">{foodie.fat}g</p>
        </div>

        <div className="track-control">
            <input type="number" className="track-input" onChange={calculateFoodGrams} placeholder="Quantity in grams" />

            <button className="btn" onClick={trackFoodItem}>Track</button>
        </div>

    </div>

    )
}

// Define prop types for Food component
Food.propTypes = {
        foodie: PropTypes.shape({
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fiber: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
    }).isRequired
};