import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import ProductItem from "./ProductItem";
import { API_URL } from "../../const";

function Product() {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductsPage = () => {
      fetch(`${API_URL}/products/?_page=${page}&_limit=5`)
        .then((res) => {
          setTotalPage(Math.ceil(res.headers.get("X-Total-Count") / 4));
          return res.json();
        })
        .then((products) => {
          setProducts(products);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    setLoading(true);

    getProductsPage();
  }, [page]);

  return (
    <>
      {loading ? (
        <>
          <div className="loading-products">
            <div class="loader"></div>
          </div>
        </>
      ) : (
        <>
          <h1 className="product-title">Home</h1>
          <div className="products">
            {products &&
              products.map((item) => <ProductItem key={item.id} data={item} />)}
          </div>
        </>
      )}
      <Pagination
        setLoading={setLoading}
        totalPage={totalPage}
        page={page}
        setPage={setPage}
      />
    </>
  );
}

export default Product;
