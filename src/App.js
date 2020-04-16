import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';


// Own Components
import MainLayout from "./Layouts/MainLayout";
import Signup from "./Signup";
import Landing from "./Landing/";
import BusinessInfo from "./Business/BusinessInfo";
import SearchCity from "./Business/SearchCity";
import City from "./Cities/City";
import FullMapCity from "./Cities/FullMapCity";
import Faqs from "./Landing/FAQS";
import LastStepSignUp from "./Signup/Finish";
import ThankYou from "./Landing/Gratitude";


const App = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/cities/:city/map" render={props => (
            <FullMapCity {...props} />
          )} />
          <Route path="/cities/:city" render={props => (
            <City {...props} />
          )} />
          <Route path="/faqs" render={props => (
            <Faqs {...props} />
          )} />
          <Route path="/cities" render={props => (
            <SearchCity {...props} />
          )} />
          <Route path="/add-local-business" render={props => (
            <Signup {...props} />
          )} />
          <Route path="/last-step" render={props => (
            <LastStepSignUp {...props} />
          )} />
          <Route path="/business/:slug" render={props => (
            <BusinessInfo {...props} />
          )} />
          <Route path="/thank-you" render={props => (
            <ThankYou {...props} />
          )} />
          <Route path="/" render={props => (
            <Landing {...props} />
          )} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
