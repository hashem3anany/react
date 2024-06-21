import { Link } from 'react-router-dom'
import './NavBar.css'
export default function NavBar() {
    return(
        <div className='nav-section'>
            <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse justify-content-center navbar-collapse"  id="navbarSupportedContent">
                    <ul className="nav justify-content-center nav-underline">
                        <li className="nav-item  mx-3 ">
                            <Link className="nav-link  text-decoration-none text-dark"  aria-current="page" to="/Home">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link text-decoration-none text-dark" to={"/Contact"}>Contact</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link text-decoration-none text-dark" to={"/Login"}>Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        
    )
    
}