import React,{Component} from 'react';
import { Button, Form,Grid, GridColumn, Image,Progress, List, GridRow } from 'semantic-ui-react'


class CommingEvent extends Component {
    constructor(propos){
        super(propos);
        
        this.state = {
            sportName: 'Piłeczka',
            sportIconLink: 'https://ecsmedia.pl/c/serwetki-pilka-nozna-33-cm-20-sztuk-w-iext54112696.jpg',
            eventDate: new Date(2020, 5, 3, 10,30),
            actuallPartcipantNumber: 1,
            maxPartcipantNumber: 3,
            placeName: 'SUPER MIEJSCOWA',
            streetName: 'SUPER ULICA',
            streetNumber: 'SUPER NUMER',
            city: 'SUPER MIASTO'
      };
    }

    render() {
        return(
            <Grid>
                <GridRow>
                    <GridColumn width={1}>
                        <Image src={this.state.sportIconLink}/>
                        <h4>{this.state.sportName}</h4>
                    </GridColumn>
                    <GridColumn width={1}>
                        <h4>{this.state.eventDate.getHours}:{this.state.eventDate.getMinutes}</h4>
                        <h5>{this.state.eventDate.getDate}-{this.state.eventDate.getMonth}-{this.state.eventDate.getFullYear}</h5>
                    </GridColumn>
                    <GridColumn width={1}>
                        <h4>{this.state.actuallPartcipantNumber}/{this.state.maxPartcipantNumber}</h4>
                        <h7>UCZESTNIKOW</h7>
                        <Progress percent={this.state.actuallPartcipantNumber/this.state.maxPartcipantNumber}/>
                    </GridColumn>
                    <GridColumn width={2}>
                        <h4>{this.state.placeName}</h4>
                        <h4>{this.state.streetName + " " + this.state.streetNumber}</h4>
                        <h4>{this.state.placeName}</h4>
                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}

export default CommingEvent;