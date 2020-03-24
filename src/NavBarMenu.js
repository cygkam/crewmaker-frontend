import React,{ Component } from "react";
import {Menu,Input,Segment} from 'semantic-ui-react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Login from './Login';
  import Register from './Register'

class NavBarMenu extends Component {
    constructor(props) {
        super(props); 
        this.state = { activeItem: 'home' }
        this.wrapper = React.createRef();
      }

   

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
          <Router>
        <Menu pointing>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={Link} to="/home"
          >
              Strona główna
          </Menu.Item>
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={this.handleItemClick}
            as={Link} to="/register"
          >
              Zarejestruj się
          </Menu.Item>
          <Menu.Item position='right'
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
          as={Link} to="/login">
                Zaloguj
          </Menu.Item>
         
        </Menu>

        <Switch>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>

        

      </div>
    )
  }
  
}
function Home() {
    return <h2>Home</h2>;
  }
export default NavBarMenu;
