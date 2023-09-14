import React, { useContext } from "react";
import "./ViewProduct.css";
import { DataContext } from "../../home/DataContext";
import { Link } from "react-router-dom";

function ViewProduct() {
  const Allbooks = useContext(DataContext);
  console.log("viewcart", Allbooks);
  // let products = [
  //   {
  //     id: 1,
  //     name: "Sherin Shidinas",
  //     age: 23,
  //     Role: "Software Engineer",
  //   },

  //   {
  //     id: 2,
  //     name: "Suhana e",
  //     age: 23,
  //     Role: "Medical Proffessor",
  //   },

  //   {
  //     id: 3,
  //     name: "Ramees",
  //     age: 25,
  //     Role: "Accountant",
  //   },

  //   {
  //     id: 4,
  //     name: "Niyas",
  //     age: 22,
  //     Role: "Entrepreneur",
  //   },
  // ];

  return (
    <>
      <section>
        <div className="container">
          <div className="add-book d-flex justify-content-end">
        <Link to='/admin/add-product' className="btn btn-success">
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
                <th scope="col">Publish Date</th>
               
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {Allbooks.map((product, index) => (
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
                    {product.volumeInfo.categories ? (
                      product.volumeInfo.categories
                    ) : (
                      <p className="text-danger">Category Not Available</p>
                    )}
                  </td>
                  <td>
                    {product.volumeInfo.authors ? (
                      product.volumeInfo.authors
                    ) : (
                      <p className="text-danger">Author Not Available</p>
                    )}
                  </td>
                  <td>{product.volumeInfo.publishedDate}</td>

                  

                  <td>
                    {product.saleInfo.saleability === "FOR_SALE" ? (
                    <p className=" price-tag mt-4"> 
                    <i className="fa-solid fa-indian-rupee-sign"> {product.saleInfo.retailPrice["amount"]}</i>
                   </p>
                    ):(
                      <p className="text-danger">Not For Sale</p>
                    )}
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
