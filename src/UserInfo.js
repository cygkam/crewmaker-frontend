import React,{Component} from 'react';
import { Button, Label,Icon, Form,Grid, GridColumn, Image,Header,Segment,Messag, List, Container } from 'semantic-ui-react'


class UserInfo extends Component {
    constructor(propos){
        super(propos);
        
        this.state = {
        login: 'login użytkownika',
        email: 'email użytkownika',
        name: 'imie użytkownika',
        surname: 'nazwisko użytkownika',
        photo: 'https://react.semantic-ui.com/images/wireframe/image.png'
      };
    }

    render() {
        return(
            <Grid>
                <GridColumn> 
                    <Grid.Row>
                        <Button fluid size='massive' animated color='orange'>
                        <Button.Content visible>Znajdź ekipę</Button.Content>
                        <Button.Content hidden>
                            <Icon name='group' />
                        </Button.Content>
                    </Button>
                    
                        <Segment>
                            <Label attached='top'>Login</Label>
                            <Image fluid src={this.state.photo} style={{minHeight: '200px', minWidth: '200px' }}/>
                        </Segment>
                    
                        <Segment>
                            <Label attached="top left">O mnie</Label>
                            <Container textAlign='left'>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Vivamus nunc ipsum, consequat dictum est at, lobortis viverra nisl. 
                                    Maecenas facilisis, sapien nec sollicitudin lacinia, tellus ex rutrum nulla,
                                    a egestas justo mi non mi.
                                </p>
                            
                            </Container>
                        </Segment>
                    
                        <Segment textAlign ='left'>
                            <Icon name='mail' />
                            user@example.com
                        </Segment>
                        <Segment textAlign = 'left'>
                            <Icon name='phone' />
                            111-111-111
                        </Segment>
                    </Grid.Row>
                </GridColumn>
                
            </Grid>
            )
    }
}

export default UserInfo;