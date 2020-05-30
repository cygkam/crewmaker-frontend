import React,{ Component } from 'react'
import {Dimmer, Segment, Grid, Header, Button,Icon, Loader } from 'semantic-ui-react';
import { userOpinionService } from '../Api/Api';
import LoadingIndicator from "../common/LoadingIndicator";
import UserOpinion from "./UserOpinion"
import AddOpinion from "./AddOpinion"


class UserOpinionsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            aboutUsername : "",
            currentUser: "",
            currentUserOpinion: null,
            opinions : [],
            isLoading : true,
            opinionAdding: false
        }

        this.opinionEditionHandler = this.changeOpinionEditionPanel.bind(this);
    }

    changeOpinionEditionPanel(){
        this.setState({
            opinionAdding: !this.state.opinionAdding,
        })
    }

    handleCommentChange = (newComment) => {
        this.setState({ 
            currentUserOpinion: newComment
        });
        console.log(this.state.currentUserOpinion)
      };

    componentDidMount () {
        const about = this.props.match.params.username;
        const current = this.props.currentUser.username;
        this.setState({
            aboutUsername : about,
            currentUser: current
        })
        console.log("Username " + this.state.aboutUsername);
        this.loadOpinions(about, current);
        this.loadOpinion(about, current);
    }

    loadOpinions(username, current){
        userOpinionService
        .getOpinions(username, current)
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

    
    loadOpinion(username, current){
        userOpinionService
        .getOpinion(username, current)
        .then((response) => {
            this.setState({
                currentUserOpinion: response,
                isLoading: false,
            });
            console.log(this.state.currentUserOpinion)
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
        let opinionButton = 
            <Button floated='right' animated color='orange' onClick={this.opinionEditionHandler}>
                <Button.Content visible>Dodaj opinię</Button.Content>
                <Button.Content hidden>
                    <Icon name='plus' />
                </Button.Content>
            </Button>
        if(this.state.opinionAdding) {
            opinionButton = 
            <Button floated='right' negative onClick={this.opinionEditionHandler}>Anuluj</Button>
        } else if(this.state.currentUserOpinion != null) {
            opinionButton =
                <Button floated='right' animated color='orange' onClick={this.opinionEditionHandler}>
                    <Button.Content visible>Edytuj opinię</Button.Content>
                    <Button.Content hidden>
                        <Icon name='plus' />
                    </Button.Content>
                </Button>   
        }

        let userOpinion = null;
        if(this.state.currentUserOpinion != null && !this.state.opinionAdding) {
            userOpinion = <UserOpinion key={this.state.currentUserOpinion.userOpinionID} opinionData={this.state.currentUserOpinion}></UserOpinion>
        } else if(this.state.opinionAdding) {
            userOpinion = <AddOpinion aboutUser={this.state.aboutUsername} currentUser={this.state.currentUser}
                            opinionData={this.state.currentUserOpinion} handler={this.opinionEditionHandler} onChange={this.handleCommentChange}></AddOpinion>
        }
        
        let opinionsHeader = 
        <Segment>
            <Header textAlign='center' as='h1' color='orange'>
                Opinie o uzytkowniku {this.state.aboutUsername} 
                {opinionButton}               
            </Header>
            {userOpinion}
        </Segment>

        if(this.state.currentUser === this.state.aboutUsername) {
            opinionsHeader = 
                <Segment>
                    <Header textAlign='center' as='h1' color='orange'>
                        Opinie o Tobie
                    </Header>
                </Segment>
        }

        if(this.state.isLoading){
            return  <LoadingIndicator></LoadingIndicator>
        } else {
        return(           
            <Grid textAlign='center'>
                <Grid.Row>
                    <Grid.Column width={10} verticalAlign='middle'>
                        {opinionsHeader}
                        
                        {this.state.opinions.length>0&&
                        this.state.opinions.map(
                            (opinion =>
                                <UserOpinion key={opinion.userOpinionID} opinionData={opinion}>
                                </UserOpinion>)
                        )
                        } 
                        
                         {this.state.opinions.length ===0 && this.state.currentUserOpinion == null &&
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