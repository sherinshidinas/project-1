import React, { useContext, useState } from "react";
// import axios from "axios";
import "./Newreleased.css";
import { DataContext } from "../../../../context/DataContext";
import Popup from "../popup/Popup";
import { dispatchContext } from "../../../../context/AppProvider";
import { stateContext } from "../../../../context/AppProvider";
import { addToCartHandler } from "../cartUtils";
import { addToCartButtonHandling } from "../cartButtonUtils";

function Newreleased() {
  const AllBooks = useContext(DataContext);
  const [currentBook, setCurrentBook] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { token } = useContext(stateContext);
  const dispatch = useContext(dispatchContext);

  const [buttonTexts, setButtonTexts] = useState(
    JSON.parse(localStorage.getItem("buttonTexts")) || {}
  );

  const addToCartHandlerNewReleased = (item) => {
    addToCartHandler(item, token, dispatch);
  };

  const showPopupHandler = (id) => {
    setShowPopup(true);
    setCurrentBook(id);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  let newReleasedBooks = AllBooks.filter((item) => {
    return item.id;
  }).map((item) => {
    const buttonText = buttonTexts[item.id] || "Add to Cart";
    const buttonClass = buttonText === "Added to Cart" ? "active" : "";
    return (
      <div>
        <li className="new-released-list m-3">
          <img
            src={item.volumeInfo.imageLinks.smallThumbnail}
            alt=""
            className="mb-2 m-2 "
            onClick={() => {
              showPopupHandler(item.id);
            }}
          />
          {/* <h6>{item.volumeInfo.title}</h6> */}
          <p className="text-center">
            INR {item.saleInfo.retailPrice["amount"]}
          </p>
          <button
            className={`btn btn-success ${buttonClass}`}
            onClick={() => {
              addToCartHandlerNewReleased(item);
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
    <div className="card p-2">
      {showPopup && <Popup currentBook={currentBook} closePopup={closePopup} />}
      <div className="p-3">
        <h2 className="text-center ">New Released</h2>
      </div>
      <div className="new-released-books">
        <ul className=" row-posters d-flex">{newReleasedBooks}</ul>
      </div>
    </div>
  );
}

export default Newreleased;
