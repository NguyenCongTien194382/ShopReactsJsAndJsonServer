import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../const";
import { AuthContext } from "../../Context/Auth";
import { ProductContext } from "../../Context/ProductContext";

function Don_hang() {
  const idUser = localStorage.getItem("idUser");

  const [historyBuyProduct, setHistoryBuyProduct] = useState([]);

  const { loading, setLoading } = useContext(ProductContext);

  const {
    AuthState: { user },
  } = useContext(AuthContext);

  const getDonHang = () => {
    fetch(`${API_URL}/historyBuyProducts/?userId=${idUser}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object") {
          setHistoryBuyProduct(data);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    getDonHang();
  }, []);

  const deleteDonHang = (id) => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    fetch(`${API_URL}/historyBuyProducts/${id}`, option)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object") {
          swal({
            title: "Hủy đơn thành công",
            icon: "success",
            buttons: "OK",
          });
          getDonHang();
        }
      });
  };

  let body;

  if (loading) {
    body = (
      <>
        <div className="loading-products">
          <div class="loader"></div>
        </div>
      </>
    );
  } else if (historyBuyProduct.length !== 0) {
    body = historyBuyProduct.map((item) => (
      <div className="historyBuyItem" key={item.id}>
        <p className="historyBuyItem-name">{item.name}</p>

        <p className="historyBuyItem-price"> {item.email}</p>

        <p className="historyBuyItem-price"> {item.phone}</p>

        <p className="historyBuyItem-price">$ {item.price}</p>

        <div className="historyBuyItem-action">
          <p
            style={{
              backgroundColor: item.status === "0" ? "red" : "blue",
            }}
            className="historyBuyItem-status"
          >
            {item.status === "0" ? "Chờ xác nhận" : "Đã xác nhận"}
          </p>
          <p
            className="historyBuyItem-delete"
            onClick={() => deleteDonHang(item.id)}
          >
            Hủy đơn hàng
          </p>

          <p className="historyBuyItem-details">
            <Link to={`/don_hang/details/${item.ma_don_hang}`}>
              Xem chi tiết
            </Link>
          </p>
        </div>
      </div>
    ));
  } else {
    body = (
      <div className="not-view">
        <p>
          Không có lịch sử mua hàng <Link to="/">mua hàng ngay</Link>{" "}
        </p>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className="historyBuy">
          <h1 className="historyBuy-title">Lịch sử mua hàng</h1>
          {body}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default Don_hang;
