import React, { Component } from "react";
import { Image } from "semantic-ui-react";

class Participant extends Component {
    constructor(props) {
      super(props);

      this.state = {
          image: "https://react.semantic-ui.com/images/wireframe/image.png",
          name: "Maciej"
      }
    }

    render() {
        return(
            <Image
                src={this.state.image}
                size='medium'
                textAlign='center'
                label={{content: this.state.name, attached: 'bottom', size: 'huge'}}
            />
        )
    }
}

export default Participant;