
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Allusers from "./pages/allusers";
import Contacts from "./pages/contacts";
import Regions from "./pages/regions";
import OrderDetail from "./pages/orders/OrderDetail";

import Allproducts from "./pages/products/allproducts";
import Addproduct from "./pages/products/addproduct";
import Allorders from "./pages/orders/Allorders";
import Singelorder from "./pages/orders/Singelorder";

import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { auth } from "./firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Editproduct from "./pages/products/editproduct";

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Login from "./pages/login";
import Blog from "./pages/blog";
function App() {
  const [user] = useAuthState(auth);
  if (!user) {
    return <Login />;
  } else {
    return (
      <>
        <div id="wrapper">
          <Header />
          <div id="content-wrapper" class="d-flex flex-column">
            <Navbar />
            <div id="content">
              <div class="container-fluid">
                <Routes>
                  <Route path="/Home" element={<Home />} />
                  <Route path="/Allusers" element={<Allusers />} />
                  <Route path="/Allproducts" element={<Allproducts />} />
                  <Route path="/Addproduct" element={<Addproduct />} />
                  <Route path="/editprooduct" element={<Editproduct />} />
                  <Route path="/Allorders" element={<Allorders />} />
                  <Route path="/Singelorder" element={<Singelorder />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/regions" element={<Regions/>} />

                  <Route path="/OrderDetail" element={<OrderDetail />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
