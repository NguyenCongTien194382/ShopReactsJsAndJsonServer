import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../const";

function Search() {
  const [result, setResult] = useState();

  const [showFilter, setShowFilter] = useState(false);

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

  const sortDesc = (array) => {
    const resultArray = array.sort((a, b) => {
      return a.price - b.price;
    });

    // từ bé đến lớn, tứ tự tăng dần

    setResult([...resultArray]);
  };

  const sortAsc = (array) => {
    const resultArray = array.sort((a, b) => {
      return b.price - a.price;
    });

    // từ lớn đến bé, thứ tự tăng dần

    setResult([...resultArray]);
  };

  return (
    <>
      <div className="search-top">
        <h1 className="search-title-1">Kết quả tìm kiếm</h1>
        <div class="wraper">
          <div className="filter" onClick={() => setShowFilter(!showFilter)}>
            Sắp xếp <i class="fas fa-chevron-left"></i>
          </div>
          <div className="filter-list">
            <ul
              className="filter-item"
              style={{ display: showFilter ? "block" : "none" }}
            >
              <li
                onClick={() => {
                  sortDesc(result);
                  setShowFilter(false);
                }}
                className="filter-item-1"
              >
                Giá từ thấp đến cao
              </li>
              <li
                onClick={() => {
                  sortAsc(result);
                  setShowFilter(false);
                }}
                className="filter-item-1"
              >
                Giá từ cao xuống thấp
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        style={{
          display: result && result.length === 0 ? "flex" : "grid",
          height: result && result.length === 0 ? "calc(100vh - 186px)" : null,
        }}
        className="products"
      >
        {result && result.length === 0 ? (
          <h1 className="search-title">Không tìm thấy sản phẩm</h1>
        ) : (
          result &&
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
