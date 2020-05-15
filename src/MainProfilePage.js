import React, { Component } from 'react';
import { Label, Grid, Segment, Button, Icon } from 'semantic-ui-react'
import UserInfo from "./UserInfo"
import CommingEvent from "./Events/CommingEvent"
import PassedEvent from "./Events/PassedEvent"
import { eventService } from "./Api/Api";
import NotFound from "./common/NotFound";
import CheckAuthentication from "./common/CheckAuthentication";
import ServerError from "./common/ServerError";
import LoadingIndicator from "./common/LoadingIndicator";

class MainProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: false,
      isLoadingEvents: true,
      events: [
        {
          eventName: 1,
        },
        {
          eventName: 2,
        },
      ],
    };
  }

  componentDidMount () {
    const username = this.props.match.params.username;
    this.loadEvents(username);
  }

  loadEvents (username) {
    eventService
      .getComingUserEvents(username)
      .then((response) => {
        this.setState({
          events: response,
          isLoading: false,
          isLoadingEvents: false,
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

  sortByDate (date1, date2) {
    if (date1.eventDate < date2.eventDate) {
      return -1;
    }
    if (date1.eventDate > date2.eventDate) {
      return 1;
    }
    return 0;
  }

  render () {
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
      <Grid
        textAlign="center"
        stackable
        columns={3}
      >
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <Button
            fluid
            size="massive"
            animated
            color="orange"
            style={{ maxHeight: 60 }}
          >
            <Button.Content visible>Znajdź ekipę</Button.Content>
            <Button.Content hidden>
              <Icon name="group" />
            </Button.Content>
          </Button>
          <UserInfo {...this.props} />
        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={5}>
          <Segment fluid="true">
            <Label attached="top">Twoje aktualne wydarzenia</Label>
            {this.state.events.filter(function (event) {
              return (new Date(event.eventDate) >= new Date())
            }).sort(this.sortByDate).map((event) => (
              <Segment key={event.eventName}>
                <CommingEvent
                  dataFromParent={event}
                  isLoading={this.state.isLoadingEvents}
                />
              </Segment>
            ))}
          </Segment>
        </Grid.Column>

        <Grid.Column textAlign="center" mobile={16} tablet={8} computer={5}>
          <Segment divided="true">
            <Label attached="top">Historia wydarzeń</Label>
            {this.state.events.filter(function (event) {
              return (new Date(event.eventDate) < new Date())
            }).sort(this.sortByDate).map((event) => (
              <Segment key={event.eventName}>
                <PassedEvent
                  dataFromParent={event}
                  isLoading={this.state.isLoadingEvents}
                />
              </Segment>
            ))}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default MainProfilePage;