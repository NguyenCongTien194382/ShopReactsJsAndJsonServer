import React, { useContext, useState, useRef } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { CLEAN_CART } from "../../const";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { API_URL } from "../../const";
import { v4 as uuidv4 } from "uuid";

function Cart() {
  const {
    ProductState: { cart },
    // dispatch,
  } = useContext(ProductContext);

  const payCart = () => {
    setShowModal(true);
    // console.log(JSON.stringify(cart));
    // dispatch({ type: CLEAN_CART, payload: [] });
  };

  const [showModal, setShowModal] = useState(false);

  const random = uuidv4();

  const totalPrice = (array) => {
    return array.reduce((total, item) => {
      return (total += Number(item.price * item.quanlity));
    }, 0);
  };

  const tong_don_hang = totalPrice(cart);

  const [data, setData] = useState({
    email: "",
    name: "",
    address: "",
    phone: "",
    ma_don_hang: random,
    price: tong_don_hang,
    status: "0",
  });

  const handleOnChangeModal = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const luu_chi_tiet_don_hang = () => {
    const detailsCart = cart.map((item) => {
      return item;
    });

    const data_fecth_api = {
      ma_don_hang: data.ma_don_hang,
      detailsCart: detailsCart,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data_fecth_api),
    };

    fetch(`${API_URL}/detailsCart`, option)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const luu_don_hang = () => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    };

    fetch(`${API_URL}/historyBuyProducts`, option)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object") {
          luu_chi_tiet_don_hang();
        }
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    luu_don_hang();

    setData({
      ...data,
      email: "",
      name: "",
      address: "",
      phone: "",
      ma_don_hang: random,
    });
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
          <h1>Tổng cộng: $ {tong_don_hang}</h1>

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
              value={data.email}
            />

            <label htmlFor="psw">
              <b>Họ tên</b>
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleOnChangeModal}
              value={data.name}
            />

            <label htmlFor="psw">
              <b>Địa chỉ</b>
            </label>
            <input
              type="text"
              name="address"
              required
              onChange={handleOnChangeModal}
              value={data.address}
            />

            <label htmlFor="psw">
              <b>Số điện thoại</b>
            </label>
            <input
              type="number"
              name="phone"
              required
              onChange={handleOnChangeModal}
              value={data.phone}
            />

            <button
              type="submit"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Xác nhận đơn hàng
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Cart;
