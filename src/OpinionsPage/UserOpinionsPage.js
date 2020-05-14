import React,{ Component } from 'react'
import {Dimmer, Segment, Grid, Header, Button,Icon, Loader } from 'semantic-ui-react';
import UserOpinion from './UserOpinion';
import { userOpinionService } from '../Api/Api';
import LoadingIndicator from "../common/LoadingIndicator";

class UserOpinionsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            aboutUsername : "",
            opinions : [],
            isLoading : true
        }
    }

    componentDidMount () {
        const about = this.props.match.params.username;
        this.setState({
            aboutUsername : about
        })
        console.log("Username " + this.state.aboutUsername);
        this.loadOpinons(about);
    }

    loadOpinons(username){
        userOpinionService
        .getOpinions(username)
        .then((response) => {
            this.setState({
              opinions: response,
              isLoading: false,
            });
            console.log(this.state.opinions);
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


    render() {
        if(this.state.isLoading){
            return  <LoadingIndicator></LoadingIndicator>
        } else {
        return(           
            <Grid textAlign='center'>
                <Grid.Row>
                    <Grid.Column width={10} verticalAlign='middle'>
                        <Segment>

                            <Header textAlign='center' as='h1' color='orange'>
                                 Opinie o uzytkowniku {this.state.aboutUsername} 
                                 <Button floated='right' animated color='orange'>
                                <Button.Content visible>Dodaj opinię</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='plus' />
                                </Button.Content>
                            </Button>                   
                            </Header>
                                    
                            
                        </Segment>
                        
                        {this.state.opinions.length>0&&
                        this.state.opinions.map(
                            (opinion =>
                                <UserOpinion key={opinion.userOpinionID} opinionData={opinion}>
                                </UserOpinion>)
                        )
                        } 
                        
                         {this.state.opinions.length ===0&&
                            <Segment>
                                 <Header as='h1' color='orange'>
                                     Brak opinii o użytkowniku
                                 </Header>
                            </Segment>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        )
                    }
                    
    }
}

export default UserOpinionsPage;