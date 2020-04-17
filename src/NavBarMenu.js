import React, { Component } from "react";
import { Menu, Input, Segment, MenuItem, Dropdown, DropdonwItem } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register'
import MainProfilePage from "./MainProfilePage";
import LandingPage from "./LandingPage/LandingPage";

class NavBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home', usernameLogged: localStorage.getItem.name }
    this.wrapper = React.createRef();
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state

    return (
      <div>
        <Router>
          <Menu pointing>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
              as={Link}
              to="/home"
            >
              Strona główna
            </Menu.Item>

            {/*
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={this.handleItemClick}
              as={Link}
              to="/register"
            >
              Zarejestruj się
            </Menu.Item>
            */}

            <MenuItem
              name="mainProfilePage"
              active={activeItem === "mainProfilePage"}
              onClick={this.handleItemClick}
              as={Link}
              to="/mainProfilePage"
            >
              Profil użytkownika
            </MenuItem>

            {/*
            <Menu.Item
              position="right"
              name="login"
              active={activeItem === "login"}
              onClick={this.handleItemClick}
              as={Link}
              to="/login"
            >
              Zaloguj
            </Menu.Item>
            */}
          </Menu>
          <Switch>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/mainProfilePage">
              <MainProfilePage></MainProfilePage>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}
function Home () {
  return <h2>Home</h2>;
}
export default NavBarMenu;
