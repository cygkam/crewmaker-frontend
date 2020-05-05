import React, { Component } from 'react';
import { Button, Label, Icon, Form, Grid, GridColumn, Image, Header, Segment, Input, List, Container } from 'semantic-ui-react';
import { mainProfileService } from "./Api/Api";

class UserInfoEdit extends Component {
    constructor(propos) {
        super(propos);

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);  

        this.state = {
            login: propos.login,
            email: propos.email,
            telephone: propos.telephone,
            description: propos.description
        };
    }

    handleLoginChange(event) { 
        this.setState({login: event.target.value}); 
    }

    handleDescriptionChange(event) { 
        this.setState({description: event.target.value}); 
    }

    render () {
        return (
            <Grid>
                <Segment>
                    <Label attached='top left'>Login</Label>
                    <Input type="text" value={this.state.login} onChange={this.handleLoginChange}/>
                </Segment>
                <Segment>
                    <Label attached="top left">O mnie</Label>
                    <Container textAlign='left'>
                    <Input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
                    </Container>
                </Segment>
                <Segment textAlign='left'>
                    <Icon name='mail' />
                    {this.state.email}
                </Segment>
                <Segment textAlign='left'>
                    <Icon name='phone' />
                    {this.state.telephone}
                </Segment>
            </Grid>
        )
    }
}
export default UserInfoEdit;
