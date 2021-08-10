import React ,{useEffect , useContext , useState } from 'react'
import { Link } from 'react-router-dom'

import AuthStore from './../context/Auth/AuthStore'


export default function NavBar() {

    const { userDetailes , isTokenValid , Logout , Token  } = useContext(AuthStore)
    const [token , setToken ] =useState(localStorage.getItem('token'))
   
    

    const clearToken=()=>{
        setToken('');
        Logout();
    }


    useEffect(()=>{
        // check if token is valid
       isTokenValid(Token)
       console.log(userDetailes); 
       

    },[Token])



    return (

        <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Hello {Token? userDetailes.fullName: null } </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                    </button>

                    <div className="d-flex">
                            {Token?
                              <Link className="nav-link active" onClick={()=>{ clearToken(); }}  to="/login">Logout</Link>
                              :
                            <>
                                <Link className="nav-link active"  to="/login">Login</Link>
                           
                                <Link className="nav-link" to="/register">Register</Link>
                            </>
                        }
                            
                           
                        </div>
                </div>
                </nav>

        </div>
    )
}