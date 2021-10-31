import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API_URL } from "../../const";
import { AuthContext } from "../../Context/Auth";
import { ProductContext } from "../../Context/ProductContext";
import swal from "sweetalert";
import Review from "./Review";
import Couter from "./Couter";
import LoadingDetails from "../Loading/LoadingDetails";

function ProductDetails() {
  const params = useParams();

  const history = useHistory();

  const [data, setData] = useState({});

  const { addToCart } = useContext(ProductContext);

  const {
    AuthState: { user },
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductDetails = (id) => {
      fetch(`${API_URL}/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          return setData(data);
        });
    };

    getProductDetails(params.id);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="details">
      <h2 className="details-title">Details Page</h2>
      {loading ? (
        <LoadingDetails />
      ) : (
        <>
          <div className="details-page">
            <div className="details-img">
              <img src={data.image} alt="product img" />
            </div>
            <div className="details-infomation">
              <div>
                <h3 className="details-name">{data.name}</h3>
                <small>Product # {data.id}</small>
                <h4 className="details-price">${data.price}</h4>
              </div>
              <div className="add-product">
                <Couter />
                <div
                  className="add-button"
                  onClick={() => {
                    if (user) {
                      if (data.status === "1") {
                        addToCart(data);
                        history.push("/cart");
                        // swal({
                        //   title:
                        //     "Click vào hình ảnh để xóa sản phẩm khỏi giỏ hàng",
                        //   text: "Do trên mobile mình đã bỏ nút xóa để trải nghiệm tốt hơn",
                        //   icon: "warning",
                        //   buttons: "OK",
                        // });
                      } else {
                        swal({
                          title: "Sản phẩm này đã hết",
                          icon: "warning",
                          buttons: "OK",
                          dangerMode: true,
                        });
                      }
                    } else {
                      swal({
                        title: "Đăng nhập !!!!",
                        text: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ",
                        icon: "warning",
                        dangerMode: true,
                      });
                      history.push("/login");
                    }
                  }}
                >
                  Add to card
                </div>
              </div>
              <p className="details-des">{data.description}</p>
              <p className="status">
                Trạng thái: {data.status === "0" ? "Hết hàng" : "Còn hàng"}
              </p>
              <p className="details-des">
                Đăng bởi: {data.writer ? data.writer : "Admin"}
              </p>
            </div>
          </div>
        </>
      )}
      <Review idProduct={params.id} />
    </div>
  );
}

export default ProductDetails;
