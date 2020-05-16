import React, { Component } from "react";
import {Button, Segment, Image, Grid, Label, Container} from "semantic-ui-react";
import { eventService, participationService } from '../Api/Api';
import LoadingIndicator from "../common/LoadingIndicator";

class EventData extends Component {
    constructor(props) {
      super(props);

      this.state = {
          eventId: "",
          sportsName: "Koszykówka",
          sportsIcon: "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F3C0-basketball-512.png",
          description: "Opis",
          date: "26-05-2020",
          time: "10:30",
          cyclePeriod: "Co dwa tygodnie",
          duration: '1:30',
          joinned : false,
          actuallPartcipantNumber: 1,
          maxPartcipantNumber: 3,
          isLoading : true
      }
    }

    componentDidMount () {
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
        })
        if(this.props.cyclic) {
          this.setState({
            cyclePeriod: this.props.cycleType + " " + this.props.cycleLength
          })
        } else {
          this.setState({cyclePeriod: 'Wydarzenie jednorazowe'})
        }
      }

      eventService.countEventParticipants(this.props.eventID)
        .then((response) => {
          this.setState({
            actuallPartcipantNumber: response
          });
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              actuallPartcipantNumber: 1
            });
          } else {
            this.setState({
              actuallPartcipantNumber: 1
            });
          }
        });

        participationService.participationExists(this.props.eventID)
        .then((response) => {
          this.setState({
            joinned : response,
            isLoading: false
          });
          console.log(this.state.eventID + " joinned : " + this.state.joinned);
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
                isLoading: false
            });
          } else {
            this.setState({
                isLoading: false
            });
          }
        });
    }

    joinEvent = () => {
        console.log("Joining event : " + this.state.eventId)
        this.setState({isLoading : true});
        participationService.joinEvent(this.state.eventId)
          .then((response) => {
            this.setState({
              joinned : true,
              isLoading : false
            });
            console.log(this.state.eventId + " joinned : " + this.state.joinned);
            this.updateParticipants()
          })
          .catch((error) => {
            if (error.status === 404) {
              this.setState({
                
              });
            } else {
              this.setState({
                
              });
            }
          });
    }
    
    updateParticipants (){
    
        console.log("updating participants");
        eventService.countEventParticipants(this.state.eventID)
        .then((response) => {
          this.setState({
            actuallPartcipantNumber: response
          });
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              actuallPartcipantNumber: 1
            });
          } else {
            this.setState({
              actuallPartcipantNumber: 1
            });
          }
        });
      }

    render() {
        let button;
        if(!this.state.joinned) {
            button = <Button color='orange' size='huge' 
                             disabled={this.state.actuallPartcipantNumber>= this.state.maxPartcipantNumber || this.state.joinned}
                             onClick={this.joinEvent}
                             loading={this.state.isLoading}>
                            <Button.Content visible>Dołącz do wydarzenia</Button.Content>
                     </Button>
        } else {
            button = <Button color='red' size='huge' 
                             loading={this.state.isLoading}
                             >
                            <Button.Content visible>Zrezygnuj z wydarzenia</Button.Content>
                     </Button>
        }
        if (this.state.isLoading) {
            return <LoadingIndicator />;
        } else return(
                <Grid>
                    <Grid.Column>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Sport</Label>
                                <Container>
                                    <Grid>
                                        <Grid.Column textAlign='center'>
                                            {this.state.sportsName}
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Image src={this.state.sportsIcon}/>
                                        </Grid.Column>
                                    </Grid>
                                </Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Opis</Label>
                                <Container textAlign='center' >{this.state.description}</Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Data</Label>
                                <Container textAlign='center'>{this.state.date}</Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Godzina</Label>
                                <Container textAlign='center'>{this.state.time}</Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Cykliczność</Label>
                                <Container textAlign='center'>{this.state.cyclePeriod}</Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Czas trwania</Label>
                                <Container textAlign='center'>{this.state.duration}</Container>
                            </Segment>
                            {button}
                    </Grid.Column>
                </Grid>
        )
    }
}

export default EventData;