import React, { Component } from "react";
import { Label, Grid, Segment } from 'semantic-ui-react'
import Participant from "./Participant"
import EventData from "./EventData"
import EventPlace from "./EventPlace"
import { eventViewService } from "../Api/Api"
import LoadingIndicator from "../common/LoadingIndicator";


class EventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            event: null,
            praticipants: "",
            participantsQueue: "",
        }

    }

    componentDidMount () {
        const eventId = this.props.match.params.eventID;
        this.loadEventData(eventId)
    }

    loadEventData (eventID) {
        eventViewService
            .getEventInfo(eventID)
            .then((response) => {
                this.setState({
                    event: response,
                    isLoading: false,
                });
                console.log(response);
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false,
                    });
                }
            });
    }

    render () {
        if (this.state.isLoading) {
            return <LoadingIndicator />;
        } else {
            return (
                <Grid
                    textAlign="center"
                    stackable
                    columns={3}
                >
                    <Grid.Column mobile={16} tablet={8} computer={3}>
                        <Segment>
                            <Label textAlign='center' attached="top" color="orange">Informacje o wydarzeniu</Label>
                            <EventData {...this.state.event} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8} >
                        <Segment>
                            <Label textAlign='center' attached="top" color="orange">Informacje o miejscu</Label>
                            <EventPlace {...this.state.event} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column textAlign="left" mobile={16} tablet={8} computer={3}>
                        <Segment>
                            <Label textAlign='center' attached="top" color="orange">Uczestnicy</Label>
                            <Participant />
                        </Segment>
                    </Grid.Column>
                </Grid>)
        }
    }
}

export default EventView;