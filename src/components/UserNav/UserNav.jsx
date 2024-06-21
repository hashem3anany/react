import { Link } from "react-router-dom"
import "./UserNav.css"
import log from "../../images/log2.png"


export default function UserNav() {  
    
    return(
        <div className='nav-section'>
            <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse justify-content-between navbar-collapse"  id="navbarSupportedContent">
                    <div className="log text-center w-25">
                        <img src={log} alt="" />
                        <span className="ms-2">Medico</span>
                    </div>
                    <ul className="nav w-25 justify-content-center nav-underline">
                        <li className="nav-item  mx-3 ">
                            <Link className="nav-link  text-decoration-none text-dark"  aria-current="page" to="/UserHome">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link text-decoration-none text-dark" to={"/Contact"}>Contact</Link>
                        </li>
                    </ul>
                    <div className="userlogo text-center w-25">
                    <Link to="/chat"><i className="fa-regular text-black fa-xl fa-comment"></i></Link>
                     <Link id="xx" to={localStorage.getItem("userType") === "D" ? "/Ddoctor" : localStorage.getItem("userType") === "U" ? "/UserProfile" :"/Dnurse" }><i className="fa-solid fa-user fa-xl ms-5 text-danger"></i></Link>
                    </div>
                </div>
            </nav>
        </div>
    )
    
}