import React, { useContext, useEffect } from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import ProductsManages from "./ProductsManages";
import FormCreateNewProduct from "./FormCreateNewProduct";
import FormEditProduct from "./FormEditProduct";
import { API_URL } from "../../const";
import { AuthContext } from "../../Context/Auth";

function Admin() {
  const match = useRouteMatch();

  const { role, setRole } = useContext(AuthContext);

  useEffect(() => {
    const loadUser = () => {
      const option = {
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      };

      const idUser = localStorage.getItem("idUser");

      fetch(`${API_URL}/600/users/${idUser}`, option)
        .then((response) => response.json())
        .then((result) => {
          delete result.password;
          if (result.roleId === "user") {
            setRole("user");
          } else if (result.roleId === "admin") {
            setRole("admin");
          } else {
            setRole(null);
          }
        })
        .catch((error) => console.log("error", error));
    };

    loadUser();
  });

  return (
    <>
      {role === "admin" ? (
        <div className="admin">
          <div className="category">
            <ul className="category-list">
              <li className="category-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="category-link"
                  to={`${match.path}`}
                >
                  Quản lí sản phẩm
                </NavLink>
              </li>
              <li className="category-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="category-link"
                  to={`${match.path}/products/add`}
                >
                  Thêm sản phẩm mới
                </NavLink>
              </li>
              <li className="category-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="category-link"
                  to={`${match.path}/users`}
                >
                  Quản lí người dùng
                </NavLink>
              </li>
              <li className="category-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="category-link"
                  to={`${match.path}/reviews`}
                >
                  Đánh giá từ khách hàng
                </NavLink>
              </li>
              <li className="category-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="category-link"
                  to={`${match.path}/don-hang`}
                >
                  Các đơn hàng chưa xử lí
                </NavLink>
              </li>
            </ul>
          </div>

          <Switch>
            <Route path={`${match.path}`} component={ProductsManages} exact />
            <Route
              path={`${match.path}/products/add`}
              component={FormCreateNewProduct}
              exact
            />
            <Route
              path={`${match.path}/products/edit/:id`}
              component={FormEditProduct}
              exact
            />
          </Switch>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default Admin;
