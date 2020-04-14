import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Button,Grid, Form , GridColumn, Image,Header,Segment,Message,Checkbox, Input,  Item, Container} from 'semantic-ui-react'
import { validation } from '../validationRules'
import userService from "../Api/Api";
import { notification } from "antd";
import "antd/dist/antd.css";
import Regulamin from "../Regulamin/Regulamin"

import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PHONE_ACCEPTED_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
} from "../constants";


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      username: {
        value: "",
      },
      password: {
        value: "",
      },
      email: {
        value: "",
      },
      name: {
        value: "",
      },
      surname: {
        value: "",
      },
      phoneNumber: {
        value: "",
      },
      confirmPassword: {
        value: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsernameAvailability = this.validateUsernameAvailability.bind(
      this
    );
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.wrapper = React.createRef();
  }

  toggleModal = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleCloseModal= () => {
    this.setState({
      open: false,
    });
  };

  handleChange(event, valdiationFunction) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: {
        value,
        ...valdiationFunction(name),
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const signupRequest = {
      username: this.state.username.value,
      password: this.state.password.value,
      email: this.state.email.value,
      name: this.state.name.value,
      surname: this.state.username.value,
      phoneNumber: this.state.phoneNumber.value,
    };
    userService
      .signup(signupRequest)
      .then((response) => {
        notification.success({
          message: "Login App",
          description:
            "Thank you! You're successfully registered. Please Login to continue!",
        });
        this.props.history.push("/login");
      })
      .catch((error) => {
        notification.error({
          message: "Login App",
          description:
            error.message || "Sorry! Something went wrong. Please try again!",
        });
      });
  }

  isFormInvalid() {
    return !(
      validation.validateName(this.state.name) === "success" &&
      this.state.username.validateStatus === "success" &&
      this.state.email.validateStatus === "success" &&
      this.state.password.validateStatus === "success"
    );
  }

  render() {
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as="h2" color="orange" textAlign="center">
              Zarajestruj się !
            </Header>
            <Form size="large" onSubmit={this.onSubmit}>
              <Segment stacked>
                <Form.Field>
                  <Input
                    fluid
                    autoComplete="off"
                    required
                    validateStatus={this.state.username.validateStatus}
                    help={this.state.username.errorMsg}
                    value={this.state.username.value}
                    icon="user"
                    iconPosition="left"
                    name="username"
                    type="text"
                    onBlur={this.validateUsernameAvailability}
                    placeholder="Username"
                    onChange={(event) =>
                      this.handleChange(event, this.validateUsername)
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    required
                    autoComplete="off"
                    validateStatus={this.state.password.validateStatus}
                    help={this.state.password.errorMsg}
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Hasło"
                    type="password"
                    onChange={(event) =>
                      this.handleChange(event, this.validatePassword)
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    required
                    autoComplete="off"
                    validateStatus={this.state.confirmPassword.validateStatus}
                    help={this.state.confirmPassword.errorMsg}
                    icon="lock"
                    iconPosition="left"
                    placeholder="Potwierdz hasło"
                    name="confirmPassword"
                    type="password"
                    onChange={(event) =>
                      this.handleChange(event, this.validatePassword)
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    required
                    hasFeedback
                    validateStatus={this.state.email.validateStatus}
                    help={this.state.email.errorMsg}
                    icon="mail"
                    iconPosition="left"
                    name="email"
                    placeholder="Adres e-mail"
                    onBlur={this.validateEmailAvailability}
                    onChange={(event) =>
                      this.handleChange(event, this.validateEmail)
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    required
                    validateStatus={this.state.name.validateStatus}
                    help={this.state.name.errorMsg}
                    autoComplete="off"
                    icon="user"
                    iconPosition="left"
                    placeholder="Imię"
                    name="name"
                    onChange={(event) =>
                      this.handleChange(event, this.validateName)
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    required
                    validateStatus={this.state.surname.validateStatus}
                    help={this.state.surname.errorMsg}
                    icon="user"
                    autoComplete="off"
                    iconPosition="left"
                    placeholder="Nazwisko"
                    name="surname"
                    onChange={(event) =>
                      this.handleChange(event, this.validateName)
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    icon="phone"
                    autoComplete="off"
                    iconPosition="left"
                    name="phoneNumber"
                    placeholder="Numer telefonu"
                    onChange={(event) =>
                      this.handleChange(event, this.validatePhoneNumber)
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox label="Zapoznałem się z regulaminem i akceptuję wszystkie jego postanowienia oraz zezwalam na przetwarzanie moich danych osobowych do celów określonych w" />
                  <Item as={Link} onClick={this.toggleModal}>
                    regulaminie
                  </Item>
                </Form.Field>

                <Form.Field>
                  <Button
                    color="orange"
                    fluid
                    size="large"
                    onClick={this.handleSubmit}
                  >
                    Stwórz konto
                  </Button>
                </Form.Field>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        <Regulamin isOpen={this.state.open} onClose={this.handleCloseModal}/>
      </div>
    );
  }

  validateName(name) {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`,
      };
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`,
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  }

  validateEmail = (email) => {
    if (!email) {
      return {
        validateStatus: "error",
        errorMsg: "Email may not be empty",
      };
    }

    const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: "error",
        errorMsg: "Email not valid",
      };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`,
      };
    }

    return {
      validateStatus: null,
      errorMsg: null,
    };
  };

  validateUsername = (username) => {
    if (username.length < USERNAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`,
      };
    } else if (username.length > USERNAME_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`,
      };
    } else {
      return {
        validateStatus: null,
        errorMsg: null,
      };
    }
  };

  validateUsernameAvailability() {
    // First check for client side errors in username
    const usernameValue = this.state.username.value;
    const usernameValidation = this.validateUsername(usernameValue);

    if (usernameValidation.validateStatus === "error") {
      this.setState({
        username: {
          value: usernameValue,
          ...usernameValidation,
        },
      });
      return;
    }

    this.setState({
      username: {
        value: usernameValue,
        validateStatus: "validating",
        errorMsg: null,
      },
    });

    userService
      .checkUsernameAvailability(usernameValue)
      .then((response) => {
        if (response.available) {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: "success",
              errorMsg: null,
            },
          });
        } else {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: "error",
              errorMsg: "This username is already taken",
            },
          });
        }
      })
      .catch((error) => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          username: {
            value: usernameValue,
            validateStatus: "success",
            errorMsg: null,
          },
        });
      });
  }

  validateEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

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
              errorMsg: "This Email is already registered",
            },
          });
        }
      })
      .catch((error) => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          email: {
            value: emailValue,
            validateStatus: "success",
            errorMsg: null,
          },
        });
      });
  }

  validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  };

  validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === PHONE_ACCEPTED_LENGTH) {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    } else if (phoneNumber.length < PHONE_MIN_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Phone number is incorrect (Minimum ${PHONE_MIN_LENGTH} characters allowed.)`,
      };
    } else if (phoneNumber.length > PHONE_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Phone number is incorrect (Maximun ${PHONE_MAX_LENGTH} characters allowed.)`,
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  };
}

export default Register;