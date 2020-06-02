import React, { Component } from "react";
import {
  Grid,
} from "semantic-ui-react";
import {notification} from "antd";
import { eventPlaceService} from "../Api/Api";
import LoadingIndicator from "../common/LoadingIndicator";
import { Link, Route } from "react-router-dom";
import MainProfilePage from "../MainProfilePage";

class EventPlaceStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatistics: true,
      allEventsCount: 0,
      passedEventsCount: 0,
      incomingEventsCount: 0,
      description: "Opis",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      eventPlaceDetails: this.props.eventPlaceDetails,
    });
    this.loadEventStatistics(this.props.eventPlaceDetails.eventPlaceID);
  }

  loadEventStatistics(eventPlaceID) {
    eventPlaceService
      .counteventPlaceEventsCount(eventPlaceID)
      .then((response) => {
        this.setState({
          loadingStatistics: false,
          allEventsCount: response.allEventsCount,
          passedEventsCount: response.passedEventsCount,
          incomingEventsCount: response.incomingEventsCount,
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            loadingStatistics: false,
          });
          notification.error({
            message: "Event place statistics error",
            description:
              error.message || "Sorry! Something went wrong. Please try again!",
          });
        } else {
          this.setState({
            loadingStatistics: false,
          });
        }
      });
  }

  render() {
    if (this.state.loadingStatistics) {
      return <LoadingIndicator />;
    } else
      return (
        <Grid>
          <Grid.Column textAlign="left">
            <Link
              to={`/mainProfilePage/${this.props.eventPlaceDetails.userRequestingUsername}`}
            >
              <h4 style={{ fontWeight: "bold" }}>
                Zgłaszający:{" "}
                {this.props.eventPlaceDetails.userRequestingUsername}
              </h4>
            </Link>
            <Link
              to={`/mainProfilePage/${this.props.eventPlaceDetails.userAcceptingUsername}`}
            >
              <h4 style={{ fontWeight: "bold" }}>
                Zaakceptował:{" "}
                {this.props.eventPlaceDetails.userAcceptingUsername}
              </h4>
            </Link>
            <h4 style={{ fontWeight: "bold" }}>
              Zaakceptowane:{" "}
              {this.props.eventPlaceDetails.isAccepted ? "Tak" : "Nie"}
            </h4>
            <h4 style={{ fontWeight: "bold" }}>
              Zarchiwizowane:{" "}
              {this.props.eventPlaceDetails.isArchived ? "Tak" : "Nie"}
            </h4>
            <h4 style={{ fontWeight: "bold" }}>
              Całkowita liczba wydarzeń: {this.state.allEventsCount}
            </h4>
            <h4 style={{ fontWeight: "bold" }}>
              Liczba nadchodzących wydarzeń: {this.state.incomingEventsCount}
            </h4>
            <h4 style={{ fontWeight: "bold" }}>
              Liczba minionych wydarzeń: {this.state.passedEventsCount}
            </h4>

            <Route
              path="/mainProfilePage/:username"
              render={(props) => <MainProfilePage {...props} />}
            ></Route>
          </Grid.Column>
        </Grid>
      );
  }
}

export default EventPlaceStatistics;
