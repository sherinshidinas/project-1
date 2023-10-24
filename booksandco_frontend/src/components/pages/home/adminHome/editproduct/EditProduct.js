import React, { useEffect, useState, useContext } from "react";
import AdminHeader from "../../../header/adminHeader/AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { DataContext } from "../../../../context/DataContext";

function EditProduct() {
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
  const param = useParams();
  const AllBookss = useContext(DataContext);

  
  
  console.log("edit books us", AllBookss);


//   const getBook = () => {
//     const bookData = AllBookss.find((book) => book.id === param.id);
//     if (bookData) {
//       setId(bookData.id);
//       setTitle(bookData.volumeInfo.title);
//       setAuthors(bookData.volumeInfo.authors)
//             setPublisher(bookData.volumeInfo.publisher)
//             setPublishedDate(bookData.volumeInfo.publishedDate)
//             setDescription(bookData.volumeInfo.description)
//             setPageCount(bookData.volumeInfo.pageCount)
//             setCategory(bookData.volumeInfo.categories)
//             setLanguage(bookData.volumeInfo.language)
//             setAmount(bookData.saleInfo.retailPrice["amount"])
//             setSmallThumbnail(bookData.volumeInfo.imageLinks.smallThumbnail)
//     }
//   };

  const getBook = async () => {
    const result = await axios.get(
      "http://localhost:3001/get-product/" + param.id
    );
    const bookData = result.data.book;

    if (bookData) {
     setId(bookData.id)
      setTitle(bookData.volumeInfo.title)
      setAuthors(bookData.volumeInfo.authors)
      setPublisher(bookData.volumeInfo.publisher)
      setPublishedDate(bookData.volumeInfo.publishedDate)
      setDescription(bookData.volumeInfo.description)
      setPageCount(bookData.volumeInfo.pageCount)
      setCategory(bookData.volumeInfo.categories)
      setLanguage(bookData.volumeInfo.language)
      setAmount(bookData.saleInfo.retailPrice["amount"])
      setSmallThumbnail(bookData.volumeInfo.imageLinks.smallThumbnail)
     
    }
  };

  useEffect(() => {
   getBook()
   
    
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedBook = {
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

   

    const result = await axios.post(
      "http://localhost:3001/update-product/",
      updatedBook
    );

   

    alert(result.data.message);

    navigate("/admin");
  };
 
  return (
    <div>
      <AdminHeader />

      <section>
        <div className="container mt-4 ">
          <div className="form-page col-md-6 p-5  ">
            <h2 className="text-center">Update Your Book</h2>
            <form
              action="/admin/update-product"
              encType="multipart/form-data"
              className=""
            >
              <div className="form-group">
                <label htmlFor="">Id</label>
                <input
                  type="text"
                  //   name="bookId"
                  value={id}
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
                  //   name="title"
                  value={title}
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
                  //   name="authors"
                  value={authors}
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
                  //   name="publisher"
                  value={publisher}
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
                  //   name="publishedDate"
                  value={publishedDate}
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
                  //   name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="">Page Count</label>
                <input
                  type="number"
                  //   name="pageCount"
                  value={pageCount}
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
                  //   name="category"
                  value={category}
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
                  //   name="language"
                  value={language}
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
                  value={amount}
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
                  //   name="image"
                  value={smallThumbnail}
                  className="form-control"
                  onChange={(e) => {
                    setSmallThumbnail(e.target.value);
                  }}
                />
              </div>

              <div className="form-group d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-success mt-4 d-flex"
                  onClick={(e) => {
                    handleUpdate(e);
                  }}
                >
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

export default EditProduct;
