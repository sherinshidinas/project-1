import React, { useContext } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { stateContext } from "../../../context/AppProvider";
import "./AddtoCart.css";
import { Link } from "react-router-dom";

function AddtoCart() {
  const cartPackage = useContext(stateContext);
  console.log("cartPackage issss", cartPackage);

  const cartPackageRes = cartPackage.cartItems.map((item) => {
    return (
      <div className=" add-to-cart-items m-5 p-2 ">
        <img src={item.img} alt="" />

        <div className="details">
          <h4>
            <b>{item.title}</b>
          </h4>
          <h6>
            by: <b>{item.author}</b>
          </h6>
          <p>
            type: <b>{item.printtype}</b>
            <br />
            language: <b> {item.language}</b>
            <br />
            pages: <b>{item.page}</b>
            <br />
            published: <b>{item.publishedDate}</b>
          </p>
        </div>

        <div className="quantity">
          <button className="minus" aria-label="Decrease">
            −
          </button>
          <input
            type="number"
            className="input-box"
            defaultValue={1}
            min={1}
            max={10}
          />
          <button className="plus" aria-label="Increase">
            +
          </button>
        </div>

        <div className="price">
          <h3>
            <i class="fa-solid fa-indian-rupee-sign">
              <b>{item.price}</b>
            </i>
          </h3>
        </div>

        <div className="delete-button ">
          <button className="">
            {" "}
            <i class="fa-sharp fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    );
  });
     
  

  return (
    <div>
      <Header />

      <img
        src="https://bc-img.s3.ap-south-1.amazonaws.com/images/cover/first-coupon-cart-web-2.jpeg"
        className="cart-image w-100 d-block"
        alt=""
      />
      <div>
        {cartPackageRes}
        <h4 className=" subtotal d-flex justify-content-end">
          <b>Subtotal:</b>
        </h4>
      </div>
      <div className="cart-buttons d-flex m-5 ">
        <Link to="/home">
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
