const db = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ...
//signin
const signin = async (username, email, phone, password) => {
  try {
    const profile = await db.User.findOne({ email: email });

    if (profile) {
      console.log(profile + " from register server");
      return {
        status: false,
        message: "Account already exists!.....Please Login",
        statusCode: 405,
      };
    } else {
      const saltRounds = 10; // Number of salt rounds
      console.log("passwor dis ", password);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("Hashed Password:", hashedPassword);

      const newUser = new db.User({
        username,
        email,
        phone,
        password: hashedPassword, // Save the hashed password
      });

      await newUser.save();

      return {
        status: true,
        message: "Registration Completed",
        statusCode: 202,
      };
    }
  } catch (error) {
    console.error("Error in signin:", error);
    return {
      status: false,
      message: "An error occurred during registration",
      statusCode: 500, // Internal Server Error
    };
  }
};

// login

const login = async (email, password) => {
  try {
    const profile = await db.User.findOne({ email });

    if (profile) {
      // Compare the entered password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, profile.password);

      if (isPasswordValid) {
        currentUserName = profile.username;
        currentUser = profile.email;
        currentUserPassword = password; // Store the entered password, not the hashed one
        token = jwt.sign(
          { currentUserPassword: password , currentUser:currentUser },
          "secretsuperkey123"
        );

        console.log("currentusename", currentUserName);

        return {
          status: true,
          message: "Login Successfull",
          statusCode: 200,
          currentUser,
          currentUserName,
          token,
        };
      } else {
        return {
          status: false,
          message: "Incorrect Password or Mail Id",
          statusCode: 401,
        };
      }
    } else {
      return {
        status: false,
        message: "User Not Found",
        statusCode: 404,
      };
    }
  } catch (err) {
    console.log("Error in login", err);
    return {
      status: false,
      message: "An error occured during login",
      statusCode: 500, //Internal server error
    };
  }
};

const AllBooks = () => {
  return db.Book.find().then((res) => {
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

//add books

const AddBook = (
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
  smallThumbnail
) => {
  console.log("Received book data:", id, title, authors);
  return db.Book.findOne({ id }).then((result) => {
    console.log("Find result:", result);
    if (result) {
      return {
        statusCode: 404,
        message: "Already exists",
      };
    } else {
      const newBook = new db.Book({
        id,
        volumeInfo: {
          title,
          authors,
          publisher,
          publishedDate,
          description,
          pageCount,
          categories: [category],
          imageLinks: {
            smallThumbnail,
          },
          language,
        },
        saleInfo: {
          retailPrice: {
            amount,
          },
        },
      });

      newBook.save();
      return {
        status: true,
        statusCode: 200,
        message: "New Book Added  Successfully",
      };
    }
  });
};

//delete book

const deleteBook = (id) => {
  return db.Book.deleteOne({
    id,
  }).then((result) => {
    if (result) {
      return {
        success: true,
        message: "Book Deleted",
        statusCode: 200,
      };
    } else {
      return {
        success: false,
        message: "Book Removal Failed",
        statusCode: 404,
      };
    }
  });
};

const getProduct = (id) => {
  return db.Book.findOne({
    id,
  }).then((result) => {
    if (result) {
      return {
        status: true,
        book: result,
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        statusCode: 404,
      };
    }
  });
};

const updateBook = (
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
  smallThumbnail
) => {
  return db.Book.findOne({ id }).then((result) => {
    if (result) {
      result.id = id;
      result.title = title;
      result.authors = authors;
      result.publisher = publisher;
      result.publishedDate = publishedDate;
      result.description = description;
      result.pageCount = pageCount;
      result.category = category;
      result.language = language;
      result.amount = amount;
      result.smallThumbnail = smallThumbnail;

      result.save();

      return {
        status: true,
        statusCode: 200,
        message: "Book Details Updated",
      };
    } else {
      return {
        status: false,
        statusCode: 404,
        message: "Book Updation Failed",
      };
    }
  });
};

const addToCart = async (productId, email) => {
  try {
    const user = db.User.findOne({ email });

    if (!user) {
      return {
        status: false,
        message: "user not found",
        statusCode: 404,
      };
    }

    //Check if the product already exists in the user's cart
    const existingProductIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );
    if (existingProductIndex !== -1) {
      return {
        status: false,
        message: "Product Has Already Exists In The Cart",
        statusCode: 400,
      };
    }

    // If the product is not in the cart, add it
    user.cart.push({ productId });
    await user.save();

    return {
      status: true,
      message: "The Product Added To The Cart",
      statusCode: 200,
    };
  } catch (error) {
    console.log("error adding to the cart", error);
    return {
      status: false,
      message: "Error Occured While Adding The Product To The Cart",
      statusCode: 500,
    };
  }
};

const getCart = async (email) => {
  try {
    const user =await db.User.findOne({ email });

    if (!user) {
      return {
        status: false,
        message: "User Not Found",
        statusCode: 404,
      };
    }

    return {
      status: true,
      message: "Cart Retreived Successfully",
      cart: user.cart,
      statusCode: 200,
    };
  } catch (error) {
    console.log("error getting cart", error);
    return {
      status: false,
      message: "An Error Occured While Fetching The Cart",
      statusCode: 500,
    };
  }
};

module.exports = {
  signin,
  login,
  AllBooks,
  AddBook,
  deleteBook,
  updateBook,
  getProduct,
  addToCart,
  getCart,
};
