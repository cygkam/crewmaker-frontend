import React from 'react';
import 'antd/dist/antd.css';

import {Dimmer, Loader } from "semantic-ui-react";

export default function LoadingIndicator(props) {
    
    return (
      <Dimmer active inverted>
        <Loader active inline="centered" size="massive" />;
      </Dimmer>
    );
}