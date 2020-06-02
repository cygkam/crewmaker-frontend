import React, { Component } from "react";
import {Button, Segment, Image, Grid, Label, Container, Popup, Header} from "semantic-ui-react";
import { eventService, participationService } from '../Api/Api';
import LoadingIndicator from "../common/LoadingIndicator";
import { Link } from "react-router-dom";
import badmintonSingle from "../Icons/colorScale/badmintonSingle.svg";
import badmintonDouble from "../Icons/colorScale/badmintonDouble.svg";
import basketball from "../Icons/colorScale/basketball.svg";
import climbing from "../Icons/colorScale/climbing.svg";
import cycling from "../Icons/colorScale/cycling.svg";
import handball from "../Icons/colorScale/handball.svg";
import indoor from "../Icons/colorScale/indoor.svg";
import pingpong from "../Icons/colorScale/pingpong.svg";
import running from "../Icons/colorScale/running.svg";
import soccer from "../Icons/colorScale/soccer.svg";
import squash from "../Icons/colorScale/squash.svg";
import swimming from "../Icons/colorScale/swimming.svg";
import tennisDouble from "../Icons/colorScale/tennisDouble.svg";
import tennisSingle from "../Icons/colorScale/tennisSingle.svg";
import volleyball from "../Icons/colorScale/volleyball.svg";

  

