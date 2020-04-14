
//TODO 

import userService from "./Api/Api";
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "./constants";

export const validation = {
    validateName,
    validateEmail,
    validateUsername,
    validateUsernameAvailability,
    validateEmailAvailability,
    validatePassword
};

function validateName (name) {
    if(name.length < NAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
        }
    } else if (name.length > NAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
            };            
    }
}

function validateEmail(email) {
    if(!email) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email may not be empty'                
        }
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if(!EMAIL_REGEX.test(email)) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email not valid'
        }
    }

    if(email.length > EMAIL_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
        }
    }

    return {
        validateStatus: null,
        errorMsg: null
    }
}

function validateUsername (username) {
    if(username.length < USERNAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
        }
    } else if (username.length > USERNAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: null,
            errorMsg: null
        }
    }
}

    function validatePassword (password) {
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



    function validateUsernameAvailability() {
    // First check for client side errors in username
    const usernameValue = this.state.username.value;
    const usernameValidation = this.validateUsername(usernameValue);

    if(usernameValidation.validateStatus === 'error') {
        this.setState({
            username: {
                value: usernameValue,
                ...usernameValidation
            }
        });
        return;
    }

    this.setState({
        username: {
            value: usernameValue,
            validateStatus: 'validating',
            errorMsg: null
        }
    });

    userService.checkUsernameAvailability(usernameValue)
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

function validateEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if(emailValidation.validateStatus === 'error') {
        this.setState({
            email: {
                value: emailValue,
                ...emailValidation
            }
        });    
        return;
    }

    this.setState({
        email: {
            value: emailValue,
            validateStatus: 'validating',
            errorMsg: null
        }
    });

    userService.checkEmailAvailability(emailValue)
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

