import React from "react";
import {  logout } from "../firebase.config";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";

//import { Link } from "react-router-dom";
class Navbar extends React.Component {
  render() {
    return (
        <>
    
                <nav class=" navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                   
                    <ul class="navbar-nav ml-auto">

                        
                       

                        <div class="topbar-divider d-none d-sm-block"></div>

                       
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="1" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <button class="btn btn-light" onClick={logout} ><Link to='/' class="text-decoration-none">logout</Link></button>  
                            </a>
                          
                          
                        </li>

                    </ul>

                </nav>
            
            <Routes>
        <Route  path="/" element={<Login/>}/>
      </Routes>    
      </>
        );
        
    }
   
  }
  
  export default Navbar;