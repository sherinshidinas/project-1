import React, { useContext, useState } from "react";
import "./Trending.css";
import { DataContext } from "../../../../context/DataContext";
import Popup from "../popup/Popup";
import { dispatchContext } from "../../../../context/AppProvider";
import { stateContext } from "../../../../context/AppProvider";
import axios from "axios";

function Trending() {
  const dispatch = useContext(dispatchContext);
  const AllBooks = useContext(DataContext);
  const [currentBook, setCurrentBook] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { token } = useContext(stateContext);

  const addToCartHandler = (item) => {
  
    console.log("Token:", token);
    console.log("items", item);
   
    // Send the authentication token in the request headers
    axios
      .post(
        `http://localhost:3001/add-to-cart/${item.id}`, 
       

        {
          headers: {
            "x-access-token": `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
       console.log("ithonn kaaanik",response.data)
        if (response.data.status) {
          console.log("ivde etthi", response.data.status);
          dispatch({
            type: "add to cart",
            payload: {
              title: item.volumeInfo.title,
              img: item.volumeInfo.imageLinks.smallThumbnail,
              author: item.volumeInfo.authors,
              price: item.saleInfo.retailPrice["amount"],
              language: item.volumeInfo.language,
              page: item.volumeInfo.pageCount,
              publishedDate: item.volumeInfo.publishedDate,
            },
          });
        } else {
          // Handle the error
          console.log("else Error adding to cart:", response.data.message);
        }
      })
      .catch((error) => {
        // Handle the request error
        console.error("Error adding to cart:", error);
      });
  };

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
    return (
      <div className="">
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
            className="btn btn-warning"
            //  onClick={()=>{dispatch({
            //   type:"add to cart",
            //   payload: {
            //     title: item.volumeInfo.title,
            //     img: item.volumeInfo.imageLinks.smallThumbnail,
            //     author:item.volumeInfo.authors,
            //     price: item.saleInfo.retailPrice["amount"],
            //     language: item.volumeInfo.language,
            //     page:  item.volumeInfo.pageCount,
            //     publishedDate: item.volumeInfo.publishedDate,

            //   }
            // });
            // }}
            onClick={() => {
              addToCartHandler(item);
            }}
          >
            Add to cart
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
