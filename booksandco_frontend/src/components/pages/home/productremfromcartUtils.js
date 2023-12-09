import axios from "axios";

export const deleteHandlerOfCartProductItems = (productId,token,fetchData) => {
    const username = localStorage.getItem("currentUser");
    axios
      .delete(`http://localhost:3001/remove-product-from-cart/${productId}`, {
        headers: {
          "x-access-token": `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        alert("An error occured while deleting the product from the cart");
      });
  };