class EventData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: "",
      sportsName: "",
      sportsIcon:
        "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F3C0-basketball-512.png",
      description: "",
      date: "",
      time: "",
      cyclePeriod: "",
      duration: "",
      joinned: null,
      actuallPartcipantNumber: 1,
      maxPartcipantNumber: 3,
      isLoading: true,
      eventStatus: "",
    };
  }

  renderSwitch(param) {
    switch (param) {
      case "Piłka nożna":
        return <Image size="small" src={soccer} centered />;
      case "Siatkówka":
        return <Image size="small" src={volleyball} centered />;
      case "Koszykówka":
        return <Image size="small" src={basketball} centered />;
      case "Piłka halowa":
        return <Image size="small" src={indoor} centered />;
      case "Piłka ręczna":
        return <Image size="small" src={handball} centered />;
      case "Tenis ziemny - single":
        return <Image size="small" src={tennisSingle} centered />;
      case "Tenis ziemny - debel":
        return <Image size="small" src={tennisDouble} centered />;
      case "Squash":
        return <Image size="small" src={squash} centered />;
      case "Badminton - single":
        return <Image size="small" src={badmintonSingle} centered />;
      case "Badminton - debel":
        return <Image size="small" src={badmintonDouble} centered />;
      case "Bieganie":
        return <Image size="small" src={running} centered />;
      case "Kolarstwo":
        return <Image size="small" src={cycling} centered />;
      case "Pływanie":
        return <Image size="small" src={swimming} centered />;
      case "Tenis stołowy":
        return <Image size="small" src={pingpong} centered />;
      case "Wspinaczka":
        return <Image size="small" src={climbing} centered />;
      default:
        return <Image size="small" src={soccer} centered />;
    }
  }
  componentDidMount() {
    this.setState({
      eventId: this.props.eventID,
    });
  }

  componentWillMount() {
    const eventID = this.props.eventID;
    const maxPlayers = this.props.maxPlayers;
    this.countEventParticipants(eventID);
    this.checkIfParticipationExists(eventID);
    this.setState({
      eventId: this.props.eventID,
      maxPartcipantNumber: maxPlayers,
    });
  }

  checkIfParticipationExists(eventID) {
    participationService
      .participationExists(eventID)
      .then((response) => {
        this.setState({
          joinned: response,
          isLoading: false,
        });
        console.log(this.state.eventId + " joinned : " + this.state.joinned);
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
  }

  countEventParticipants(eventID) {
    eventService
      .countEventParticipants(eventID)
      .then((response) => {
        this.setState({
          actuallPartcipantNumber: response,
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            actuallPartcipantNumber: 1,
          });
        } else {
          this.setState({
            actuallPartcipantNumber: 1,
          });
        }
      });
  }

  joinEvent = () => {
    console.log("Joining event : " + this.state.eventId);
    this.setState({ isLoading: true });
    participationService
      .joinEvent(this.state.eventId)
      .then((response) => {
        this.setState({
          joinned: true,
          isLoading: false,
        });
        console.log(this.state.eventId + " joinned : " + this.state.joinned);
        this.updateParticipants();
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({});
        } else {
          this.setState({});
        }
      });
  };

  leaveEvent = () => {
    console.log("Leaving event : " + this.state.eventId);
    this.setState({ isLoading: true });
    participationService
      .leaveEvent(this.state.eventId)
      .then((response) => {
        this.setState({
          joinned: false,
          isLoading: false,
        });
        console.log(this.state.eventId + " joinned : " + this.state.joinned);
        this.updateParticipants();
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  updateParticipants() {
    console.log("updating participants");
    eventService
      .countEventParticipants(this.state.eventID)
      .then((response) => {
        this.setState({
          actuallPartcipantNumber: response,
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            actuallPartcipantNumber: 1,
          });
        } else {
          this.setState({
            actuallPartcipantNumber: 1,
          });
        }
      });
  }

  cantBeChanged = () => {
    const timeDifference =
      new Date(this.props.eventDate + " " + this.props.eventTime) - new Date();
    const differenceInHours = Math.abs(timeDifference) / 3.6e6;
    console.log(differenceInHours);
    if (differenceInHours < 6) {
      return true;
    } else {
      return false;
    }
  };

  cancelEvent = () => {
    console.log("Cancelin event : " + this.state.eventId);
    this.setState({ isLoading: true });
    eventService
      .cancelEvent(this.state.eventId)
      .then((response) => {
        this.setState({
          isLoading: false,
          eventStatus: "Anulowane",
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  render() {
    let button;
    if (
      new Date(this.props.eventDate + " " + this.props.eventTime) <= new Date()
    ) {
      button = (
        <Button color="grey" size="huge" disabled>
          <Button.Content visible>Wydarzenie minęło</Button.Content>
        </Button>
      );
    } else if (this.props.eventStatus === "Anulowane") {
      button = (
        <Button color="grey" size="huge" disabled>
          <Button.Content visible>Wydarzenie zostało anulowane</Button.Content>
        </Button>
      );
    } else if (!this.state.joinned) {
      button = (
        <Button
          color="orange"
          size="huge"
          disabled={
            this.state.actuallPartcipantNumber >= this.state.maxPartcipantNumber
          }
          onClick={this.joinEvent}
          loading={this.state.isLoading}
        >
          <Button.Content visible>Dołącz do wydarzenia</Button.Content>
        </Button>
      );
    } else if (this.props.userInitiator === this.props.currentUser.username) {
      let cantBeChanged = this.cantBeChanged();
      console.log(cantBeChanged);
      button = (
        <Grid textAlign="center" stackable columns={1}>
          <Grid.Column>
            <Popup
              trigger={
                <Button
                  fluid
                  compact
                  color="red"
                  size="small"
                  loading={this.state.isLoading}
                  style={{ maxHeight: 60 }}
                  flowing
                  hoverable
                >
                  <Button.Content visible>Anuluj wydarzenie</Button.Content>
                </Button>
              }
              flowing
              hoverable={true}
              position="top center"
            >
              <Grid centered columns={1}>
                <Grid.Column textAlign="center">
                  <Header as="h4">Jesteś pewien? </Header>
                  <Button color="red" onClick={this.cancelEvent}>
                    Tak, anuluj wydarzenie
                  </Button>
                </Grid.Column>
              </Grid>
            </Popup>
            <Link to={`/editEvent/${this.props.eventID}`}>
              <Button
                fluid
                compact
                color="grey"
                size="small"
                loading={this.state.isLoading}
                style={{ maxHeight: 60, marginTop: "10px" }}
                disabled={cantBeChanged}
              >
                <Button.Content visible>Edytuj wydarzenie</Button.Content>
              </Button>
            </Link>
          </Grid.Column>
        </Grid>
      );
    } else {
      button = (
        <Button
          color="red"
          size="huge"
          loading={this.state.isLoading}
          onClick={this.leaveEvent}
        >
          <Button.Content visible>Zrezygnuj z wydarzenia</Button.Content>
        </Button>
      );
    }
    let cyclePeriod = null;
    if (this.props.cyclic) {
      cyclePeriod = this.props.cycleType + " " + this.props.cycleLength;
    } else {
      cyclePeriod = "Wydarzenie jednorazowe";
    }

    if (this.state.isLoading) {
      return <LoadingIndicator />;
    } else
      return (
        <Grid>
          <Grid.Column>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Sport
              </Label>
              <Container>
                <Grid>
                  <Grid.Column verticalAlign="middle" textAlign="center">
                    {this.renderSwitch(this.state.sportsName)}
                    <h4>{this.state.sportsName}</h4>
                  </Grid.Column>
                </Grid>
              </Container>
            </Segment>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Opis
              </Label>
              <Container textAlign="center">
                {this.props.eventDescription}
              </Container>
            </Segment>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Data
              </Label>
              <Container textAlign="center">{this.props.eventDate}</Container>
            </Segment>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Godzina
              </Label>
              <Container textAlign="center">{this.props.eventTime}</Container>
            </Segment>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Cykliczność
              </Label>
              <Container textAlign="center">{cyclePeriod}</Container>
            </Segment>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Czas trwania
              </Label>
              <Container textAlign="center">
                {this.props.eventDuration}
              </Container>
            </Segment>
            {button}
          </Grid.Column>
        </Grid>
      );
  }
}
export default EventData;