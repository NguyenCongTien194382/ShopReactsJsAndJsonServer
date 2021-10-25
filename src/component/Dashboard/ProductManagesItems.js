import React from "react";
import { Link } from "react-router-dom";

function ProductManagesItems({ index, data, deleteFunc }) {
  return (
    <>
      <div className="product-manages-item">
        <p className="product-manages-id">{index}</p>
        <p className="product-manages-name">{data.name}</p>
        <p className="product-manages-img">
          <img src={data.image} alt={data.name} />
        </p>
        <p className="product-manages-price">{data.price}</p>
        <div className="product-manages-action">
          <Link
            style={{ color: "#fff" }}
            to={`/admin/products/edit/${data.id}`}
          >
            <button className="buy-product full-width text-center mx-2">
              Edit
            </button>
          </Link>
          <div
            onClick={() => deleteFunc(data.id)}
            className="delete-product full-width text-center mx-2"
          >
            Delete
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductManagesItems;
