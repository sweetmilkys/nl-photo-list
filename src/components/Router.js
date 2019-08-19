import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "Pages/List";
import Detail from "Pages/Detail";
import NotFoundPage from "./404";

export default () => (
  <Router>
    <Switch>
      <Route path="/" component={List} exact />
      <Route path="/photos/:id" component={List} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
    <Route path="/photos/:id" component={Detail} />
  </Router>
);
