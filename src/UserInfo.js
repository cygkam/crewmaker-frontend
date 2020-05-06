import React, { Component } from 'react';
import UserInfoEdit from './UserInfoEdit';
import UserInfoView from './UserInfoView';


class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfileInEdition: false
    };

    this.panelViewHandler = this.changePanelView.bind(this)
  }

  changePanelView () {
    this.setState({
      isProfileInEdition: !this.state.isProfileInEdition

    })
  }

  componentDidMount () {
    this.setState((props) => ({
      username: this.props.username,
      email: this.props.email,
      telephone: this.props.phoneNumber,
      description: this.props.description,
    }));
  }



  render () {
    if (this.state.isProfileInEdition) {
      return (
        <UserInfoEdit {...this.props} handler={this.panelViewHandler} />
      )
    } else {
      return <UserInfoView {...this.props} handler={this.panelViewHandler} />
    }
  }
}

export default UserInfo;