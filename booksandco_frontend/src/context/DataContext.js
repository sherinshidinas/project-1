import React, { useEffect, useState } from "react";
import Loader from "../components/pages/home/loader/Loader";
import axios from "axios";

export const DataContext = React.createContext();
export const AllData = (props) => {
  const [AllBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [trendingBooks, setTrendingBooks] = useState([])

  

  const getAllBooks = () => {
    setLoading(false);
    axios.get("http://localhost:3001/all-books").then((response) => {
      setAllBooks(response.data.result);
      // console.log("checking response",response.data.result)
    });    
  };
  
  useEffect(() => {
    getAllBooks();
    // getTrendingBooks()
  }, []);

  console.log("data context", AllBooks);

  return (
    <DataContext.Provider value={AllBooks}>
      {!loading ? props.children : <Loader />}
      {/* {props.children} */}
    </DataContext.Provider>
  );
};
