import NavBar from '../NavBar/NavBar'
import './Error.css'
export default function Error() {
    return(
        <>
        <NavBar/>
        <div className="error vh-100 d-flex justify-content-center align-items-center">
            <h2 className='text-danger'>Error 404 Page Not Found</h2>
        </div>
        </>
    )
}