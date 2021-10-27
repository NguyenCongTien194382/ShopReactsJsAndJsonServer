import { createContext, useEffect, useReducer, useState } from "react";
import { ProductReducer } from "../Reducer/ProductReducer";
import { API_URL, GET_PRODUCTS, FIND_PRODUCT, DELETE_CART } from "../const";
import swal from "sweetalert";

export const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const [ProductState, dispatch] = useReducer(ProductReducer, {
    products: [],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    totalPage: null,
  });

  const [couter, setCouter] = useState(1);

  const getProduct = () => {
    fetch(`${API_URL}/products`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: GET_PRODUCTS,
          payload: data,
        });
      })
      .catch((err) => console.log(err));
  };

  const addToCart = (id) => {
    const product = ProductState.products.find((item) => {
      if (item.id === id) {
        return item;
      }
    });

    product.quanlity = couter;

    const cartExist = ProductState.cart.some((item) => {
      return product.id === item.id;
    });

    if (!cartExist) {
      dispatch({
        type: FIND_PRODUCT,
        payload: product,
      });
      swal({
        title: "Thêm vào giỏ thành công",
        text: "Bấm ok để tiếp tục",
        icon: "success",
        button: "OK",
      });
    } else {
      swal({
        title: "Có vẻ như sản phẩm đã được thêm vào trước đó",
        text: "Bấm ok để tiếp tục",
        icon: "warning",
        button: "OK",
      });
    }
  };

  const deleteToCart = (id) => {
    const productId = ProductState.cart.find((item, index) => item.id === id);

    dispatch({ type: DELETE_CART, payload: productId.id });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(ProductState.cart));
  }, [ProductState.cart]);

  useEffect(() => {
    getProduct();
  }, []);

  const ProductData = {
    ProductState,
    addToCart,
    couter,
    setCouter,
    deleteToCart,
    getProduct,
    dispatch,
  };

  return (
    <ProductContext.Provider value={ProductData}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
