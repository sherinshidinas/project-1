import React, { useContext,useState } from "react";
import Layout from "../Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Signin from "./signin/Signin";
import Login from "./login/Login";
import AddtoCart from "./addtocart/AddtoCart";
import { AppProvider } from "../../context/AppProvider";
import AdminHome from "./adminHome/AdminHome";
import AddProduct from "./adminHome/addproduct/AddProduct";
import EditProduct from "./adminHome/editproduct/EditProduct";
import { stateContext } from "../../context/AppProvider";
import { AllData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const Pages = () => {
  
  
  
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Layout>
            <AllData>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<AddtoCart />} />
               
                <Route path="/signin" element={<Signin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/add-product" element={<AddProduct />} />

                <Route
                  path="/admin/update-product/:id"
                  element={<EditProduct />}
                />
              </Routes>
            </AllData>
          </Layout>
        </AppProvider>
      </BrowserRouter>
    </>
  );
};

export default Pages;
