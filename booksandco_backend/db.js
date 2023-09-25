const mongoose = require("mongoose");

//string connection
mongoose.connect("mongodb://localhost:27017/booksandco_server", {
  useNewUrlParser: true,
});

//model defining
const User = mongoose.model("User", {
  username: String,
  email: String,
  phone: String,
  password: String,
  cart: []
});

const Book = mongoose.model("Book", {
 
  id: String,
  volumeInfo: {
    title: String,
    authors: [String],
    publisher: String,
    publishedDate: String,
    description: String,
    pageCount: Number,
    categories: [String],
    imageLinks: {
      smallThumbnail: String,
      
    },
    language: String,
  },
  saleInfo: {
    retailPrice: {
      amount: Number,
      
    },
  },
  
});

//exporting
module.exports = {
  User,
  Book,
};
