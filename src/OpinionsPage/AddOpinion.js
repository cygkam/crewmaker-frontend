import React,{ Component } from 'react'
import { Grid, Segment, Form, Rating, Button, TextArea } from 'semantic-ui-react';
import { userOpinionService } from '../Api/Api';
import { notification } from "antd";

class AddOpinion extends Component {
    constructor(props){
        super(props);
        this.state = {
            userOpinionID : 0,
            userAuthor: "",
            userAbout: "",
            title : "",
            message : "",
            grade : 3,
            isOpinionIncorrect: true,
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleTitleChange(event) {    
        const charCount = event.target.value.length;
        if(charCount >= 60) return;
        else {
            this.setState({title: event.target.value}); 
        }
    }

    handleMessageChange(event) {    
        const charCount = event.target.value.length;
        if(charCount >= 255) return;
        else {
            this.setState({message: event.target.value}); 
        }
    }

    handleRate = (event,{ rating, maxRating }) => {
        this.setState(
            {
                grade : rating
            }
        )
    }

    handleChange (updateRequest) {
        // Here, we invoke the callback with the new value
        this.props.onChange(updateRequest);
      };

    componentWillMount() {
        this.setState({
            userAuthor: this.props.currentUser,
            userAbout: this.props.aboutUser
        })
        if (this.props.opinionData !== null) {
            this.setState({
                userOpinionID : this.props.opinionData.userOpinionID,
                title : this.props.opinionData.title,
                message : this.props.opinionData.message,
                grade : this.props.opinionData.grade
            })
        }
    }

    handleChange (opinionRequest) {
        // Here, we invoke the callback with the new value
        this.props.onChange(opinionRequest);
      };

    handleSubmit() {
        const newOpinionRequest = {
          opinionAuthorName: this.state.userAuthor,
          userAbout: this.state.userAbout,
          title: this.state.title,
          message: this.state.message,
          grade: this.state.grade
        };

        this.handleChange(newOpinionRequest);

        userOpinionService
          .newUserOpinion(newOpinionRequest)
          .then((response) => {
            notification.success({
              message: "New opinion",
              description:
                "Thank you! Your opinion has been added.",
            });
            this.props.handler();
          })
          .catch((error) => {
            notification.error({
              message: "New user opinion",
              description:
                error.message || "Sorry! Something went wrong. Please try again!",
            });
          });
      }
   
    render() {
        const enabled =
          this.state.title.length > 0 &&
          this.state.message.length > 0;    

        return(
            <Grid textAlign = 'center'>
                <Grid.Column >
                    <Grid.Row>
                        <Segment width = {5} textAlign='left' color='orange' padded>
                            <Form>
                                <Form.Field required> 
                                    <label>Tytuł</label>
                                    <input placeholder='Treść tytułu...' 
                                    onChange={this.handleTitleChange}
                                    value={this.state.title}/>
                                </Form.Field>
                                <Rating size='huge' icon='heart' defaultRating={this.state.grade} maxRating={5} onRate={this.handleRate}></Rating>
                                <Form.Field 
                                    control={TextArea}
                                    label='Treść'
                                    placeholder='Treść opinii...' 
                                    required
                                    onChange={this.handleMessageChange}
                                    value={this.state.message}
                                    > 
                                </Form.Field>
                                <Button color='orange' disabled={!enabled} onClick={this.handleSubmit} >Wystaw opinię</Button>
                            </Form>
                        </Segment>
                    </Grid.Row>
                </Grid.Column>
            </Grid>          
        )
    }
}

export default AddOpinion;