import React, { Component } from "react";
import {
  Grid,
  GridColumn,
  GridRow,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import bxBasketball from "@iconify/icons-bx/bx-basketball";
import volleyballIcon from "@iconify/icons-uil/volleyball";
import roundSportsHandball from "@iconify/icons-ic/round-sports-handball";
import swimming15 from "@iconify/icons-maki/swimming-15";
import soccer11 from "@iconify/icons-maki/soccer-11";
import basketball11 from "@iconify/icons-maki/basketball-11";
import tennisIcon from "@iconify/icons-map/tennis";
import climbingIcon from "@iconify/icons-map/climbing";
import badmintonIcon from "@iconify/icons-mdi/badminton";
import roundDirectionsRun from "@iconify/icons-ic/round-directions-run";
import roundDirectionsBike from "@iconify/icons-ic/round-directions-bike";
import pingPongRacket from "@iconify/icons-si-glyph/ping-pong-racket";
import { LineOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";

const toggleSportsCategories = [
  {
    value: "1",
    icon: soccer11,
  },
  {
    value: "2",
    icon: volleyballIcon,
  },
  {
    value: "3",
    icon: basketball11,
  },
  {
    value: "4",
    icon: bxBasketball,
  },
  {
    value: "5",
    icon: roundSportsHandball,
  },
  {
    value: "6",
    icon: tennisIcon,
  },
  {
    value: "7",
    icon: tennisIcon,
    additional: "x2",
  },
  {
    value: "8",
    icon: tennisIcon,
    icon2: LineOutlined,
  },
  {
    value: "9",
    icon: badmintonIcon,
  },
  {
    value: "10",
    icon: badmintonIcon,
    additional: "x2",
  },
  {
    value: "11",
    icon: roundDirectionsRun,
  },
  {
    value: "12",
    icon: roundDirectionsBike,
  },
  {
    value: "13",
    icon: swimming15,
  },
  {
    value: "14",
    icon: pingPongRacket,
  },
  {
    value: "15",
    icon: climbingIcon,
  },
];



class EventPlaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPlaceID: 0,
      eventPlaceName: "Undefined",
      eventPlaceDescription: "Undefined",
      eventPlaceStreetName: "Undefined",
      eventPlaceStreetNumber: "Undefined",
      eventPlacePostCode: "Undefined",
      eventPlaceCity: "Undefined",
      eventPlaceSportsCategories: [ {sportsCategoryId: 1 }],
      userRequestingID: null,
      userRequestingUsername: "Undefined",
      userAcceptingID: null,
      userAcceptingUsername: "Undefined",
      isAccepted: false,
      joinned: false,
      isLoading: false,
    };
  }

    componentDidMount() {
        this.setState({
            eventPlaceID: this.props.eventPlaceDetails.eventPlaceID,
            eventPlaceName: this.props.eventPlaceDetails.eventPlaceName,
            eventPlaceDescription: this.props.eventPlaceDetails.eventPlaceDescription,
            eventPlaceStreetName: this.props.eventPlaceDetails.eventPlaceStreetName,
            eventPlaceStreetNumber: this.props.eventPlaceDetails
            .eventPlaceStreetNumber,
            eventPlacePostCode: this.props.eventPlaceDetails.eventPlacePostCode,
            eventPlaceCity: this.props.eventPlaceDetails.eventPlaceCity,
            eventPlaceSportsCategories: this.props.eventPlaceDetails.sportsCategories,
            userRequestingUsername: this.props.eventPlaceDetails
            .userRequestingUsername,
            userAcceptingUsername: this.props.eventPlaceDetails.userAcceptingUsername,
            isAccepted: this.props.eventPlaceDetails.isAccepted,
        });
    }

  render() {
    return (
      <Grid divided>
        <GridRow>
          <GridColumn textAlign="center" verticalAlign="top" width={1}>
            <h4 style={{ "font-weight": "bold" }}>ID:</h4>
            <h4>{this.state.eventPlaceID}</h4>
          </GridColumn>
          <GridColumn verticalAlign="middle" width={3}>
            <h4 style={{ "font-weight": "bold" }}>Nazwa obiektu:</h4>
            <h4>{this.state.eventPlaceName}</h4>
            <h4 style={{ "font-weight": "bold" }}>Opis:</h4>
            <h4>{this.state.eventPlaceDescription}</h4>
          </GridColumn>
          <GridColumn verticalAlign="middle" width={3}>
            <h4 style={{ "font-weight": "bold" }}>Miasto:</h4>
            <h4>
              {this.state.eventPlaceCity} {this.state.eventPlacePostCode}
            </h4>
            <h4 style={{ "font-weight": "bold" }}>Ulica/Numer:</h4>
            <h4>
              {this.state.eventPlaceStreetName}{" "}
              {this.state.eventPlaceStreetNumber}
            </h4>
          </GridColumn>
          <GridColumn verticalAlign="middle" width={4}>
            <h4 style={{ "font-weight": "bold" }}>Zgłaszający:</h4>
            <h4>{this.state.userRequestingUsername}</h4>
            <h4 style={{ "font-weight": "bold" }}>Zaakceptował:</h4>
            <h4>{this.state.userAcceptingUsername}</h4>
            <h4 style={{ "font-weight": "bold" }}>
              Zaakceptowane: {String(this.state.isAccepted)}
            </h4>
          </GridColumn>
          <GridColumn verticalAlign="middle" width={2}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "flex-start",
              }}
            >
              {this.state.eventPlaceSportsCategories.map((item) => (
                <React.Fragment>
                  <Icon
                    icon={
                      toggleSportsCategories[item.sportsCategoryId - 1].icon
                    }
                    width="2em"
                    height="2em"
                  />
                  {toggleSportsCategories[item.sportsCategoryId - 1].additional}
                </React.Fragment>
              ))}
            </div>
          </GridColumn>

          <GridColumn
            centered
            textAlign="center"
            verticalAlign="middle"
            width={2}
            padding={2}
          >
            <Grid.Row>
              {this.state.isAccepted ? (
                <Button
                  color="grey"
                  size="small"
                  disabled={this.state.isAccepted}
                >
                  <Button.Content visible>Akceptuj propozycję</Button.Content>
                </Button>
              ) : (
                <Button positive size="small" disabled={this.state.isAccepted}>
                  <Button.Content visible>Akceptuj propozycję</Button.Content>
                </Button>
              )}
            </Grid.Row>
            <Grid.Row>
              <Button negative size="small">
                <Button.Content visible>Usuń obiekt</Button.Content>
              </Button>
            </Grid.Row>
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }
}

export default EventPlaceCard;
