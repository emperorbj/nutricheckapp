import { useState,useContext } from "react"
import { Link,useNavigate }  from "react-router-dom"
import { UserContext } from "./contexts/UserContext"


export default function Login()
{

    const loggedData = useContext(UserContext)
    const navigate = useNavigate()

    const [userCredentials,setUserCredentials] = useState({
        email:"",
        password:""
    })




    const [message,setMessage] = useState({
        type:"invisible",
        text:""
    })



    function handleInputs(e)
    {
        setUserCredentials((prevState)=>{
            return{...prevState,[e.target.name]:e.target.value}

        })

        // console.log(userCredentials)
    }




    function handleSubmit(e)
    {
        e.preventDefault()
        // console.log(userCredentials)

        fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify(userCredentials),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{ 
            if(response.status===403)
            {
                setMessage({type:"error",text:"password invalid"})
            }
            else if(response.status===404)
            {
                setMessage({type:"error",text:"Email invalid"})
            }
            else if(response.status===200)
            {
                return response.json()
            }

            setTimeout(()=>{
                setMessage({type:"invisible",text:"dummy"})
            },5000)
        })
        
        
        .then((data)=>{

            if(data.token!==undefined)
            {
                
                setMessage({type:"success", text:data.message})

                localStorage.setItem("nutricheck-user",JSON.stringify(data))


                loggedData.setloggedUser(data)

            
    
                setUserCredentials({
                    email:"",
                    password:""
                })
    
    
                setTimeout(()=>{
                    setMessage({type:"invisible",text:"dummy"})
                    // when there a successful login then in 1 second the page is redircted to the 
                    // track component
                    navigate('/track')
                },1000)
            }


        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return (
        <section className="form-content">

            <form className="form" onSubmit={handleSubmit}>

                <h1>Nutricheck login</h1>

                <input className="inputs" required type="email" placeholder="enter email here" name="email" onChange={handleInputs} value={userCredentials.email}/>

                <input className="inputs" required maxLength={8} type="password" placeholder="enter password here" name="password" onChange={handleInputs} value={userCredentials.password}/>

                <button className="btn" type="submit">Login</button>

                <p>Dont have an account? <Link to="/register"> Register here</Link></p>
                <p className={message.type}>{message.text}</p>




            </form>

        </section>
    )
}