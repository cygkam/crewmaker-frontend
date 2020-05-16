import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Participant extends Component {
    constructor(props) {
      super(props);

      this.state = {
          image: "https://react.semantic-ui.com/images/wireframe/image.png",
          username: "",
          name: "Maciej"
      }
    }

    componentDidMount() {
        this.setState({
            username: this.props.dataFromParent.username,
            name: this.props.dataFromParent.name
        })
    }

    render() {
        return(
            <Link to={`/mainProfilePage/${this.state.username}`} >
                <Image
                    src={this.state.image}
                    size='medium'
                    label={{content: this.state.name, attached: 'bottom', size: 'medium'}}
                />
            </Link>
        )
    }
}

export default Participant;