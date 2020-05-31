import React, { Component } from "react";
import { Segment, Grid, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PlaceOpinionCard from "../PlaceOpinion/PlaceOpinionCard";

class EventPlaceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Label textAlign="left" attached="top left" color="orange">
                Nazwa
              </Label>
              {this.props.eventPlaceDetails.eventPlaceName}
            </Segment>
            <Segment>
              <Label textAlign="left" attached="top left" color="orange">
                Opis
              </Label>
              {this.props.eventPlaceDetails.eventPlaceDescription
                ? this.props.eventPlaceDetails.eventPlaceDescription
                : "Brak"}
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <Label textAlign="left" attached="top left" color="orange">
                Miasto
              </Label>
              {this.props.eventPlaceDetails.eventPlaceCity}
            </Segment>
            <Segment>
              <Label textAlign="left" attached="top left" color="orange">
                Kod pocztowy
              </Label>
              {this.props.eventPlaceDetails.eventPlacePostCode}
            </Segment>
            <Segment>
              <Label textAlign="left" attached="top left" color="orange">
                Ulica/Numer
              </Label>
              {this.props.eventPlaceDetails.eventPlaceStreetName}{" "}
              {this.props.eventPlaceDetails.eventPlaceStreetNumber}
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <Label textAlign="left" attached="top left" color="orange">
                Zdjęcie obiektu
              </Label>
              <Image
                src={"https://react.semantic-ui.com/images/wireframe/image.png"}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Label textAlign="left" attached="top left" color="orange">
                Opinie
              </Label>
                <PlaceOpinionCard />
            </Segment>
          </Grid.Column>
          >
        </Grid.Row>
      </Grid>
    );
  }
}

export default EventPlaceDetails;
