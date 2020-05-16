import React, { Component } from 'react';
import { Grid, GridColumn, Image, Progress, GridRow } from 'semantic-ui-react';
import { eventService } from '../Api/Api';
import LoadingIndicator from "../common/LoadingIndicator";
import { Link } from "react-router-dom";


class CommingEvent extends Component {
  constructor(propos) {
    super(propos);

    this.state = {
      eventID: "",
      sportName: 'Piłka nożna',
      sportIconLink: 'https://ecsmedia.pl/c/serwetki-pilka-nozna-33-cm-20-sztuk-w-iext54112696.jpg',
      eventDate: '',
      actuallPartcipantNumber: 1,
      maxPartcipantNumber: 3,
      placeName: 'Nazwa miejsca',
      streetName: 'Nazwa ulicy',
      streetNumber: 'numer',
      city: 'Miasto'
    };
  }


  componentDidMount () {
    if (this.props.dataFromParent.eventID !== undefined) {
      eventService.countEventParticipants(this.props.dataFromParent.eventID)
        .then((response) => {
          this.setState({
            eventID: this.props.dataFromParent.eventID,
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
  }

  render () {
    if (this.props.isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <Link to={`/eventView/${this.state.eventID}`} >
        <Grid divided>
          <GridRow>
            <GridColumn verticalAlign='middle' width={4}>
              <Image src={this.state.sportIconLink} />
              <h4>{this.state.sportName}</h4>
            </GridColumn>
            <GridColumn verticalAlign='middle' width={4} >
              <h4>{this.props.dataFromParent.eventTime}</h4>
              <h5>{this.props.dataFromParent.eventDate}</h5>
            </GridColumn>
            <GridColumn verticalAlign='middle' width={4} >
              <h4>{this.state.actuallPartcipantNumber}/{this.props.dataFromParent.maxPlayers}</h4>
              <h6>UCZESTNIKOW</h6>
              <Progress percent={(this.state.actuallPartcipantNumber / this.props.dataFromParent.maxPlayers) * 100} />
            </GridColumn>
            <GridColumn verticalAlign='middle' width={4} >
              <h4>{this.props.dataFromParent.eventPlaceName}</h4>
              <h4>{this.props.dataFromParent.eventPlaceStreetName + " " + this.props.dataFromParent.eventPlaceStreetNumber}</h4>
              <h4>{this.props.dataFromParent.eventPlaceCity}</h4>
            </GridColumn>
          </GridRow>
        </Grid>
      </Link>

    )
  }
}

export default CommingEvent;