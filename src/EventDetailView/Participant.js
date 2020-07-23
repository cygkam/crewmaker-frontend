import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import { Link, Route } from "react-router-dom";
import MainProfilePage from "../MainProfilePage";
import userService from ".././Api/Api";

class Participant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "https://react.semantic-ui.com/images/wireframe/image.png",
      username: "",
      name: "Maciej",
    };

    this.loadUserProfileImage = this.loadUserProfileImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: this.props.dataFromParent.username,
      name: this.props.dataFromParent.name,
    });
    this.loadUserProfileImage(this.props.dataFromParent.username);
  }

  loadUserProfileImage(username) {
    userService
      .getUserProfileImageSmall(username)
      .then((response) => {
        this.setState({
          image: "data:image/jpeg;base64," + response.binaryData,
          isLoadingImage: false,
        });
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
  }

  render() {
    return (
      <div>
        <Link to={`/mainProfilePage/${this.state.username}`}>
          <Image
            src={this.state.image}
            size="medium"
            label={{
              content: this.state.name,
              attached: "bottom",
              size: "medium",
            }}
          />
        </Link>
        <Route
          path="/mainProfilePage/:username"
          render={(props) => (
            <MainProfilePage
              isAuthenticated={this.state.isAuthenticated}
              currentUser={this.state.username}
              {...props}
            />
          )}
        ></Route>
      </div>
    );
  }
}

export default Participant;