const db = require("./db");
const jwt = require("jsonwebtoken");

const signin = (username, email, phone, password) => {
  return db.User.findOne({
    email: email,
  }).then((profile) => {
    if (profile) {
      console.log(profile + "from register server");
      return {
        status: false,
        message: "Account already exists!.....Please Login",
        statusCode: 405,
      };
    } else {
      let newUser = new db.User({
        username,
        email,
        phone,
        password,
      });
      newUser.save();

      return {
        status: true,
        message: "Registration Completed",
        statusCode: 202,
      };
    }
  });
};

// login
const login = (email, password) => {
  return db.User.findOne({
    email: email,
    password: password,
  }).then((profile) => {
    console.log(profile + "form login");

    if (profile) {
      currentUserName = profile.username;
      currentUser = profile.email;
      currentUserPassword = password;
      token = jwt.sign({ currentUserPassword: password }, "secretsuperkey123");

      console.log("currentusename", currentUserName);
      return {
        status: true,
        message: "Login Succesfull",
        statusCode: 200,
        currentUser,
        currentUserName,
        token,
      };
    } else {
      return {
        status: false,
        message: "Login Failed",
        statusCode: 400,
      };
    }
  });
};

const AllBooks = () => {
  return db.Books.find().then((res) => {
    if (res) {
      return {
        statusCode: 200,
        result: res,
      };
    } else {
      return {
        statusCode: 404,
        message: "No Data Found",
      };
    }
  });
};

module.exports = {
  signin,
  login,
  AllBooks
};
