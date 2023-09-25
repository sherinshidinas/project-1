import React, { useContext, useState } from "react";
// import axios from "axios";
import "./Newreleased.css";
import { DataContext } from "../../../../context/DataContext";
import Popup from "../popup/Popup";

function Newreleased() {
  const AllBooks = useContext(DataContext);
  const [currentBook,setCurrentBook]=useState('')
  const [showPopup,setShowPopup]=useState(false)


  const showPopupHandler=(id)=>{
    setShowPopup(true)
    setCurrentBook(id)
   
  }

  const closePopup = ()=>{
    setShowPopup(false)
  }

  let newReleasedBooks = AllBooks.filter((item)=>{
    return item.id 
  }).map((item) => {
    return (
      <div>
        <li className="new-released-list m-3">
          <img
            src={item.volumeInfo.imageLinks.smallThumbnail}
            alt=""
            className="mb-2 m-2 "
            onClick={()=>{
              showPopupHandler(item.id)
            }}
          />
          {/* <h6>{item.volumeInfo.title}</h6> */}
          <p className="text-center">
           INR {item.saleInfo.retailPrice["amount"]}
          </p>
          <button className="btn btn-warning">Add to cart</button>
        </li>
      </div>
    );
  });

  return (
    
    <div className="card p-2">
      {showPopup && <Popup currentBook={currentBook} closePopup={closePopup}/>}
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
