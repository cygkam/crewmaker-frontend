import React, { Component } from 'react';
import {Form,Grid, Header, Segment} from 'semantic-ui-react';
import {userService} from './Services'

class Login extends Component {

  constructor(props){
    super(props);
    this.state ={
      login: '',
      password:'',
      submitted: false,
      loading: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange = (e) => this.setState({
    [e.target.name] : e.target.value
  });

  handleSubmit (e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { login, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(login && password)) {
          return;
        }

        this.setState({ loading: true });
        userService.login(login, password).then(
          user => {
            const { from } = this.props.location.state || {
              from: { pathname: "/" }
            };
            this.props.history.push(from);
          },
          error => this.setState({ error, loading: false })
        );
    }
  


  render () {
    return(
      <Grid verticalAlign='middle' textAlign='center'>
        <Grid.Column style={{maxWidth: 500}}>
          <Header as='h2' color='orange' textAlign='center'>
              Zaloguj się!
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              name = 'login'
              type = 'text'
              placeholder='Login'
              onChange = {this.handleChange}>
              </Form.Input>
              <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              name = 'password'
              type = 'password'
              placeholder='Password'
              onChange = {this.handleChange}>              
              </Form.Input>
              <Form.Button color='orange' fluid size='large' onClick={this.handleSubmit}>
                Zaloguj
              </Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;