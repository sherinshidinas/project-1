import React, { useState } from "react";
import "./AddProduct.css";
import AdminHeader from "../../../header/adminHeader/AdminHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

function AddProduct() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishedDate, setPublishedDate] = useState(0);
  const [description, setDescription] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [amount, setAmount] = useState(0);
  const [smallThumbnail, setSmallThumbnail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setId(uuidv4().slice(0, 4));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const books = {
      id,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      category,
      language,
      amount,
      smallThumbnail,
    };
    if (
      id &&
      title &&
      authors &&
      publisher &&
      publishedDate &&
      description &&
      pageCount &&
      category &&
      language &&
      amount &&
      smallThumbnail
    ) {
      axios
        .post("http://localhost:3001/add-product", books)
        .then((response) => {
          alert(response.data.message);
          navigate("/admin");
          // Handle the response data as needed
        })
        .catch((error) => {
          console.error("An error occurred while making the request:", error);
          alert("An error occurred. Please check the console for details.");
        });
    } else {
      alert("Invalid Input");
    }
  };
  return (
    <div>
      <AdminHeader />
      <section>
        <div className="container mt-4 ">
          <div className="form-page col-md-6 p-5  ">
            <h2 className="text-center">Add Book</h2>
            <form
              action="/admin/add-product"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className=""
            >
              <div className="form-group">
                <label htmlFor="">Id</label>
                <input
                  type="text"
                  name="id"
                  className="form-control"
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Author</label>
                <input
                  type="text"
                  name="authors"
                  className="form-control"
                  onChange={(e) => {
                    setAuthors(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Publisher</label>
                <input
                  type="text"
                  name="publisher"
                  className="form-control"
                  onChange={(e) => {
                    setPublisher(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Published Date</label>
                <input
                  type="text"
                  name="publishedDate"
                  className="form-control"
                  onChange={(e) => {
                    setPublishedDate(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="">Page Count</label>
                <input
                  type="number"
                  name="pageCount"
                  className="form-control"
                  onChange={(e) => {
                    setPageCount(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Language</label>
                <input
                  type="text"
                  name="language"
                  className="form-control"
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Image</label>
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  onChange={(e) => {
                    setSmallThumbnail(e.target.value);
                  }}
                />
              </div>

              {/* <div class="form-group mt-3">
                <label for="exampleFormControlFile1"></label>
                <input
                  type="file"
                  className="form-control-file"
                  name="smallThumbnail"
                  id="exampleFormControlFile1"
                  onChange={(e)=>{setSmallThumbnail(e.target.value)}}
                />
              </div> */}

              <div className="form-group d-flex justify-content-end">
                <button type="submit" className="btn btn-success mt-4 d-flex">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddProduct;
