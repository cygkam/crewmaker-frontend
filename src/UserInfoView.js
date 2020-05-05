import React, { Component } from 'react';
import { Button, Label, Icon, Grid, GridColumn, Image, Segment, Container } from 'semantic-ui-react';
import { mainProfileService } from "./Api/Api";
import UserInfoEdit from './UserInfoEdit';


class UserInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "login użytkownika",
      name: "imie",
      surname: "nazwisko",
      email: "email użytkownika",
      photo: "https://react.semantic-ui.com/images/wireframe/image.png",
      telephone: "telefon użytkownika",
      description: "Lorem ipsum dolor sit amet.",
    };
  }

  componentWillMount() {
    this.setState((props) =>({
        username: this.props.username,
        name: this.props.name,
        surname: this.props.name,
        email: this.props.email,
        telephone: this.props.phoneNumber,
        description: this.props.description,
    }));
  }

  render() {
    return (
      <Grid>
        <GridColumn>
          <Grid.Row>
            <Segment>
              <Label attached="top">{this.state.username}</Label>
              <Image
                fluid
                src={this.state.photo}
                style={{ minHeight: "200px", minWidth: "200px" }}
              />
            </Segment>
            <Segment textAlign="left">
              <Icon name="user" />
              {this.state.name + " " + this.state.surname}
            </Segment>
            <Segment textAlign="left">
              <Icon name="mail" />
              {this.state.email}
            </Segment>
            <Segment textAlign="left">
              <Icon name="phone" />
              {this.state.telephone}
            </Segment>
            <Segment textAlign="left">
              <Icon name="book" />
              {this.state.description}
            </Segment>
            <Button fluid size="small" color="grey" onClick = {this.props.handler}>
              <Button.Content visible>Edytuj profil</Button.Content>
            </Button>
          </Grid.Row>
        </GridColumn>
      </Grid>
    );
  }
}

export default UserInfoView;