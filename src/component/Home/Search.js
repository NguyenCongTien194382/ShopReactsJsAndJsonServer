import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../const";

function Search() {
  const [result, setResult] = useState([]);

  const params = useParams();

  useEffect(() => {
    const searchApi = (keyword) => {
      fetch(`${API_URL}/products?name_like=${keyword}`)
        .then((response) => response.json())
        .then((dataRes) => {
          if (typeof dataRes === "object") {
            setResult(dataRes);
          }
        })
        .catch((error) => console.log("error", error));
    };

    searchApi(params.keyword);
  }, [params.keyword]);

  return (
    <>
      <h1 className="product-title">Kết quả tìm kiếm</h1>
      <div
        style={{
          display: result.length === 0 ? "flex" : "grid",
          height: result.length === 0 ? "calc(100vh - 186px)" : null,
        }}
        className="products"
      >
        {result.length === 0 ? (
          <h1 className="search-title">Không tìm thấy sản phẩm</h1>
        ) : (
          result.map((item) => (
            <div className="product">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="wrapProduct">
                <Link to={`/product/${item.id}`}>
                  <h2 className="product-name">{item.name}</h2>
                </Link>
                <p className="product-price">${item.price}</p>
              </div>
              <Link to={`/product/${item.id}`} className="view-details">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Search;
