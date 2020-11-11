import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import EmployeesProfile from "./pages/EmployeesProfile";
import Receptionist from "./pages/Receptionist";
import PhotoManager from "./pages/PhotoManager";
import CustomerAddPage from "./pages/CustomerAddPage";
import CustomerAddPetPage from "./pages/CustomerAddPetPage";
import CustomerAddPageCambridge from "./pages/CustomerAddPageCambridge";
import CustomerAddPetPageCambridge from "./pages/CustomerAddPetPageCambridge";
import Commission from "./pages/Commission";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import EditClients from "./components/EditClients";
import EditClientsCambridge from "./components/EditClientsCambridge";
import EditEmployees from "./components/EditEmployees";
import SignIn from "./components/SignIn";
import NoMatch from "./pages/NoMatch/index";
import Staff from "./pages/Staff";
import Schedule from "./pages/Schedule";
import "./App.css";

class App extends Component {
  state = {
    sideDrawerOpen: false,
    loggedIn: false,
    toolbarState: true,
  };

  componentDidMount() {
    const accessString = localStorage.getItem("JOBTYPE");
    if (accessString === "customer") {
      this.setState({
        toolbarState: false,
      });
    }
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <Router>
          <div style={{ height: "100%" }}>
            {!this.state.toolbarState ? (
              <div>&nbsp;</div>
            ) : (
              <Fragment>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer show={this.state.sideDrawerOpen} />
                {backdrop}
              </Fragment>
            )}
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth/api/clients/:id" component={EditClients} />
            <Route
              exact
              path="/auth/api/clients_cambridge/:id"
              component={EditClientsCambridge}
            />
            <Route
              exact
              path="/auth/customer/:regid"
              component={CustomerAddPetPage}
            />
            <Route
              exact
              path="/auth/customer_cambridge/:regid"
              component={CustomerAddPetPageCambridge}
            />
            <Route exact path="/auth/photo_manager" component={PhotoManager} />
            <Route exact path="/auth/reception" component={Receptionist} />
            <Route exact path="/auth/customer" component={CustomerAddPage} />
            <Route
              exact
              path="/auth/customer_cambridge"
              component={CustomerAddPageCambridge}
            />
            <Route exact path="/auth/commission" component={Commission} />
            <Route exact path="/auth/employees/:id" component={EditEmployees} />
            <Route exact path="/about" component={About} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/auth/admin" component={Staff} />
            <Route
              exact
              path="/auth/employees_profile"
              component={EmployeesProfile}
            />
            <Route exact path="/auth/login" component={SignIn} />
            <Route exact path="/auth/logout" component={SignIn} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
