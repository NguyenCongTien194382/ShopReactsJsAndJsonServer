import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Cart from "./Cart";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Product from "./Product";
import ProductDetails from "./ProductDetails";
import About from "../User/About";
import Search from "./Search";

function Content() {
  const match = useRouteMatch();

  return (
    <div className="content">
      <Switch>
        <Route path={`${match.path}`} component={Product} exact />
        <Route path="/login" component={LoginForm} exact />
        <Route path="/register" component={RegisterForm} exact />
        <Route path="/product/:id" component={ProductDetails} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/about" component={About} exact />
        <Route path="/search/:keyword" component={Search} exact />
      </Switch>
    </div>
  );
}

export default Content;
