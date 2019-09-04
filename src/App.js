import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Router, Switch, Route } from "react-router-dom";
import history from "./utils/history";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddReward from "./containers/Rewards";
import WithDraw from "./containers/WithDraw";
import Stake from "./containers/Stake";
import Deploy from "./containers/Deploy";
import NotFound from "./components/common/NotFound";
import Home from "./containers/Home";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/home.css";
import "./assets/css/loader.scss";
import Loader from "./containers/Loader";

toast.configure({
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.TOP_RIGHT
});

const App = () => (
  <Router history={history}>
    <Header />
    <Loader />
    <ToastContainer />
    <Switch>
      <Home exact path="/" component={Home} />
      <Route exact path="/admin/:address/addReward" component={AddReward} />
      <Route exact path="/:address/withdraw" component={WithDraw} />
      <Route exact path="/:address/stake" component={Stake} />
      <Route exact path="/admin/deploy" component={Deploy} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </Router>
);

export default App;
