const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dataservice = require ('./dataservice');



app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  app.use(express.json());

  const appMiddleWare = (req,res,next) => {
    try{
      token = req.headers["x-access-token"];
      result = jwt.verify(token,"secretsuperkey123");
      req.number = result.currentUserPassword;
      console.log(result);
      next();

    } catch{
      res.status(400).json({
        status: false,
        message: "Invalid User... Please Login",
        statusCode: 400,
      });
    }

  };

  //signin API

  app.post('/signin',(req,res)=>{

    console.log(req.body.username + "from signin index" )
    const result = dataservice.signin(
        req.body.username,
        req.body.email,
        req.body.phone,
        req.body.password
    );

    result.then(resObj=>{
        res.status(resObj.statusCode).send(resObj)
    });
  });

  //login API

  app.post('/login', (request,response)=>{
    const result = dataservice.login(request.body.email, request.body.password);
    result.then((resObj)=>{
      response.status(resObj.statusCode).send(resObj);
    });
  });

  //get all books
  app.get('/all-books',(request,response)=>{
    dataservice.AllBooks()
    .then((res)=>{
      response.status(res.statusCode).send(res)
      
    })
  })


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });


