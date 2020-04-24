import React, { Component } from 'react';
import { Button, Label, Icon, Grid, GridColumn, Image, Segment, Container } from 'semantic-ui-react';
import { mainProfileService } from "./Api/Api";


class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "login użytkownika",
      email: "email użytkownika",
      photo: "https://react.semantic-ui.com/images/wireframe/image.png",
      telephone: "telefon użytkownika",
      description: "Lorem ipsum dolor sit amet.",
    };
  }

  componentWillMount() {
    this.setState((props) =>({
        username: this.props.username,
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
            <Button fluid size="massive" animated color="orange">
              <Button.Content visible>Znajdź ekipę</Button.Content>
              <Button.Content hidden>
                <Icon name="group" />
              </Button.Content>
            </Button>

            <Segment>
              <Label attached="top">{this.state.username}</Label>
              <Image
                fluid
                src={this.state.photo}
                style={{ minHeight: "200px", minWidth: "200px" }}
              />
            </Segment>

            <Segment>
              <Label attached="top left">O mnie</Label>
              <Container textAlign="left">
                <p>{this.state.description}</p>
              </Container>
            </Segment>

            <Segment textAlign="left">
              <Icon name="mail" />
              {this.state.email}
            </Segment>
            <Segment textAlign="left">
              <Icon name="phone" />
              {this.state.telephone}
            </Segment>
          </Grid.Row>
        </GridColumn>
      </Grid>
    );
  }
}

export default UserInfo;