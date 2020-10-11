import React from "react";
import ReactDOM from "react-dom";
import Store from "./Store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Routes from "./routes/allRoutes";
import "./styles.css"

const { Home, Results, News } = Routes;
const App = () => {
  return (
    <BrowserRouter>
      <Store>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/results/:page" component={Results} />
          <Route path="/news/:page/:index" component={News} />
          <Route component={Error} />
        </Switch>
      </Store>
    </BrowserRouter>
  );
};

ReactDOM.render(<App/>, document.getElementById("root"));
