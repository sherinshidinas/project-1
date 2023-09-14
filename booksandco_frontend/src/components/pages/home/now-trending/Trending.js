import React, { useContext, useEffect, useState } from "react";
import "./Trending.css";
import { DataContext } from "../DataContext";
import Popup from "../popup/Popup";
import { dispatchContext } from "../../../../context/AppProvider";

function Trending() {
  const dispatch=useContext(dispatchContext);
  const AllBooks = useContext(DataContext);
  const [currentBook,setCurrentBook]=useState('')
  const [showPopup,setShowPopup]=useState(false)
 
  console.log("Books All",AllBooks)

  const showPopupHandler=(id)=>{
    setShowPopup(true)
    setCurrentBook(id)
   
  }

  const closePopup = ()=>{
    setShowPopup(false)
  }

  let trendingBooks = AllBooks.filter((item) => {
    return item.saleInfo.saleability === "FOR_SALE";
  }).map((item) => {
    return (
      
      <div className="">
       
        <li className="list-items m-4 ">
          <img
            src={item.volumeInfo.imageLinks.smallThumbnail}
            alt=""
            className="mb-2 m-2 "
            onClick={()=>{
              showPopupHandler(item.id)
              // console.log("image checking",item.volumeInfo.imageLinks.smallThumbnail)
            }}
          />
          {/* <h6>{item.volumeInfo.title}</h6> */}
          <p>
            {item.saleInfo.retailPrice["currencyCode"]}{" "}
            {item.saleInfo.retailPrice["amount"]}
          </p>
          <button className="btn btn-warning" onClick={()=>{dispatch({
            type:"add to cart",
            payload: {
              title: item.volumeInfo.title,
              img: item.volumeInfo.imageLinks.smallThumbnail,
              author:item.volumeInfo.authors,
              price: item.saleInfo.retailPrice["amount"],
              language: item.volumeInfo.language,
              country: item.accessInfo.country,
              page:  item.volumeInfo.pageCount,
              publishedDate: item.volumeInfo.publishedDate,
              printtype: item.volumeInfo.printType

            }
          });
          }}>Add to cart</button>
        </li>
      </div>
    );
  });
   
  return (
    <section className="trending-books  ">
      <hr></hr>
     {showPopup && <Popup currentBook={currentBook} closePopup={closePopup}/>}
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
