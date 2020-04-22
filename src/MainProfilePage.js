import React, { Component } from 'react';
import { Button, Label, ButtonContent, Icon, Form, Grid, GridColumn, Image, Header, Segment, Message, ButtonGroup, Modal, GridRow } from 'semantic-ui-react'
import UserInfo from "./UserInfo"
import CommingEvent from "./Events/CommingEvent"
import PassedEvent from "./Events/PassedEvent"

class MainProfilePage extends Component {

    render () {
        return (
            <Grid textAlign='center'  >
                <Grid.Row stretched>
                    <Grid.Column width={4} >
                        <UserInfo />
                    </Grid.Column>

                    <Grid.Column width={5}>
                        <Segment fluid>
                            <Label attached='top'>Twoje aktualne wydarzenia</Label>
                            <Segment>
                                <CommingEvent />
                            </Segment>
                            <Segment>
                                <CommingEvent />
                            </Segment>
                            <Segment>
                                <CommingEvent />
                            </Segment>
                            <Segment>
                                <CommingEvent />
                            </Segment>
                        </Segment>


                    </Grid.Column>

                    <Grid.Column textAlign='center' width={4}>
                        <Segment divided>
                            <Label attached='top'>Historia wydarzeń</Label>
                            <Segment>
                                <PassedEvent />
                            </Segment>
                            <Segment>
                                <PassedEvent />
                            </Segment>
                            <Segment>
                                <PassedEvent />
                            </Segment>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default MainProfilePage;