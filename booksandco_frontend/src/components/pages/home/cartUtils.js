// cartUtils.js
import axios from 'axios';

const addToCartHandler = (item, token, dispatch) => {
  axios
    .post(
      `http://localhost:3001/adding-product-to-cart/${item.id}`,
      {},
      {
        headers: {
          'x-access-token': `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: 'add to cart',
          payload: {
            title: item.volumeInfo.title,
            img: item.volumeInfo.imageLinks.smallThumbnail,
            author: item.volumeInfo.authors,
            price: item.saleInfo.retailPrice['amount'],
            language: item.volumeInfo.language,
            page: item.volumeInfo.pageCount,
            publishedDate: item.volumeInfo.publishedDate,
          },
        });
      } else {
        console.log('Error adding to cart:', response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error adding to cart:', error);
    });
};

export { addToCartHandler };
