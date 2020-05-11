import React, { Component } from 'react';
import { Grid, GridColumn, Image, Progress, GridRow,Button } from 'semantic-ui-react'
import { eventService, participationService } from '../Api/Api';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants'
import { Link } from "react-router-dom";



class EventAvaliable extends Component {
  constructor(propos) {
    super(propos);

    this.state = {
      eventID : 0,
      sportName: 'Piłka nożna',
      sportIconLink: 'https://ecsmedia.pl/c/serwetki-pilka-nozna-33-cm-20-sztuk-w-iext54112696.jpg',
      eventDate: '',
      actuallPartcipantNumber: 1,
      maxPartcipantNumber: 3,
      placeName: 'Nazwa miejsca',
      streetName: 'Nazwa ulicy',
      streetNumber: 'numer',
      city: 'Miasto',
      eventTime: '',
      joinned : false,
      isLoading : false
    };
  }


  componentDidMount () {
    if (this.props.dataFromParent.eventID !== undefined) {
      eventService.countEventParticipants(this.props.dataFromParent.eventID)
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

    participationService.participationExists(this.state.eventID)
        .then((response) => {
          this.setState({
            joinned : response
          });
          console.log(this.state.eventID + " joinned : " + this.state.joinned);
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
  componentWillMount() {
      this.setState({
        eventID : this.props.dataFromParent.eventID,
        sportName: this.props.dataFromParent.eventSportName,
        sportIconLink: 'https://ecsmedia.pl/c/serwetki-pilka-nozna-33-cm-20-sztuk-w-iext54112696.jpg',
        eventDate: this.props.dataFromParent.eventDate,
        eventTime : this.props.dataFromParent.eventTime,
        actuallPartcipantNumber: 1,
        maxPartcipantNumber: this.props.dataFromParent.maxPlayers,
        placeName: this.props.dataFromParent.eventPlaceName,
        streetName: this.props.dataFromParent.eventPlaceStreetName,
        streetNumber: this.props.dataFromParent.eventPlaceStreetNumber,
        city: this.props.dataFromParent.eventPlaceCity
      })
      console.log(this.state.eventID)

      
  }

  joinEvent = () => {
      console.log("Joining event : " + this.state.eventID)
      this.setState({isLoading : true});
      participationService.joinEvent(this.state.eventID)
        .then((response) => {
          this.setState({
            joinned : true,
            isLoading : false
          });
          console.log(this.state.eventID + " joinned : " + this.state.joinned);
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

  render () {
    return (
      <Link to={`/eventView/${this.state.eventID}`}>
        <Grid divided >
          <GridRow>
            <GridColumn textAlign='center' verticalAlign='middle' width={2}>
              <Image src={this.state.sportIconLink} />
              <h4>{this.state.sportName}</h4>
            </GridColumn>
            <GridColumn verticalAlign='middle' width={3} >
              <h4>{this.state.eventTime}</h4>
              <h5>{this.state.eventDate}</h5>
            </GridColumn>
            <GridColumn verticalAlign='middle' width={4} >
              <h4>{this.state.actuallPartcipantNumber}/{this.state.maxPartcipantNumber}</h4>
              <h6>UCZESTNIKOW</h6>
              <Progress percent={(this.state.actuallPartcipantNumber / this.state.maxPartcipantNumber) * 100} />
            </GridColumn>
            <GridColumn verticalAlign='middle' width={4} >
              <h4>{this.state.placeName}</h4>
              <h4>{this.state.streetName + " " + this.state.streetNumber}</h4>
              <h4>{this.state.city}</h4>
            </GridColumn>
            <GridColumn textAlign='center' verticalAlign='middle' width={3}>
              <Link>
                <Button color='orange' disabled={this.state.actuallPartcipantNumber>= this.state.maxPartcipantNumber || this.state.joinned}
                onClick={this.joinEvent}
                loading={this.state.isLoading}
                >
                    <Button.Content visible>Dołącz do wydarzenia</Button.Content>
                </Button>
              </Link>
            </GridColumn>
          </GridRow>
        </Grid>
      </Link>
    )
  }
}

export default EventAvaliable;