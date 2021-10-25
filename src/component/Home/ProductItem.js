import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import Loading from "../Loading/Loading";

function ProductItem({ data }) {
  const { name, image, id, price } = data;

  const { loading } = useContext(ProductContext);

  return (
    <>
      <div className="product">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Link to={`/product/${id}`}>
              <img src={image} alt={name} />
            </Link>
            <div className="wrapProduct">
              <Link to={`/product/${id}`}>
                <h2 className="product-name">{name}</h2>
              </Link>
              <p className="product-price">${price}</p>
            </div>
            <Link to={`/product/${id}`} className="view-details">
              View Details
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default ProductItem;
