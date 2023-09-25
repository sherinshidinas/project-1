import React, { useContext, useEffect, useState } from "react";
import "./ViewProduct.css";
import { DataContext } from "../../../../context/DataContext";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewProduct() {
  const Allbooks = useContext(DataContext);
  const [updatedBooks, setupdatedBooks] = useState([]);
  console.log("viewcart", Allbooks);

  useEffect(() => {
    // Fetch and set the initial list of products
    setupdatedBooks(Allbooks);
  }, [Allbooks]); // Update the state when Allbooks changes

  const handleDelete = async (id) => {
    const confirMessage = window.confirm("Are sure want to delete?");
    if (confirMessage) {
      const result = await axios.delete(
        "http://localhost:3001/delete-product/" + id
      );
      
      // If deletion is successful, update the state by filtering out the deleted product
      if (result.data.success) {
        setupdatedBooks((prevBooks) => {
          return prevBooks.filter((book) => {
            return book.id !== id;
          });
        });
      } else {
        console.log("state updation failed", updatedBooks);
      }

      alert(result.data.message);
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="add-book d-flex justify-content-end">
            <Link to="/admin/add-product" className="btn btn-success">
              Add Book <i class="fa-solid fa-book"></i>
            </Link>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Sl</th>
                <th scope="col">Id</th>
                <th scope="col">Image</th>
                <th scope="col">Book</th>
                <th scope="col">Category</th>
                <th scope="col">Author</th>
                {/* <th scope="col">Publish Date</th> */}

                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {updatedBooks
                .filter((item) => {
                  return item.id;
                })
                .map((product, index) => (
                  <tr key={product.id}>
                    <th scope="row">{index}</th>
                    <th scope="row">{product.id}</th>

                    <td className="thumb-img">
                      {product.volumeInfo.imageLinks?.smallThumbnail ? (
                        <img
                          src={product.volumeInfo.imageLinks.smallThumbnail}
                          alt=""
                        />
                      ) : (
                        <p className="text-danger">Image Not Available</p>
                      )}
                    </td>

                    <td>{product.volumeInfo.title}</td>

                    <td>
                      {product.volumeInfo.categories &&
                      product.volumeInfo.categories.length > 0 ? (
                        product.volumeInfo.categories
                      ) : (
                        <p className="text-danger">Category Not Available</p>
                      )}
                    </td>
                    <td>
                      {product.volumeInfo.authors &&
                      product.volumeInfo.authors.length > 0 ? (
                        product.volumeInfo.authors
                      ) : (
                        <p className="text-danger">Author Not Available</p>
                      )}
                    </td>

                    {/* <td>{product.volumeInfo.publishedDate}</td> */}

                    <td>
                      <p className=" price-tag ">
                        <i className="fa-solid fa-indian-rupee-sign">
                          {" "}
                          {product.saleInfo.retailPrice["amount"]}
                        </i>
                      </p>
                    </td>

                    <td>
                      <Link to={'/admin/update-product/'+ product.id}>
                      <i className=" admin-buttons fa-sharp fa-solid fa-edit"></i>
                      </Link>
                     
                    </td>

                    <td>
                      <i
                        className=" admin-buttons fa-sharp fa-solid fa-trash text-danger"
                        onClick={() => {
                          handleDelete(product.id);
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default ViewProduct;
