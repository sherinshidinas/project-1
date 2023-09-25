const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dataservice = require("./dataservice");
const fileUpload = require("express-fileupload");

app.use(fileUpload());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());




const appMiddleWare = (req, res, next) => {
  try {
    
   const token = req.headers["x-access-token"];
   console.log("headers",req.params.productId)
    console.log("middleware token",token)
     if(!token  || !token.startsWith("Bearer ")){
      throw new console.error("Authorization header missing or invalid");
     }
   const result = jwt.verify(token, "secretsuperkey123");
    console.log("result token",result)
    // req.number = result.currentUserPassword;
    req.username=result.currentUser;
    console.log("creating Token",result);
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

app.post("/add-product", (request, response) => {
  console.log("user logged")
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

app.delete("/delete-product/:id", (req, res) => {
  dataservice.deleteBook(req.params.id).then((result) => {
    res.status(result.statusCode).send(result);
  });
});

app.get("/get-product/:id", (req, res) => {
  
  dataservice.getProduct(req.params.id).then((result) => {
    console.log("result is ",result)
    res.status(result.statusCode).send(result);
  });
 
});

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
      console.log(result)
      res.status(result.statusCode).send(result);
      
    });
    
});

app.post("/add-to-cart/:productId", appMiddleWare, async (req, res) => {
 
  const productId = req.params.productId;
 
  console.log("Received request to add product with productId:", productId);

  // Call the add-to-cart function to add the product to the cart
  try {
    const result = await dataservice.addToCart(productId, req.username);
    console.log("Received request to add product with productId:", result);
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


// app.post("/add-to-cart/:productId",appMiddleWare,(req,res)=>{
 
    
//     const productId= req.params.productId
//     console.log("Received request to add product with productId:", productId);
 
//     //call the add-to-cart function to add the product to the cart
//     dataservice.addToCart(productId,req.username).then((result)=>{
//       console.log("Received request to add product with productId:", result);
//       res.status(result.statusCode).send(result)
//     })
// })

// Get the user's cart
app.get("/get-cart",appMiddleWare,(req,res)=>{
// Call the getCart function to fetch the user's cart
dataservice.getCart(req.currentUser).then((result)=>{
 
  res.status(result.statusCode).send(result)
})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
