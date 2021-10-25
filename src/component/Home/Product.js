import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import Pagination from "./Pagination";
import ProductItem from "./ProductItem";

function Product() {
  const {
    ProductState: { products },
  } = useContext(ProductContext);

  return (
    <>
      <h1 className="product-title">Product</h1>
      <div className="products">
        {products &&
          products.map((item) => <ProductItem key={item.id} data={item} />)}
      </div>
      <Pagination />
    </>
  );
}

export default Product;
