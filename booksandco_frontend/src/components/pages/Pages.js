import React from "react";
import Layout from "../Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Signin from "./signin/Signin";
import Login from './login/Login'
import AddtoCart from "./addtocart/AddtoCart";
import { AppProvider } from "../../context/AppProvider";
import AdminHome from './adminHome/AdminHome'
import AddProduct from "./adminHome/addproduct/AddProduct";



const Pages = () => {
  return (
    <>
      <BrowserRouter>
     
      <AppProvider>
     
      <Layout>
             <Routes>
               
               <Route path="/" element={<Home/>}/>
               <Route path="/cart" element={<AddtoCart/>}/>
               <Route path="/signin" element={<Signin/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/admin" element={<AdminHome/>}/>
               <Route path="/admin/add-product" element={<AddProduct/>}/>
               
              
             </Routes>
        </Layout>
      
      </AppProvider>
       
      </BrowserRouter>
    </>
  );
};

export default Pages;
