import React, { Component } from 'react';
import UserInfoEdit from './UserInfoEdit';
import UserInfoView from './UserInfoView';
import userService from "./Api/Api";
import { USER } from "./constants";


class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
      isProfileInEdition: false,
    };

    this.panelViewHandler = this.changePanelView.bind(this);
  }

  changePanelView () {
    this.setState({
      isProfileInEdition: !this.state.isProfileInEdition,
    });
  }

  componentDidMount () {
    const username = this.props.match.params.username;
    this.loadUserProfile(username);
  }

  handleChange = (updatedUser) => {
    this.setState({ user: updatedUser });
  };

  loadUserProfile (username) {
    if (!localStorage.getItem(USER)) {
      userService
        .getUserProfile(username)
        .then((response) => {
          this.setState({
            user: response,
            isLoading: false,
          });
          console.log(response);
          localStorage.setItem(USER, JSON.stringify(response));
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              notFound: true,
              isLoading: false,
            });
          } else {
            this.setState({
              serverError: true,
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        user: JSON.parse(localStorage.getItem(USER).toString()),
        isLoading: false,
      });
    }
  }

  render () {
    if (this.state.isProfileInEdition) {
      return (
        <UserInfoEdit
          {...this.state.user}
          handler={this.panelViewHandler}
          onChange={this.handleChange}
        />
      );
    } else {
      return (
        <UserInfoView
          {...this.state.user}
          isLoading={this.state.isLoading}
          handler={this.panelViewHandler}
        />
      );
    }
  }
}

export default UserInfo;