import React, { Component } from 'react';
import UserInfoEdit from './UserInfoEdit';
import UserInfoView from './UserInfoView';
import userService from "./Api/Api";
import { USER, USER_IMAGE } from "./constants";


class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userProfileImage:
        "https://react.semantic-ui.com/images/wireframe/image.png",
      isLoading: true,
      isLoadingImage: true,
      isProfileInEdition: false,
    };

    this.panelViewHandler = this.changePanelView.bind(this);
  }

  changePanelView() {
    this.setState({
      isProfileInEdition: !this.state.isProfileInEdition,
    });
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    this.loadUserProfile(username);
    
  }

  componentWillReceiveProps(props){
    const username = props.match.params.username;
    this.loadUserProfileImage(username);
  }

  handleChange = (updatedUser) => {
    this.setState({ user: updatedUser });
  };

  loadUserProfile(username) {
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

  loadUserProfileImage(username) {
    if (!localStorage.getItem(USER_IMAGE)) {
      userService
        .getUserProfileImage(username)
        .then((response) => {
          this.setState({
            userProfileImage: "data:image/jpeg;base64," + response.binaryData,
            isLoadingImage: false,
          });
          localStorage.setItem(
            USER_IMAGE,
            JSON.stringify(this.state.userProfileImage)
          );
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              isLoadingImage: false,
              userProfileImage:
                "https://react.semantic-ui.com/images/wireframe/image.png",
            });
          } else {
            this.setState({
              serverError: true,
              isLoadingImage: false,
            });
          }
        });
    } else {
      this.setState({
        userProfileImage: JSON.parse(
          localStorage.getItem(USER_IMAGE).toString()
        ),
        isLoadingImage: false,
      });
    }
  }

  render() {
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
          isLoadingImage={this.state.isLoadingImage}
          userProfileImage={this.state.userProfileImage}
          handler={this.panelViewHandler}
        />
      );
    }
  }
}

export default UserInfo;