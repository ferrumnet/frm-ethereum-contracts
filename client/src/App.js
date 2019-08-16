import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import  AddReward  from "./containers/Rewards";
import WithDraw from "./containers/WithDraw";
import Stake from "./containers/Stake";
import { NotFound } from "./components/NotFound";
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/home.css'

class App extends Component {
  render() {
    return (
      <Router >
        <Header />
        <Switch>
          <Route exact path="/" component={AddReward} />
          <Route exact path="/withdraw" component={WithDraw} />
          <Route exact path="/stake" component={Stake} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
