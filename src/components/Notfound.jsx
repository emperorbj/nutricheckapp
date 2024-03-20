import { Link } from "react-router-dom";

export default function Notfound()
{
    return(
        <div className="container">
            <h1>404 PAGE NOT FOUND</h1>

            <p><Link to="/register">Please register here</Link></p>
        </div>
    )
}