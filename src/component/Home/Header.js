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

  const [showMenu, setShowMenu] = useState(false);

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
            if (keyword !== "") {
              history.push(`/search/${keyword}`);
              setKeyword("");
            } else {
              return null;
            }
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

          <div className="input-submit">
            <i className="fas fa-search"></i>
          </div>
        </form>

        <div className="header-info">
          <Link to="/cart" className="header-cart">
            Cart
            <span>{cart.length}</span>
          </Link>

          <div className="nav-menu-mobile" onClick={() => setShowMenu(true)}>
            <i class="fas fa-bars"></i>
          </div>

          <div
            className="nav-mobile"
            style={{ right: showMenu ? "0px" : "-800px" }}
          >
            <div onClick={() => setShowMenu(false)} className="nav-close">
              <i class="fas fa-times"></i>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (keyword) {
                  history.push(`/search/${keyword}`);
                  setKeyword("");
                  setShowMenu(false);
                } else {
                  return;
                }
              }}
              className="form-mobile"
            >
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
              />
            </form>
            <ul className="nav-mobile-list">
              {user && user.roleId === "admin" ? (
                <li className="nav-mobile-item">
                  <Link
                    onClick={() => setShowMenu(false)}
                    to="/admin"
                    className="nav-mobile-link"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : null}

              {user && user.username ? (
                <>
                  <li className="nav-mobile-item">
                    <Link
                      onClick={() => setShowMenu(false)}
                      to="/about"
                      className="nav-mobile-link"
                    >
                      {user.username}
                    </Link>
                  </li>
                  <li className="nav-mobile-item">
                    <Link
                      onClick={() => setShowMenu(false)}
                      to="/don_hang"
                      className="nav-mobile-link"
                    >
                      L???ch s??? mua h??ng
                    </Link>
                  </li>
                  <li className="nav-mobile-item">
                    <span
                      onClick={() => {
                        logOut();
                        setShowMenu(false);
                      }}
                      className="nav-mobile-link"
                    >
                      ????ng xu???t
                    </span>
                  </li>
                </>
              ) : (
                <li className="nav-mobile-item">
                  <Link
                    onClick={() => setShowMenu(false)}
                    to="/login"
                    className="nav-mobile-link"
                  >
                    ????ng nh???p
                  </Link>
                </li>
              )}
            </ul>
          </div>

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
                  <Link to="/don_hang">L???ch s??? mua h??ng</Link>
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
