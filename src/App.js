import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddReward from "./containers/Rewards";
import WithDraw from "./containers/WithDraw";
import Stake from "./containers/Stake";
import Deploy from "./containers/Deploy";
import { NotFound } from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/home.css";
import "./assets/css/loader.scss";

toast.configure({
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.TOP_RIGHT
});

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <ToastContainer autoClose={8000} />
        <Switch>
          <Route exact path="/" component={AddReward} />
          <Route exact path="/withdraw" component={WithDraw} />
          <Route exact path="/stake" component={Stake} />
          <Route exact path="/deploy" component={Deploy} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
