import React, { Component } from "react";
import {Button, Segment, Image, Grid, Label, Container} from "semantic-ui-react";
import { eventService, participationService } from '../Api/Api';
import LoadingIndicator from "../common/LoadingIndicator";
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
      sportsName: "Koszykówka",
      sportsIcon:
        "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F3C0-basketball-512.png",
      description: "Opis",
      date: "26-05-2020",
      time: "10:30",
      cyclePeriod: "Co dwa tygodnie",
      duration: "1:30",
      joinned: false,
      actuallPartcipantNumber: 1,
      maxPartcipantNumber: 3,
      isLoading: true,
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
    if (this.props.eventID !== undefined) {
      this.setState({
        eventId: this.props.eventID,
        sportsName: this.props.eventSportName,
        description: this.props.eventDescription,
        date: this.props.eventDate,
        time: this.props.eventTime,
        maxPartcipantNumber: this.props.maxPlayers,
        // cyclePeriod: this.props.dataFromParent,
        duration: this.props.eventDuration,
      });
      if (this.props.cyclic) {
        this.setState({
          cyclePeriod: this.props.cycleType + " " + this.props.cycleLength,
        });
      } else {
        this.setState({ cyclePeriod: "Wydarzenie jednorazowe" });
      }
    }

    eventService
      .countEventParticipants(this.props.eventID)
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

    participationService
      .participationExists(this.props.eventID)
      .then((response) => {
        this.setState({
          joinned: response,
          isLoading: false,
        });
        console.log(this.state.eventID + " joinned : " + this.state.joinned);
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
        console.log(this.state.eventID + " joinned : " + this.state.joinned);
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

  render() {
    let button;
    if (new Date(this.props.eventDate) <= new Date()) {
      button = (
        <Button color="grey" size="huge" disabled>
          <Button.Content visible>Wydarzenie minęło</Button.Content>
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
              <Container textAlign="center">{this.state.description}</Container>
            </Segment>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Data
              </Label>
              <Container textAlign="center">{this.state.date}</Container>
            </Segment>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Godzina
              </Label>
              <Container textAlign="center">{this.state.time}</Container>
            </Segment>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Cykliczność
              </Label>
              <Container textAlign="center">{this.state.cyclePeriod}</Container>
            </Segment>
            <Segment textAlign="left">
              <Label textAlign="left" attached="top" color="orange">
                Czas trwania
              </Label>
              <Container textAlign="center">{this.state.duration}</Container>
            </Segment>
            {button}
          </Grid.Column>
        </Grid>
      );
  }
}

export default EventData;