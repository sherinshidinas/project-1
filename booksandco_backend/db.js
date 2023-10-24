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
  cart:[
    {
      id:String,
      quantity: {
        type: Number,
        default: 1, // You can set a default quantity if needed
      },
      image: String, // Add other details if needed
      title: String,
      authors: [String],
      amount: Number,
    },
  ]
  // cart: [{
  //   id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Book"
  //   },
  //   quantity: {
  //     type: Number,
  //     default: 1  // You can set a default quantity if needed
  //   }
  // }]
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
