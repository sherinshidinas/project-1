import React, { useContext } from "react";
import "./Popup.css";
import { DataContext } from "../DataContext";

function Popup({ currentBook , closePopup }) {
  const AllBooks = useContext(DataContext);

  let BookDetails = AllBooks.filter((item) => {
  
  
    return item.id === currentBook
          

  }).map((item) => {
    return (
      <div className="popup-content-data">
        <div className="popup-header">
          <img src={item.volumeInfo.imageLinks.smallThumbnail} alt="" />
          {/* {console.log("img checking",item.volumeInfo.imageLinks.smallThumbnail)} */}
        </div>

        <div className="popup-middle">
          <h3 className="">{item.volumeInfo.title}</h3>
          <h6>
            category:{item.volumeInfo.categories} , author:{item.volumeInfo.authors}
          </h6>
        </div>

        <p>{item.volumeInfo.description}</p>

        <ul className="dish-ingredients d-flex mr-5 ">
          <li>language:{item.volumeInfo.language}</li>
          <li>page:{item.volumeInfo.pageCount}</li>
          <li>publisher:{item.volumeInfo.publisher}</li>
          <li>launch:{item.volumeInfo.publishedDate}</li>
        </ul>

        <h3 className=" pricetag mt-4">
          {" "}
         <i className="fa-solid fa-indian-rupee-sign"></i>
          {item.saleInfo.retailPrice["amount"]}
        </h3>

        <button>Buy Now</button>

        <h5 className="popup-close" onClick={closePopup}>
            <i className=" icon fa-solid fa-xmark" />
          </h5>
      </div>
       
    );
   
  });
  return (
    <div className="popup">
      <div className="popup-content">{BookDetails}</div>
    </div>
  );
}

export default Popup;


