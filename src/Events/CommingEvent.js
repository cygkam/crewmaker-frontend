import React,{Component} from 'react';
import { Button, Form,Grid, GridColumn, Image,Progress, List, GridRow } from 'semantic-ui-react'


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

    render() {
        return(
            <Grid divided >
                <GridRow>
                    <GridColumn verticalAlign='center' width={4}>
                        <Image src={this.state.sportIconLink}/>
                        <h4>{this.state.sportName}</h4>
                    </GridColumn>
                    <GridColumn verticalAlign='center' width={4} >
                        <h4>21:30</h4>
                        <h4>21-03-2020</h4>
                    </GridColumn>
                    <GridColumn verticalAlign='center' width={4} >
                        <h4>{this.state.actuallPartcipantNumber}/{this.state.maxPartcipantNumber}</h4>
                        <h7>UCZESTNIKOW</h7>
                        <Progress percent={(this.state.actuallPartcipantNumber/this.state.maxPartcipantNumber)*100}/>
                    </GridColumn>
                    <GridColumn verticalAlign='center' width={4} >
                        <h4>{this.state.placeName}</h4>
                        <h4>{this.state.streetName + " " + this.state.streetNumber}</h4>
                        <h4>{this.state.city}</h4>
                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}

export default CommingEvent;