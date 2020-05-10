import React, { Component } from 'react';
import { Button, Label, Icon, Grid, GridColumn, Image, Segment } from 'semantic-ui-react';
import LoadingIndicator from "./common/LoadingIndicator";

class UserInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      username: "login użytkownika",
      name: "imie",
      surname: "nazwisko",
      email: "email użytkownika",
      photo: "https://react.semantic-ui.com/images/wireframe/image.png",
      phoneNumber: "telefon użytkownika",
      description: "Lorem ipsum dolor sit amet.",
    };
  }

  componentDidMount () {
    this.setState((props) => ({
      username: this.props.username,
      name: this.props.name,
      surname: this.props.surname,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber,
      description: this.props.description,
    }));
  }

  render () {
    if (this.props.isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <Grid>
        <GridColumn>
          <Grid.Row>
            <Segment>
              <Label attached="top">{this.props.username}</Label>
              <Image
                fluid
                src={this.state.photo}
                style={{ minHeight: "200px", minWidth: "200px" }}
              />
            </Segment>
            <Segment textAlign="left">
              <Icon name="user" />
              {this.props.name + " " + this.props.surname}
            </Segment>
            <Segment textAlign="left">
              <Icon name="mail" />
              {this.props.email}
            </Segment>
            <Segment textAlign="left">
              <Icon name="phone" />
              {this.props.phoneNumber}
            </Segment>
            <Segment textAlign="left">
              <Icon name="book" />
              {this.props.description}
            </Segment>
            <Button
              fluid
              size="small"
              color="grey"
              onClick={this.props.handler}
            >
              <Button.Content visible>Edytuj profil</Button.Content>
            </Button>
          </Grid.Row>
        </GridColumn>
      </Grid>
    );
  }
}

export default UserInfoView;