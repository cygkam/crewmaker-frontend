import React, { Component } from "react";
import {Segment, Image, Grid, Label, Container} from "semantic-ui-react";
import { eventViewService } from '../Api/Api';

class EventData extends Component {
    constructor(props) {
      super(props);

      this.state = {
          sportsName: "Koszykówka",
          sportsIcon: "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F3C0-basketball-512.png",
          description: "Opis",
          date: "26-05-2020",
          time: "10:30",
          cyclePeriod: "Co dwa tygodnie",
          duration: '1:30'
      }
    }

    componentDidMount () {
      if (this.props.eventID !== undefined) {
        this.setState({
          sportsName: this.props.eventSportName,
          description: this.props.eventDescription,
          date: this.props.eventDate,
          time: this.props.eventTime,
          // cyclePeriod: this.props.dataFromParent,
          duration: this.props.eventDuration,
        })
        if(this.props.cyclic) {
          this.setState({
            cyclePeriod: this.props.cycleType + " " + this.props.cyclePeriod
          })
        } else {
          this.setState({cyclePeriod: 'Wydarzenie jednorazowe'})
        }
      }
    }

    render() {
        return(
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
                </Grid.Column>
            </Grid>
        )
    }
}

export default EventData;