import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register()
{
    // userDetails is state variable made up of an object that holds name,email,password and age
    const [userDetails,setUserDetails] = useState({
        name:"",
        email:"",
        password:"",
        age:""
    })



    const [message,setMessage] = useState({
        type:"invicible",
        text:""
    })


    // This function is responsible for fetching the values of each input field with their names and inserting them into the userDetails(alias prevState)
    // e.target.name fetches the name of the input while e.target.value fetches the typed value in that field
    function handleInputs(e)
    {
        setUserDetails((prevState)=>{

            return{...prevState,[e.target.name]:e.target.value}
        })
        // console.log(e.target.name,e.target.value)
    }




    function handleSubmit(e)
    {
        e.preventDefault()
        console.log(userDetails)

        fetch("http://localhost:8000/register",{
            method:"POST",
            body:JSON.stringify(userDetails),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=> response.json())
        .then((data)=>{
            setMessage({type:"success",text:data.message})

        // TO RESET INPUT FIELDS BACK TO BLANK AFTER SUCCESSFUL REGISTRATION
        setUserDetails({
            name:"",
            email:"",
            password:"",
            age:""
        })


        // TO MAKE SUCCESSFUL REGISTRATION POP UP DISAPPEAR AFTER 5 SECONDS

        setTimeout(()=>{
            setMessage({type:"invisible",text:"dummy"})
        },5000)

        })
        .catch((err)=>{
            console.log(err)
        })




    }





    return (
        <section className="form-content">

            <form className="form" onSubmit={handleSubmit}>

                <h1>Health check here</h1>
                {/* The onChange function means if anything changes in that input perform the equated function{handleInputs}
                The value ={userDetails.name} ensures the name input field is updated when the input is changed from any where */}
                <input className="inputs" required type="text" placeholder="enter name here" onChange={handleInputs} name="name" value={userDetails.name}/>

                <input className="inputs" required type="email" placeholder="enter email here" onChange={handleInputs} name="email" value={userDetails.email}/>

                <input className="inputs" required maxLength={8} type="password" placeholder="enter password here" onChange={handleInputs} name="password" value={userDetails.password}/>

                <input className="inputs" max={100} min={10} type="number" placeholder="enter age here" onChange={handleInputs} name="age" value={userDetails.age}/>

                <button className="btn" type="submit">Click to register</button>

                <p>Already registered? <Link to="/login">Login here</Link></p>

                <p className={message.type}>{message.text}</p>

            </form>

        </section>
    )
}