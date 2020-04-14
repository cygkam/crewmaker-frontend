import React, { Component } from 'react';
import {Form,Grid, Header, Segment} from 'semantic-ui-react';
import { notification } from 'antd';
import "antd/dist/antd.css";
import  userService from "../Api/Api";

import {ACCESS_TOKEN} from '../constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      error: "",
      password: "",
      submitted: false,
      loading: false,
    };

    notification.config({
      placement: "topRight",
      top: 70,
      duration: 3,
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  handleLogin() {
    notification.success({
      message: "Login App",
      description: "You're successfully logged in.",
    });
    //this.loadCurrentUser();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!(this.state.username && this.state.password)) {
      return;
    }

    const loginRequest = {
      username: this.state.username,
      password: this.state.password,
    };

    userService
      .login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        console.log(response.accessToken);

        this.handleLogin();
      })
      .catch((error) => {
        if (error.status === 401) {
          notification.error({
            message: "Login App",
            description:
              "Your Username or Password is incorrect. Please try again!",
          });
        } else {
          notification.error({
            message: "Login App",
            description:
              error.message || "Sorry! Something went wrong. Please try again!",
          });
        }
      });
  }

  render() {
    return (
      <Grid verticalAlign="middle" textAlign="center">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h2" color="orange" textAlign="center">
            Zaloguj się!
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                type="text"
                placeholder="Username"
                onChange={this.handleChange}
              ></Form.Input>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              ></Form.Input>
              <Form.Button
                color="orange"
                fluid
                size="large"
                onClick={this.handleSubmit}
              >
                Zaloguj
              </Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;