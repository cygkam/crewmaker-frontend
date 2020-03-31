import React,{Component} from 'react';
import { Button, Form,Grid, GridColumn, Image,Header,Segment,Message } from 'semantic-ui-react'
import UserInfo from "./UserInfo"

class MainProfilePage extends Component {

    render() {
        return(
            <Grid  textAlign='center' verticalAlign='middle'>
                <Grid.Column width={5}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Grid.Column>
            
                <Grid.Column width={3}>
                    <UserInfo style={{border: '2px solid red'}}/>
                </Grid.Column>
          </Grid>            
        )
    }
}

export default MainProfilePage;