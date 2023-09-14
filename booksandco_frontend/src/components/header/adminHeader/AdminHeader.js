import React from "react";
import "./AdminHeader.css";
import { Link, useNavigate } from "react-router-dom";

function AdminHeader() {
  return (
    <div className="">
      <header className=" admin-header ">
        {/* starting first navbar */}
        <div className=" admin-first-nav p-2">
          <nav className=" container-fluid d-flex text-white justify-content-between w-100 align-items-center  ">
            <div>
              <h4 className="align-items-center">Admin Panel</h4>
            </div>
            <div className="d-flex">
              <p id="admin-toll-free" className=" my-auto align-items-center">
                Toll free:+91 8590440089 | Email:customercare@booksandco.net
              </p>
            </div>

            {/* <div className="first-nav-lists d-flex align-items-center gap-5 ">
              <Link to="/home">Home</Link>
               <a href="#featured">Featured</a>
               <a href="#arrivals">Arrivals</a>
                <a href="#blogs">Blogs</a>
                 </div> */}
          </nav>
        </div>
        {/* ending firstnavbar */}

        {/* second navbar starting */}

        <nav className="navbar navbar-expand-lg mt-3  navbar-light">
          <img src="/bco.png" alt="" className="admin-logo-image" />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <a className="nav-item nav-link active" href="#">
                All Products 
              </a>
              <a className="nav-item nav-link active" href="#">
                All Orders
              </a>
              <a className="nav-item nav-link active" href="#">
                All Users
              </a>
            </div>
          </div>

          <div className="admin-items m-3  ">
              <li className="nav-item dropdown ">
                <a
                  className="admin-icon text-muted dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  <i className="fa fa-fw fa-user" />
                  Admin
                </a>

                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown "
                >
                  <a className="dropdown-item">Logout</a>
                </div>
              </li>
            </div>
        </nav>
        <hr></hr>
      </header>
      
    </div>
    
  );
}

export default AdminHeader;
