import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ data }) {
  const { name, image, id, price } = data;

  return (
    <>
      <div className="product">
        <>
          <Link to={`/product/${id}`}>
            <img src={image} alt={name} />
          </Link>
          <div className="wrapProduct">
            <Link className="product-name-link" to={`/product/${id}`}>
              <h2 className="product-name">{name}</h2>
            </Link>
            <p className="product-price">${price}</p>
          </div>
          <Link to={`/product/${id}`} className="view-details">
            View Details
          </Link>
        </>
      </div>
    </>
  );
}

export default ProductItem;
