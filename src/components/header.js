import React from "react";
import { Link } from "react-router-dom";
class Header extends React.Component {
  render() {
    
    return (
      <html  class="bg-gradient-primary"  >
        <ul
          class=" navbar-nav  sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a
            class="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div class="sidebar-brand-icon rotate-n-15">
              <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">
              KOJINA.TN<sup>2</sup>
            </div>
          </a>

          <hr class="sidebar-divider my-0" />

          <Link to="/Home" class="text-decoration-none">
            <li class="nav-item">
              <a class="nav-link ">
                <i class="fas fa-fw fa-home "></i>
                <span class="font-weight-bold mx-2" > Home</span>
              </a>
            </li>
          </Link>

          <hr class="sidebar-divider" />

          <Link to="/Allusers" class="text-decoration-none">
            <li class="nav-item">
              <a class="nav-link">
                <i class="fas fa-fw fa-user-alt"></i>
                <span class="font-weight-bold mx-2">Users</span>
              </a>
            </li>
          </Link>
          <hr class="sidebar-divider" />

          <Link to="/Allproducts" class="text-decoration-none">
            <li class="nav-item">
              <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span class="font-weight-bold mx-2">Products</span>
              </a>
            </li>
          </Link>

         

          <hr class="sidebar-divider" />
          <Link to="/Allorders" class="text-decoration-none">
            <li class="nav-item">
              <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span class="font-weight-bold mx-2">Orders</span>
              </a>
            </li>
          </Link>
          
          <hr class="sidebar-divider" />
          <Link to="/contacts" class="text-decoration-none">
            <li class="nav-item">
              <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span class="font-weight-bold mx-2">Contatcs</span>
              </a>
            </li>
          </Link>
          <hr class="sidebar-divider" />
          <Link to="/blog" class="text-decoration-none">
            <li class="nav-item">
              <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span class="font-weight-bold mx-2">blog</span>
              </a>
            </li>
          </Link>
          <Link to="/regions" class="text-decoration-none">
            <li class="nav-item">
              <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span class="font-weight-bold mx-2">Regions</span>
              </a>
            </li>
          </Link>






        </ul>
      </html>
    );
  }
}
export default Header;