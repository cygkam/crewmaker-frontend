import React, { Component } from 'react';
import { Label, Grid, Segment, Button, Icon } from 'semantic-ui-react'
import UserInfo from "./UserInfo"
import CommingEvent from "./Events/CommingEvent"
import PassedEvent from "./Events/PassedEvent"
import userService, { eventService } from "./Api/Api";
import NotFound from "./common/NotFound";
import CheckAuthentication from "./common/CheckAuthentication";
import ServerError from "./common/ServerError";
import LoadingIndicator from "./common/LoadingIndicator";
import { USER } from "./constants";

class Participants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: []
    };
  }

  render() {
    
  }
}

export default Participants;