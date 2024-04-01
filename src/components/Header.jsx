import { useContext } from "react"
import { UserContext } from "./contexts/UserContext"
import { useNavigate } from "react-router-dom"

export default function Header()
{
    const loggedData = useContext(UserContext)
    const navigate = useNavigate()

    function logout()
    {
        localStorage.removeItem('nutricheck-user')
        loggedData.setloggedUser(null)
        navigate('/login')
    }

    return(
        <div>

                <ul>
                    <li>Home</li>
                    <li className="btn" onClick={logout}>Logout</li>
                </ul>

        </div>
    )
}