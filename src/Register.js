import React,{Component} from 'react';
import { Button, Form,Grid, GridColumn, Image,Header,Segment,Message } from 'semantic-ui-react'

class Register extends Component {

  constructor(propos){
    super(propos);
    
    this.state = {login: '',
    password: '',
    email: '',
    name: '',
    surname: '',
    phonenumber: ''
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.wrapper = React.createRef();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render () {
    return (
      <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header as='h2' color='orange' textAlign='center'>
           Zarajestruj się !
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
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              name='password'
              placeholder='Hasło'
              type='password'
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Potwierdz hasło'
              type='password'
              onChange={this.handleChange}
            />             
            <Form.Input 
              fluid 
              icon='mail' 
              iconPosition='left'
              name = 'email'
             placeholder='Adres e-mail' 
             onChange={this.handleChange}
            />
            <Form.Input
              fluid
              icon ='user'
              iconPosition='left'
              placeholder='Imię'
              name='name'
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              icon ='user'
              iconPosition='left'
              placeholder='Nazwisko'
              name='surname'
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              icon='phone'
              iconPosition='left'
              name='phonenumber'
              placeholder='Numer telefonu'
              onChange={this.handleChange}
            />
  
            <Button color='orange' fluid size='large' onClick={this.handleSubmit}>
              Stwórz konto
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    );
  }
}

export default Register;