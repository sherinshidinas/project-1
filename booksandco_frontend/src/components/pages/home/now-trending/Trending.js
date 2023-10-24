import React, { useContext, useEffect, useState } from "react";
import "./Trending.css";
import { DataContext } from "../../../../context/DataContext";
import Popup from "../popup/Popup";
import { dispatchContext } from "../../../../context/AppProvider";
import { stateContext } from "../../../../context/AppProvider";
import { addToCartHandler } from "../cartUtils";
import { addToCartButtonHandling } from "../cartButtonUtils";

function Trending() {
  const dispatch = useContext(dispatchContext);
  const AllBooks = useContext(DataContext);
  const [currentBook, setCurrentBook] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { token } = useContext(stateContext);

  const [buttonTexts, setButtonTexts] = useState(
    JSON.parse(localStorage.getItem("buttonTexts")) || {}
  );

  const addToCartHandlerTrending = (item) => {
    addToCartHandler(item, token, dispatch);
    // ---------------
   
    // ----------------
   
  };

  useEffect(() => {
    // Load buttonTexts from localStorage on component mount
    const storedButtonTexts =
      JSON.parse(localStorage.getItem("buttonTexts")) || {};
    setButtonTexts(storedButtonTexts);
  }, []);
  console.log("Books All", AllBooks);

  const showPopupHandler = (id) => {
    setShowPopup(true);
    setCurrentBook(id);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  let trendingBooks = AllBooks.filter((item) => {
    return item.id;
  }).map((item) => {
    const buttonText = buttonTexts[item.id] || "Add to Cart";
    const buttonClass = buttonText === "Added to Cart" ? "active" : "";
    return (
      <div key={item.id} className="">
        <li className="list-items m-4 ">
          <img
            src={item.volumeInfo.imageLinks.smallThumbnail}
            alt=""
            className="mb-2 m-2 "
            onClick={() => {
              showPopupHandler(item.id);
              // console.log("image checking",item.volumeInfo.imageLinks.smallThumbnail)
            }}
          />
          {/* <h6>{item.volumeInfo.title}</h6> */}
          <p>INR {item.saleInfo.retailPrice["amount"]}</p>
          <button
            className={`btn btn-success ${buttonClass}`}
            onClick={() => {
              addToCartHandlerTrending(item);
              addToCartButtonHandling(item, buttonTexts, setButtonTexts);
            }}
          >
            {buttonText}
          </button>
        </li>
      </div>
    );
  });

  return (
    <section className="trending-books  ">
      <hr></hr>
      {showPopup && <Popup currentBook={currentBook} closePopup={closePopup} />}
      <div className="container">
        <div className="trending-books-content text-center p-2">
          <h2>Now Trending</h2>
        </div>

        <div className=" trending-books-list mt-2 col-sm-20">
          <ul className="d-flex flex-wrap   ">{trendingBooks}</ul>
        </div>
      </div>
      <hr></hr>
    </section>
  );
}

export default Trending;
