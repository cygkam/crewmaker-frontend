import React, { Component } from 'react';
import {Label,  Grid,  Segment, Button, Icon } from 'semantic-ui-react'
import UserInfo from "./UserInfo"
import CommingEvent from "./Events/CommingEvent"
import PassedEvent from "./Events/PassedEvent"
import userService from "./Api/Api";
import NotFound from "./common/NotFound";
import CheckAuthentication from "./common/CheckAuthentication";
import ServerError from "./common/ServerError";
import LoadingIndicator from "./common/LoadingIndicator";


class MainProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    this.loadUserProfile(username);
  }

  userUpdate(user) {
    this.state.user = user;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.loadUserProfile(nextProps.match.params.username);
    }
  }

  loadUserProfile(username) {
    if (this.props.username !== null) {
      this.setState({
        isLoading: true,
      });

      userService
        .getUserProfile(username)
        .then((response) => {
          this.setState({
            user: response,
            isLoading: false,
          });
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
    }
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    if (this.state.notFound) {
      return <NotFound />;
    }

    if (this.state.serverError) {
      return <ServerError />;
    }
    if (!this.props.isAuthenticated) {
      return <CheckAuthentication {...this.props} />;
    }
    return (
      <Grid textAlign="center">
        <Grid.Row stretched>
          <Grid.Column width={4}>
            <Button fluid size="massive" animated color="orange" style={{maxHeight: 60}}>
              <Button.Content visible>Znajdź ekipę</Button.Content>
              <Button.Content hidden>
                <Icon name="group" />
              </Button.Content>
            </Button>
            <UserInfo {...this.state.user}/>
          </Grid.Column>

          <Grid.Column width={5}>
            <Segment fluid>
              <Label attached="top">Twoje aktualne wydarzenia</Label>
              <Segment>
                <CommingEvent />
              </Segment>
              <Segment>
                <CommingEvent />
              </Segment>
              <Segment>
                <CommingEvent />
              </Segment>
              <Segment>
                <CommingEvent />
              </Segment>
            </Segment>
          </Grid.Column>

          <Grid.Column textAlign="center" width={4}>
            <Segment divided>
              <Label attached="top">Historia wydarzeń</Label>
              <Segment>
                <PassedEvent />
              </Segment>
              <Segment>
                <PassedEvent />
              </Segment>
              <Segment>
                <PassedEvent />
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default MainProfilePage;