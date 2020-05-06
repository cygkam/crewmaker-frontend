import React,{Component} from 'react';
import { Grid, GridColumn, Image,Progress, GridRow } from 'semantic-ui-react'
import { eventService } from '../Api/Api';


class CommingEvent extends Component {
    constructor(propos){
        super(propos);
        
        this.state = {
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

    
    componentDidMount() {
        console.log("ID : "  +this.props.dataFromParent.eventPlaceName)
        eventService.countEventParticipants(this.props.dataFromParent)
        .then((response) => {
          this.setState({
            actuallPartcipantNumber : response
          });
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

    render() {
        console.log(this.props.dataFromParent)

        return(
            <Grid divided >
                <GridRow>
                    <GridColumn verticalAlign='center' width={4}>
                        <Image src={this.state.sportIconLink}/>
                        <h4>{this.state.sportName}</h4>
                    </GridColumn>
                    <GridColumn verticalAlign='center' width={4} >
                        <h4>{this.props.dataFromParent.eventTime}</h4>
                        <h4>{this.props.dataFromParent.eventDate}</h4>
                    </GridColumn>
                    <GridColumn verticalAlign='center' width={4} >
                        <h4>{this.state.actuallPartcipantNumber}/{this.props.dataFromParent.maxPlayers}</h4>
                        <h7>UCZESTNIKOW</h7>
                        <Progress percent={(this.state.actuallPartcipantNumber/this.props.dataFromParent.maxPlayers)*100}/>
                    </GridColumn>
                    <GridColumn verticalAlign='center' width={4} >
                        <h4>{this.props.dataFromParent.eventPlaceName}</h4>
                        <h4>{this.props.dataFromParent.eventPlaceStreetName + " " + this.props.dataFromParent.eventPlaceStreetNumber}</h4>
                        <h4>{this.props.dataFromParent.eventPlaceCity}</h4>
                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}

export default CommingEvent;