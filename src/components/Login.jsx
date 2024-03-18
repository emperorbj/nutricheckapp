import { Link }  from "react-router-dom"

export default function Login()
{
    return (
        <section className="form-content">

            <form className="form">

                <h1>Nutricheck login</h1>

                <input className="inputs" type="email" placeholder="enter email here" name="user-email"/>

                <input className="inputs" type="password" placeholder="enter password here" name="user-password"/>


                <button className="btn" type="submit">Login</button>

                <p>Dont have an account? <Link to="/register"> Register here</Link></p>




            </form>

        </section>
    )
}