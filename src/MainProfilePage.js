import React,{Component} from 'react';
import { Button,Label,ButtonContent,Icon, Form,Grid, GridColumn, Image,Header,Segment,Message, ButtonGroup, Modal, GridRow } from 'semantic-ui-react'
import UserInfo from "./UserInfo"
import CommingEvent from "./CommingEvent"
import PassedEvent from "./PassedEvent"

class MainProfilePage extends Component {

    render() {
        return(
            <Grid  textAlign='center'  >
                <Grid.Row stretched>
                <Grid.Column width={4} >
                    <UserInfo/>
                </Grid.Column>

                <Grid.Column width={5}>
                    <Segment>
                            <Label attached='top'>Twoje aktualne wydarzenia</Label>
                            <Grid>
                                <GridRow>
                                    <CommingEvent/>
                                </GridRow>
                            </Grid>
                    </Segment>
                    
                </Grid.Column>

                <Grid.Column textAlign = 'center' width={4}>
                    <Segment>
                            <Label attached='top'>Historia wydarzeń</Label>
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Segment>
                </Grid.Column>
                </Grid.Row>
          </Grid>            
        )
    }
}

export default MainProfilePage;