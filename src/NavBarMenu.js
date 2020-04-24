import React, { Component } from "react";
import { Menu, Dropdown, Button} from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link
} from "react-router-dom";
import MainProfilePage from "./MainProfilePage";
import LandingPage from "./LandingPage/LandingPage";
import SearchView from "./SearchView/SearchView";
import {
  notification,
} from "antd";
import userService from "./Api/Api";
import { ACCESS_TOKEN } from "./constants";

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

  handleLogin() {
    notification.success({
      message: "Login App",
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
  }

  loadCurrentUser() {
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

  componentWillMount() {
    this.loadCurrentUser();
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);

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

  render() {
    const { activeItem } = this.state;

    if (!this.state.isAuthenticated) {
      return (
        <div>
          <Menu pointing/>
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
        <Menu>
          <Menu.Menu position="left">
            <Dropdown item text="Menu">
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Russian</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>

          <Menu.Item
            name="searchPannel"
            active={activeItem === "searchPannel"}
            onClick={this.handleItemClick}
            as={Link}
            to="/searchPannel"
          >
            Wyszukaj
          </Menu.Item>

          <Menu.Item
            name="mainProfilePage"
            active={activeItem === "mainProfilePage"}
            onClick={this.handleItemClick}
            as={Link}
            to={{ pathname: `/mainProfilePage/${this.state.currentUser.username}` }}
          >
            Mój profil
          </Menu.Item>

          <Menu.Item position="right" onClick={this.handleLogout}>
            Wyloguj
          </Menu.Item>
        </Menu>
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
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBarMenu);