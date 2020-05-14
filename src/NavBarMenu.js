import React, { Component } from "react";
import { Menu } from 'semantic-ui-react';
import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import MainProfilePage from "./MainProfilePage";
import LandingPage from "./LandingPage/LandingPage";
import SearchView from "./SearchView/SearchView";
import {
  notification,
} from "antd";
import userService from "./Api/Api";
import { ACCESS_TOKEN, USER } from "./constants";
import Drawer from "./Drawer";
import EventView from "./EventDetailView/EventView";
import UserOpinionsPage from "./OpinionsPage/UserOpinionsPage";

class NavBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "home",
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      collapsed: false,
    };
    this.wrapper = React.createRef();

    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: "topRight",
      top: 70,
      duration: 3,
    });

  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogin () {
    notification.success({
      message: "Login App",
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
  }

  loadCurrentUser () {
    this.setState({
      isLoading: true,
    });
    userService
      .getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false,
        });

        this.props.history.push(`/mainProfilePage/${response.username}`);
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
        this.props.history.push(`/home`);
      });
  }

  componentDidMount () {
    this.loadCurrentUser();
  }

  handleLogout () {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
    this.setState({
      currentUser: null,
      isAuthenticated: false,
    });

    this.props.history.push("/home");

    notification["success"]({
      message: "Login App",
      description: "You're successfully logged out.",
    });
  }


  render () {
    if (!this.state.isAuthenticated) {
      return (
        <div>

          <Menu pointing />
          <Switch>
            <Route
              path="/mainProfilePage/:username"
              render={(props) => (
                <MainProfilePage
                  isAuthenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  {...props}
                />
              )}
            ></Route>
            <Route path="/searchPannel">
              <SearchView />
            </Route>
            <Route
              path="/home"
              render={(props) => (
                <LandingPage onLogin={this.handleLogin} {...props} />
              )}
            ></Route>
          </Switch>
        </div>
      );
    }

    return (
      <div>
        <Drawer
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout}
        />
        <div>
          <Switch>
            <Route
              path="/mainProfilePage/:username"
              render={(props) => (
                <MainProfilePage
                  isAuthenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  {...props}
                />
              )}
            ></Route>
            <Route path="/searchPannel">
              <SearchView />
            </Route>
            <Route
              path="/home"
              render={(props) => (
                <LandingPage onLogin={this.handleLogin} {...props} />
              )}
            ></Route>
            <Route
              path="/eventView/:eventID"
              render={(props) => (
                <EventView {...props} />
              )}>
            </Route>
            <Route
            path="/useropinions/:username"
            render={(props) =>(
              <UserOpinionsPage {...props}/>
            )}>              
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBarMenu);