import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";

function Pagination() {
  const { page, setPage, totalPage } = useContext(ProductContext);

  const loopPage = (totalPage) => {
    let divElement = [];
    for (let i = 1; i <= totalPage; i++) {
      divElement.push(i);
    }

    return divElement;
  };

  const renderPage = loopPage(totalPage);

  return (
    <div className="page-wrap">
      <div className="pagination">
        <button
          className="first-page"
          onClick={() => {
            setPage(1);
          }}
        >
          First
        </button>
        <button
          style={{ backgroundColor: page <= 1 ? "grey" : "#04aa6d" }}
          className="prev-page"
          onClick={() => {
            if (page <= 1) {
              return null;
            } else {
              return setPage(page - 1);
            }
          }}
        >
          Prev
        </button>

        {renderPage.map((item) => (
          <div key={item} onClick={() => setPage(item)} className="page">
            {item}
          </div>
        ))}
        <button
          style={{ backgroundColor: page === totalPage ? "grey" : "#04aa6d" }}
          className="next-page"
          onClick={() => {
            if (page >= totalPage) {
              return null;
            } else {
              return setPage(page + 1);
            }
          }}
        >
          Next
        </button>
        <button
          className="end-page"
          onClick={() => {
            setPage(totalPage);
          }}
        >
          End
        </button>
      </div>
    </div>
  );
}

export default Pagination;
