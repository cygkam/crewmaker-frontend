import React,{Component} from 'react';

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
    alert("SIEMA")
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <form>
            <label htmlFor="login">Login :</label>
            <input
                  type = "text"
                  name = "login"
                  value={this.state.login} onChange={this.handleChange}
              />
              <br/>
            <label htmlFor="password">Hasło :</label>
            <input
                  type = "password"
                  name = "password"
                  value={this.state.password} onChange={this.handleChange}
              />
              <br/>
              <label htmlFor="email">Email :</label>
            <input
                  type = "email"
                  name = "email"
                  value={this.state.email} onChange={this.handleChange}
            />
            <br/>
            <label htmlFor="name">Imię :</label>
            <input 
                type = "text"
                name = "name"
                value = {this.state.name} onChange={this.handleChange}
            >
            </input>
            <br/>
            <label htmlFor="surname">Nazwisko :</label>
            <input
              type = 'text'
              name = "surname"
              value = {this.state.surname} onChange={this.handleChange}
            />
            <br/>
            <label htmlFor="phonenumber">Telefon :</label>
            <input
              type ="text"
              name = "phonenumber"
              value = {this.state.phonenumber} onChange={this.handleChange}
            />
            <br/>
          <input type="submit" value="Wyślij" onSubmit={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

export default Register;