import React, { useContext, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { CLEAN_CART } from "../../const";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

function Cart() {
  const {
    ProductState: { cart },
    dispatch,
  } = useContext(ProductContext);

  const payCart = () => {
    // setShowModal(true);
    // console.log(JSON.stringify(cart));
    dispatch({ type: CLEAN_CART, payload: [] });
  };

  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState({
    email: "",
    name: "",
    address: "",
    phone: "",
  });

  const handleOnChangeModal = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    console.log(data);
  };

  return (
    <>
      <div className="cart">
        <h1 className="cart-title">Cart</h1>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <CartItem key={item.id} data={item} index={index} />
          ))
        ) : (
          <div className="cart-no">
            <h1>Không có sản phẩm nào</h1>
          </div>
        )}

        <div className="pay">
          <h1>
            Tổng cộng: $
            {cart.reduce((total, item) => {
              return (total += Number(item.price * item.quanlity));
            }, 0)}
          </h1>

          <div className="pay-to-win" onClick={payCart}>
            Thanh toán
          </div>
        </div>
      </div>

      <form
        onSubmit={handleOnSubmit}
        style={{ display: showModal ? "flex" : "none" }}
        className="modal"
      >
        <div className="modal-container">
          <div className="container">
            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleOnChangeModal}
            />

            <label htmlFor="psw">
              <b>Họ tên</b>
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleOnChangeModal}
            />

            <label htmlFor="psw">
              <b>Địa chỉ</b>
            </label>
            <input
              type="text"
              name="address"
              required
              onChange={handleOnChangeModal}
            />

            <label htmlFor="psw">
              <b>Số điện thoại</b>
            </label>
            <input
              type="number"
              name="phone"
              required
              onChange={handleOnChangeModal}
            />

            <button type="submit" onClick={() => setShowModal(false)}>
              Xác nhận đơn hàng
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Cart;
