import React, { useContext, useEffect, useState } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { stateContext } from "../../../context/AppProvider";
import "./AddtoCart.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteHandlerOfCartProductItems } from "../home/productremfromcartUtils";

function AddtoCart() {
  const { token } = useContext(stateContext);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  // const[isLoggedIn,setIsLoggedIn]=useState(true)
  // console.log("cartPackage issss", cartPackage);
  console.log("cartitemss", cartItems);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/get-cart`,
        {},
        {
          headers: {
            "x-access-token": `Bearer ${token}`,
          },
        }
      );

      console.log("response", response);
      setLoading(false);
      setCartItems(response.data.cart);
    } catch (error) {
      console.log("error while fetching cart items", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQuantityHandler = (productId, newQuantity) => {
    axios
      .put(
        `http://localhost:3001/update-cart-item-quantity/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            "x-access-token": `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status) {
          fetchData();
        } else {
          console.log("Error updating quantity:", response.data.message);
        }
      }).catch((err)=>{
        console.error("Error updating quantity:", err);
      })
  };

  

  // const deleteHandlerOfCartProductItems = (productId) => {
  //   const username = localStorage.getItem("currentUser");
  //   axios
  //     .delete(`http://localhost:3001/remove-product-from-cart/${productId}`, {
  //       headers: {
  //         "x-access-token": `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       alert(response.data.message);
  //       fetchData();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("An error occured while deleting the product from the cart");
  //     });
  // };

  const renderCartItems = () => {
    if (loading) {
      return <p>Loading cart...</p>;
    }

    if (cartItems.length === 0) {
      return <p>Your cart is empty</p>;
    } else {
      return cartItems.map((item) => {
        return (
          <div key={item.id} className=" add-to-cart-items m-5 p-2 ">
            <img src={item.image} alt="" />

            <div className="details">
              <h4>
                <b>{item.title}</b>
              </h4>
              <h6>
                by: <b>{item.authors}</b>
              </h6>
            </div>

            <div className="quantity">
              <button className="minus" 
              aria-label="Decrease"
              onClick={()=>{
                console.log("hii decreseeee")
                const newQuantity = Math.max(1,item.quantity -1)
                updateQuantityHandler(item.id, newQuantity);
              }}

              >
                −
              </button>
              <input
                type="number"
                className="input-box"
                value={item.quantity}
                min={1}
                max={10}
                onChange={(e)=>{
                  const newQuantity = Math.min(10,
                    Math.max(1,parseInt(e.target.value,10) || 1)
                    )
                    updateQuantityHandler(item.id, newQuantity);
                }}
              />
              <button className="plus"
               aria-label="Increase"
               onClick={()=>{
                console.log("helo")
                const newQuantity= Math.min(10, item.quantity + 1)
               updateQuantityHandler(item.id, newQuantity);
              }}
               >
                +
              </button>
            </div>

            <div className="price">
              <h3>
                <i className="fa-solid fa-indian-rupee-sign">
                  <b>{Math.floor(item.amount * item.quantity)}</b>
                </i>
              </h3>
            </div>

            <div className="delete-button ">
              <button
                className=""
                onClick={() => {
                  deleteHandlerOfCartProductItems(item.id,token,fetchData);
                }}
              >
                {" "}
                <i class="fa-sharp fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        );
      });
    }
  };

  const calculateSubTotal = () =>{
    return cartItems.reduce((total,item)=>{
      return Math.floor(total + item.amount * item.quantity)
      
    },0)
  }

  return (
    <div>
      <Header />

      <img
        src="https://bc-img.s3.ap-south-1.amazonaws.com/images/cover/first-coupon-cart-web-2.jpeg"
        className="cart-image w-100 d-block"
        alt=""
      />
      <div>{renderCartItems()}</div>
      <h4 className=" subtotal d-flex justify-content-end">
        <b>Subtotal:{calculateSubTotal()}</b>
      </h4>
      <div className="cart-buttons d-flex m-5 ">
        <Link to="/">
          <button className="btn btn-success ">Continue Shopping</button>
        </Link>
        <button className="btn btn-success ">Checkout</button>
      </div>
      <hr></hr>
      <Footer />
    </div>
  );
}

export default AddtoCart;
