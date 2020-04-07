import React,{Component} from 'react';
import { Button,ButtonContent,Icon, Form,Grid, GridColumn, Image,Header,Segment,Message, ButtonGroup } from 'semantic-ui-react'
import UserInfo from "./UserInfo"
import CommingEvent from "./CommingEvent"

class MainProfilePage extends Component {

    render() {
        return(
            <Grid  textAlign='center' columns = {4} >
                <Grid.Row>
                <Grid.Column width={6}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Grid.Column>
                <Grid.Column width={3} >
                    <UserInfo style={{border: '2px solid red'}}/>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width = {5} verticalAlign = 'middle'>
                        <Button.Group vertical color='orange'>
                            <Button animated fluid size = 'massive'> 
                                <Button.Content visible>Stworz wydarzenie</Button.Content>
                                <Button.Content hidden>
                                <Icon name='plus' />
                                </Button.Content>
                            </Button>
                            <Button animated fluid size= 'massive' color = 'orange'>
                                <Button.Content visible>Twoje wydarzenia</Button.Content>
                                <Button.Content hidden>
                                <Icon name='calendar outside' />
                                </Button.Content>
                            </Button>
                            <Button animated fluid size='massive' color = 'orange'>
                                <Button.Content visible>Przeglądaj swoje opinie</Button.Content>
                                <Button.Content hidden>
                                <Icon name='user' />
                                </Button.Content>
                            </Button>
                    </Button.Group>

                    </Grid.Column>
                    <Grid.Column textAlign = 'center' width={4}>
                        <Header as='h2' color ='orange' textAlign='center'>
                        Ostatnie aktywności
                        </Header>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Grid.Column>
                </Grid.Row>
          </Grid>            
        )
    }
}

export default MainProfilePage;