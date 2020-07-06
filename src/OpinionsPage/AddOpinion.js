import React,{ Component } from 'react'
import { Grid, Segment, Form, Rating, Button, TextArea } from 'semantic-ui-react';
import { userOpinionService } from '../Api/Api';
import { notification } from "antd";
import { validation } from "../Register/validationRules"

class AddOpinion extends Component {
    constructor(props){
        super(props);
        this.state = {
            userOpinionID : 0,
            userAuthor: "",
            userAbout: "",
            title : {
                value: ""
            },
            message : {
                value: ""
            },
            grade : 3,
            isOpinionIncorrect: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
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
                title : {
                    value: this.props.opinionData.title
                },
                message : {
                    value: this.props.opinionData.message
                },
                grade : this.props.opinionData.grade
            })
        }
    }

    handleFieldChange(event, validationFunction) {
        const target = event.target;
        const inputValue = target.value;
        const inputName = target.name;
    
        this.setState({
          [inputName]: {
            value: inputValue,
            ...validationFunction(inputValue),
          },
        });
      }

    handleChange (opinionRequest) {
        // Here, we invoke the callback with the new value
        this.props.onChange(opinionRequest);
      };

    handleSubmit() {
        const newOpinionRequest = {
          opinionAuthorName: this.props.currentUser,
          userAbout: this.props.aboutUser,
          title: this.state.title.value,
          message: this.state.message.value,
          grade: this.state.grade
        };

        this.handleChange(newOpinionRequest);

        userOpinionService
          .newUserOpinion(newOpinionRequest)
          .then((response) => {
            notification.success({
              message: "Nowa opinia!",
              description:
                "Dziękujemy! Twoja opinia została dodana pomyślnie.",
            });
            this.props.handler();
          })
          .catch((error) => {
            notification.error({
              message: "New user opinion",
              description:
                error.message || "Przeprasza, coś poszło nie tak. Spróbuj jeszcze raz!",
            });
          });
      }

    isFormInvalid() {
    return !(
        (this.state.title.validateStatus === "success" || this.state.title.validateStatus == null) &&
        (this.state.message.validateStatus === "success" || this.state.message.validateStatus == null)
        ); 
    }
   
    render() {
        let titleInput = null 
        if(this.state.title.validateStatus === "success" || this.state.title.validateStatus == null ) {
            titleInput =
                <Form.Input 
                    required
                    autoComplete="off"
                    label="Tytuł"
                    placeholder="Treść tytułu..."
                    name="title"
                    onChange={(event) =>
                        this.handleFieldChange(event, validation.validateUserOpinionTitle)
                    }
                    value={this.state.title.value}
                />
            } else {
              titleInput = 
                <Form.Input 
                    required
                    autoComplete="off"
                    label="Tytuł"
                    error={{ content: this.state.title.errorMsg, pointing: 'below' }}
                    placeholder="Treść tytułu..."
                    name="title"
                    onChange={(event) =>
                        this.handleFieldChange(event, validation.validateUserOpinionTitle)
                    }
                    value={this.state.title.value}
                />
            }

        let messageInput = null 
        if(this.state.message.validateStatus === "success" || this.state.message.validateStatus == null ) {
            messageInput =
                <Form.Input 
                    required
                    control={TextArea}
                    autoComplete="off"
                    label="Treść"
                    placeholder="Treść opinii..."
                    name="message"
                    onChange={(event) =>
                        this.handleFieldChange(event, validation.validateUserOpinionMessage)
                    }
                    value={this.state.message.value}
                />
            } else {
                messageInput =
                    <Form.Input 
                        required
                        control={TextArea}
                        autoComplete="off"
                        label="Treść"
                        error={{ content: this.state.message.errorMsg, pointing: 'below' }}
                        placeholder="Treść opinii..."
                        name="message"
                        onChange={(event) =>
                            this.handleFieldChange(event, validation.validateUserOpinionMessage)
                        }
                        value={this.state.message.value}
                    />
            }

        return(
            <Grid textAlign = 'center'>
                <Grid.Column >
                    <Grid.Row>
                        <Segment width = {5} textAlign='left' color='orange' padded>
                            <Form>
                                {titleInput}
                                <Rating size='huge' icon='heart' defaultRating={this.state.grade} maxRating={5} onRate={this.handleRate}></Rating>
                                {messageInput}
                                <Button color='orange' disabled={this.isFormInvalid()} onClick={this.handleSubmit} >Wystaw opinię</Button>
                            </Form>
                        </Segment>
                    </Grid.Row>
                </Grid.Column>
            </Grid>          
        )
    }
}

export default AddOpinion;