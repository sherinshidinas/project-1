import React, { useEffect, useState, useContext } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { dispatchContext } from "../../context/AppProvider";
import axios from "axios";

function Header() {
  const dispatch = useContext(dispatchContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  console.log("search query", searchQuery);
  console.log("search results", searchResults);

  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const myStyles = {
   height:'20px',
   width:'20px'
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUserName");
    if (storedUser) {
      setCurrentUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/login");
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3001/search?query=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Clear the authToken and mark the user as not authenticated
    dispatch({ type: "logout" });
    // Remove the authToken from localStorage
    localStorage.removeItem("token");
    setCurrentUser(""); //reset the current when use logout
    localStorage.removeItem("currentUserName");
    navigate("/login");
  };
  return (
    <>
      <header className=" header fixed-top">
        {/* starting first navbar */}
        <div className=" first-nav ">
          <nav className=" container-fluid d-flex text-white justify-content-between w-100 align-items-center  ">
            <div>
              <p id="toll-free" className=" my-auto align-items-center">
                Toll free:+91 8590440089 | Email:customercare@booksandco.net
              </p>
            </div>

            <div className="first-nav-lists d-flex align-items-center gap-5 ">
              <Link to="/home">Home</Link>
              <a href="#featured">Featured</a>
              <a href="#arrivals">Arrivals</a>
              <a href="#blogs">Blogs</a>
            </div>
          </nav>
        </div>
        {/* ending firstnavbar */}

        {/* second navbar starts */}

        <nav className="navbar bg-white  navbar-expand-lg navbar-light p-4">
          <img src="/bco.png" alt="" className="logo-image" />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent "
          >
            <ul className="navbar-nav mr-5">
              <form className="form-inline  d-flex" onSubmit={handleSearch}>
                <input
                  className="search-box"
                  type="search"
                  placeholder="What are you looking for?"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button className=" my-auto m-1 " type="submit" id="search">
                  <i className="fa-solid fa-magnifying-glass tex-muted"></i>
                </button>
              </form>

             
            </ul>

            {/* Display search results */}
              <div style={myStyles}>
                {searchResults.map((product) => (
                  <div key={product._id}>
                   <p>{product.volumeInfo.title}</p> 
                   <img  src={product.volumeInfo.imageLinks.smallThumbnail} alt="" />
                    </div>
                  
                ))}
              </div>

            <div className=" items d-flex gap-5 ">
              <a href="#" className=" text-muted icon ">
                <i className="fa-solid fa-heart"></i>
              </a>

              {isLoggedIn ? (
                <Link to="/cart" className="icon text-muted">
                  <i className="fa fa-fw fa-shopping-cart" />
                </Link>
              ) : (
                <Link to="/login" className="icon text-muted">
                  <i className="fa fa-fw fa-shopping-cart" />
                </Link>
              )}

              <li className="nav-item dropdown ">
                {isLoggedIn ? (
                  <Link
                    to="/"
                    className="icon text-muted   dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <i className="fa fa-fw fa-user" />
                    {currentUser}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="icon text-muted   "
                    id="navbarDropdown"
                    role="button"
                    // data-toggle="dropdown"
                    onClick={handleLogin}
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <i className="fa fa-fw fa-user" />
                    Login
                  </Link>
                )}

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" href="#action">
                    Orders
                  </Link>

                  {isLoggedIn ? (
                    <Link
                      to="/login"
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  ) : null}
                </div>
              </li>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
