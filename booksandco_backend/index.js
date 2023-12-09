const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dataservice = require("./dataservice");
// const fileUpload = require("express-fileupload");

// app.use(fileUpload());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const appMiddleWare = (req, res, next) => {
  try {
    const authHeader = req.body.headers["x-access-token"];
    // console.log("headers", req.params.id);
    // console.log("token", token);
    if (!token || !token.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or invalid");
    } 
    const token = authHeader.split(' ')[1]
    const result = jwt.verify(token,'secretsuperkey123')
    // const email = result.currentUser
    // const token = authHeader.split(" ")[1];
    // const result = jwt.verify(token, "secretsuperkey123");
    console.log("result token", result);
    // req.number = result.currentUserPassword;
    req.username = result.currentUser;
    console.log("creating Token", result);
    next();
  } catch {
    res.status(400).json({
      status: false,
      message: "Invalid User... Please Login",
      statusCode: 400,
    });
  }
};



//signin API

app.post("/signin", (req, res) => {
  console.log(req.body.password + "from signin index");
  const result = dataservice.signin(
    req.body.username,
    req.body.email,
    req.body.phone,
    req.body.password
  );

  result.then((resObj) => {
    res.status(resObj.statusCode).send(resObj);
  });
});

//login API

app.post("/login", (request, response) => {
  const result = dataservice.login(request.body.email, request.body.password);
  result.then((resObj) => {
    response.status(resObj.statusCode).send(resObj);
  });
});



//get all books
app.get("/all-books", (request, response) => {
  dataservice.AllBooks().then((res) => {
    response.status(res.statusCode).send(res);
  });
});


// Add the following endpoint to index.js

// Search products endpoint
app.get("/search", async (req, res) => {
  const query = req.query.query;

  try {
    const result = await dataservice.searchProducts(query);
    res.status(result.statusCode).send(result);
  } catch (error) {
    console.error("Error in /search endpoint:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred during search",
      statusCode: 500,
    });
  }
});


//admin side add product
app.post("/add-product", (request, response) => {
  console.log("user logged");
  dataservice
    .AddBook(
      request.body.id,
      request.body.title,
      request.body.authors,
      request.body.publisher,
      request.body.publishedDate,
      request.body.description,
      request.body.pageCount,
      request.body.category,
      request.body.language,
      request.body.amount,
      request.body.smallThumbnail
    )
    .then((result) => {
      response.status(result.statusCode).json(result);
    });
});

//admin side to delete the product
app.delete("/delete-product/:id", (req, res) => {
  dataservice.deleteBook(req.params.id).then((result) => {
    res.status(result.statusCode).send(result);
  });
});


//admin side to get the product
app.get("/get-product/:id", (req, res) => {
  dataservice.getProduct(req.params.id).then((result) => {
    console.log("result is ", result);
    res.status(result.statusCode).send(result);
  });
});

//admin side to update the product
app.post("/update-product", (req, res) => {
  dataservice
    .updateBook(
      req.body.id,
      req.body.title,
      req.body.authors,
      req.body.publisher,
      req.body.publishedDate,
      req.body.description,
      req.body.pageCount,
      req.body.category,
      req.body.language,
      req.body.amount,
      req.body.smallThumbnail
    )
    .then((result) => {
      console.log(result);
      res.status(result.statusCode).send(result);
    });
});


//adding product to the cart
app.post("/adding-product-to-cart/:id", async (req, res) => {
  const id = req.params.id;
  // console.log("trending req ",req.headers["x-access-token"])
  const token = req.headers["x-access-token"].split(' ')[1]
  const decodedToken = jwt.verify(token,'secretsuperkey123')
  const email = decodedToken.currentUser
  console.log(token,'beartereajsfljas')
  console.log("Received request to add product with productId:", id);

  // Call the add-to-cart function to add the product to the cart
  try {
    const result = await dataservice.addingProductToCart(id,email);
    console.log("Received request to add product with id:", result);
    res.status(result.statusCode).send(result);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred while adding the product to the cart",
      statusCode: 500,
    });
  }
});


// to get the cart product
app.post("/get-cart", (req, res) => {
  
  
  const token = req.headers["x-access-token"].split(' ')[1]
  const decodedToken = jwt.verify(token,'secretsuperkey123')
  const email = decodedToken.currentUser
 
  // Call the getCart function to fetch the user's cart
  dataservice.getCart(email).then((result) => {
    res.status(result.statusCode).send(result);
    console.log("success rendering cart",result.statusCode)
  });
});


//to delete the cart product
app.delete("/remove-product-from-cart/:id", async (req,res) => {
  id=req.params.id
  
  const token = req.headers["x-access-token"].split(' ')[1]
  const decodedToken = jwt.verify(token,'secretsuperkey123')
  const email = decodedToken.currentUser
  // console.log("decoded token",decodedToken)
  console.log("email iss",email)
  console.log("Received request to delete product with productId:", id);
  try {
    const result= await dataservice.removeItemFromCart(id,email)
    res.status(result.statusCode).send(result)
    console.log(result)
    
    
  } catch (error) {
    console.error(" catch  Error deleting product from cart:", error);
    res.status(500).json({
      status: false,
      message: " catch   An error occurred while deleting the product from the cart",
      statusCode: 500,
    });
    
  }

  

})

app.put("/update-cart-item-quantity/:id",async(req,res) => {
const id = req.params.id
const { quantity} = req.body
const token = req.headers["x-access-token"].split(' ')[1]
const decodedToken = jwt.verify(token,'secretsuperkey123')
const email = decodedToken.currentUser

try {
  const result= await dataservice.updateQuantityHandler(id,quantity,email)
  res.status(result.statusCode).send(result)
  
  
} catch (error) {
  console.error("Error updating quantity:", error);
  res.status(500).json({
    status: false,
    message: "An error occurred while updating quantity",
    statusCode: 500,
  });
  
}
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
