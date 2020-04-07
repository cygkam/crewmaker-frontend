import React,{Component} from 'react';
import { Button, Form,Grid, GridColumn, Image,Header,Segment,Messag, List } from 'semantic-ui-react'


class UserInfo extends Component {
    constructor(propos){
        super(propos);
        
        this.state = {login: 'login użytkownika',
        email: 'email użytkownika',
        name: 'imie użytkownika',
        surname: 'nazwisko użytkownika',
        photo: 'https://react.semantic-ui.com/images/wireframe/image.png'
      };
    }

    render() {
        return(
            <Grid>
                <Grid.Row>
                    <GridColumn width={7} floated ='left'>
                        <List>
                        <List.Item>
                        <List.Content>
                            <List.Header>Login</List.Header>
                            <List.Description>{this.state.login}</List.Description>       
                        </List.Content>
                        </List.Item>
                        <br></br>
                        <List.Item>
                        <List.Content>
                            <List.Header>Email</List.Header>
                            <List.Description>{this.state.email}</List.Description>       
                        </List.Content>
                        </List.Item>
                        <br></br>
                        <List.Item>
                        <List.Content>
                            <List.Header>Imię</List.Header>
                            <List.Description>{this.state.name}</List.Description>       
                        </List.Content>
                        </List.Item>
                        <br></br>
                        <List.Item>
                        <List.Content>
                            <List.Header>Nazwisko</List.Header>
                            <List.Description>{this.state.surname}</List.Description>       
                        </List.Content>
                    </List.Item>
                </List>
                    </GridColumn >

                    <GridColumn width={4}>
                        <Image src={this.state.photo} style={{minHeight: '200px', minWidth: '200px' }}/>
                    </GridColumn>
                </Grid.Row>
            </Grid> 
            )
    }
}

export default UserInfo;