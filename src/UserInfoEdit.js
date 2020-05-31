import React, { Component } from 'react';
import { Button, Label, Form, Grid, GridColumn, TextArea, Segment, Input, Container } from 'semantic-ui-react';
import { mainProfileService } from "./Api/Api";
import { validation } from "./Register/validationRules"
import { notification } from "antd";
import { USER } from "./constants";
import userService from "./Api/Api";


class UserInfoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "login",
      name: {
        value: "imie"
      },
      surname: {
        value: "nazwisko"
      },
      email: {
        value: "email użytkownika"
      },
      phoneNumber: {
        value: "telefon użytkownika"
      },
      photoLink: "https://react.semantic-ui.com/images/wireframe/image.png",
      description: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  handleChange (updateRequest) {
    // Here, we invoke the callback with the new value
    this.props.onChange(updateRequest);
  };

  componentDidMount() {
    this.setState((props) => ({
      username: this.props.username,
      name: {
        value: this.props.name
      },
      surname: {
        value: this.props.surname
      },
      email: {
        value: this.props.email
      },
      phoneNumber: {
        value: this.props.phoneNumber
      },
      photoLink: this.props.photoLink,
      description: this.props.description,
    }));
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

  handleSubmit(event) {
    const updateRequest = {
      username: this.state.username,
      email: this.state.email.value,
      name: this.state.name.value,
      surname: this.state.surname.value,
      phoneNumber: this.state.phoneNumber.value,
      photoLink: this.props.photoLink,
      description: this.state.description,
    };
    this.handleChange(updateRequest);
    
    mainProfileService
      .updateUser(updateRequest)
      .then((response) => {
        notification.success({
          message: "Zmiana danych",
          description: "Dane zostały pomyślnie zmienione!",
        });

        localStorage.setItem(USER, JSON.stringify(updateRequest));
        this.props.handler();
      })
      .catch((error) => {
        notification.error({
          message: "Data change",
          description: error.message || "Przepraszamy, coś poszło nie tak",
        });
      });
  }

  isFormInvalid() {
    return !(
      (this.state.name.validateStatus === "success" || this.state.name.validateStatus == null) &&
      (this.state.surname.validateStatus === "success" || this.state.surname.validateStatus == null) &&
      (this.state.email.validateStatus === "success" || this.state.email.validateStatus == null || this.state.email.value == this.props.email)
    ); 
  }

  render() {

    let nameInput = null 
    if(this.state.name.validateStatus == "success" || this.state.name.validateStatus == null ) {
      nameInput =
        <Form>
          <Form.Input
            placeholder="Imię"
            name="name"
            style={{ width: "100%" }}
            value={this.state.name.value}
            onChange={(event) =>
              this.handleFieldChange(event, validation.validateName)
            }
          ></Form.Input>
        </Form>
      } else {
        nameInput = 
          <Form>
            <Form.Input
              placeholder="Imię"
              name="name"
              error={{ content: this.state.name.errorMsg, pointing: 'below' }}
              style={{ width: "100%" }}
              value={this.state.name.value}
              onChange={(event) =>
                this.handleFieldChange(event, validation.validateName)
              }
            ></Form.Input>
          </Form>
      }

      let surnameInput = null
      if(this.state.surname.validateStatus == "success" || this.state.surname.validateStatus == null ) {
        surnameInput =
          <Form>
            <Form.Input
              placeholder="Nazwisko"
              name="surname"
              style={{ width: "100%" }}
              value={this.state.surname.value}
              onChange={(event) =>
                this.handleFieldChange(event, validation.validateSurname)
              }
            ></Form.Input>
          </Form>
        } else {
          surnameInput = 
            <Form>
              <Form.Input
                placeholder="Nazwisko"
                name="surname"
                error={{ content: this.state.surname.errorMsg, pointing: 'below' }}
                style={{ width: "100%" }}
                value={this.state.surname.value}
                onChange={(event) =>
                  this.handleFieldChange(event, validation.validateSurname)
                }
              ></Form.Input>
            </Form>
        }

      let emailInput = null
      if(this.state.email.validateStatus == "success" || this.state.email.validateStatus == null || this.state.email.value == this.props.email) {
        emailInput =
          <Form>
            <Form.Input
              placeholder="Email"
              name="email"
              style={{ width: "100%" }}
              value={this.state.email.value}
              onChange={(event) =>
                this.handleFieldChange(event, validation.validateEmail)
              }
              onBlur={this.validateEmailAvailability}
            ></Form.Input>
          </Form>
        } else {
          emailInput = 
            <Form>
              <Form.Input
                placeholder="Email"
                name="email"
                error={{ content: this.state.email.errorMsg, pointing: 'below' }}
                style={{ width: "100%" }}
                value={this.state.email.value}
                onChange={(event) =>
                  this.handleFieldChange(event, validation.validateEmail)
                }
                onBlur={this.validateEmailAvailability}
              ></Form.Input>
            </Form>
        }

      let phoneNumberInput = null
      if(this.state.phoneNumber.validateStatus == "success" || this.state.phoneNumber.validateStatus == null ) {
        phoneNumberInput =
          <Form>
            <Form.Input
              placeholder="phoneNumber"
              name="phoneNumber"
              style={{ width: "100%" }}
              value={this.state.phoneNumber.value}
              onChange={(event) =>
                this.handleFieldChange(event, validation.validatePhoneNumber)
              }
            ></Form.Input>
          </Form>
        } else {
          phoneNumberInput =
            <Form>
              <Form.Input
                placeholder="phoneNumber"
                name="phoneNumber"
                error={{ content: this.state.phoneNumber.errorMsg, pointing: 'below' }}
                style={{ width: "100%" }}
                value={this.state.phoneNumber.value}
                onChange={(event) =>
                  this.handleFieldChange(event, validation.validatePhoneNumber)
                }
              ></Form.Input>
            </Form>
        }
    return (
      <Grid>
        <GridColumn>
          <Grid.Row>
            <Segment>
              <Label attached="top">Imię</Label>
              <Container textAlign="left">
                {nameInput}
              </Container>
            </Segment>
            <Segment>
              <Label attached="top">Nazwisko</Label>
              <Container textAlign="left">
                {surnameInput}
              </Container>
            </Segment>
            <Segment>
              <Label attached="top">Email</Label>
              {emailInput}
            </Segment>
            <Segment>
              <Label attached="top">Telefon</Label>
              {phoneNumberInput}
            </Segment>
            <Segment>
              <Label attached="top">O mnie</Label>
              <Container textAlign="left">
                <Form>
                  <TextArea
                    name="description"
                    value={this.state.description}
                    style={{ minHeight: "10%" }}
                    onChange={(e) => {
                      this.setState({ description: e.target.value });
                    }}
                  ></TextArea>
                </Form>
              </Container>
            </Segment>
            <GridColumn width={1}>
              <Button
                disabled={this.isFormInvalid()}
                fluid
                size="medium"
                color="green"
                style={{
                  width: "100%",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={this.handleSubmit}
              >
                <Button.Content visible>Zapisz zmiany</Button.Content>
              </Button>
            </GridColumn>
            <GridColumn width={1}>
              <Button
                fluid
                size="medium"
                color="grey"
                style={{ width: "100%" }}
                onClick={this.props.handler}
              >
                <Button.Content visible>Anuluj</Button.Content>
              </Button>
            </GridColumn>
          </Grid.Row>
        </GridColumn>
      </Grid>
    );
  }

  validateEmailAvailability() {
    const emailValue = this.state.email.value;
    const emailValidation = validation.validateEmail(emailValue);

    if (emailValidation.validateStatus === "error") {
      this.setState({
        email: {
          value: emailValue,
          ...emailValidation,
        },
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: "validating",
        errorMsg: null,
      },
    });

    userService
      .checkEmailAvailability(emailValue)
      .then((response) => {
        if (response.available) {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "success",
              errorMsg: null,
            },
          });
        } else {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "error",
              errorMsg: "Ten email jest już zajęty",
            },
          });
        }
      })
      .catch((error) => {
        this.setState({
          email: {
            value: emailValue,
            validateStatus: "success",
            errorMsg: null,
          },
        });
      });
  }
}
export default UserInfoEdit;
