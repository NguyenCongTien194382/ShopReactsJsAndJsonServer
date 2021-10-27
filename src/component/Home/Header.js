import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import { ProductContext } from "../../Context/ProductContext";
import { CLEAN_CART } from "../../const";

function Header() {
  const {
    AuthState: { user },
    logOutUser,

    setRole,
  } = useContext(AuthContext);

  const history = useHistory();

  const {
    ProductState: { cart },
    dispatch,
  } = useContext(ProductContext);

  const logOut = () => {
    logOutUser();
    setRole(null);
    dispatch({ type: CLEAN_CART, payload: [] });
  };

  const [keyword, setKeyword] = useState("");

  return (
    <>
      <div className="header">
        <div className="header-logo">
          <Link to="/">
            <i className="fab fa-shopify"></i>
            MyShop
          </Link>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            history.push(`/search/${keyword}`);
            setKeyword("");
          }}
          className="header-search"
        >
          <input
            type="text"
            className="header-search-input"
            placeholder="Search...."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Link to={`/search/${keyword}`}>
            <div className="input-submit">
              <i className="fas fa-search"></i>
            </div>
          </Link>
        </form>

        <div className="header-info">
          <Link to="/cart" className="header-cart">
            Cart
            <span>{cart.length}</span>
          </Link>

          <div className="header-users">
            {user ? (
              <>
                <div className="header-avatar">
                  <img
                    src={
                      user.avatar
                        ? user.avatar
                        : "https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-cho-con-gai-1.jpg"
                    }
                    alt="avatar"
                  />
                  <span className="header-username">{user.username}</span>
                </div>
                <div className="header-user-dropdown">
                  {user.roleId === "admin" ? (
                    <Link to="/admin">Dashboard</Link>
                  ) : null}
                  <Link to="/about">About</Link>
                  <div className="button-logout" onClick={logOut}>
                    Log Out
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login" className="login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
