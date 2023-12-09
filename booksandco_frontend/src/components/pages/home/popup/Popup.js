import React, { useContext } from "react";
import "./Popup.css";
import { DataContext } from "../../../../context/DataContext";

function Popup({ currentBook, closePopup }) {
  const AllBooks = useContext(DataContext);

  let BookDetails = AllBooks.filter((item) => {
    return item.id === currentBook;
  }).map((item) => {
    return (
      <div className="popup-content-data container position-relative">
        <div className="row">
          <div className="col-md-4">
            <div className="popup-header">
              <img
                src={item.volumeInfo.imageLinks.smallThumbnail}
                alt=""
                className="img-fluid"
              />
            </div>
          </div>

          <div className="col-md-8">
            <div className="popup-middle">
              <h3 className="">{item.volumeInfo.title}</h3>
              <h6>
                Category: {item.volumeInfo.categories}, Author:{" "}
                {item.volumeInfo.authors}
              </h6>
            </div>

            <p>{item.volumeInfo.description}</p>

            <ul className="dish-ingredients">
              <li>Language: {item.volumeInfo.language}</li>
              <li>Page: {item.volumeInfo.pageCount}</li>
              <li>Publisher: {item.volumeInfo.publisher}</li>
              <li>Launch: {item.volumeInfo.publishedDate}</li>
            </ul>

            <h3 className="pricetag">
              <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
              {item.saleInfo.retailPrice["amount"]}
            </h3>

            <button className="btn btn-primary ">Buy Now</button>

            <h5
              className="popup-close position-absolute top-0 end-0"
              onClick={closePopup}
            >
              <i className="icon fa-solid fa-xmark" />
            </h5>
          </div>
        </div>
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
