import React,{ Component } from "react";
import { Grid,Select, Form,Icon,Button, Segment, Header } from "semantic-ui-react";
import {
    DateTimeInput,
    DatesRangeInput
  } from 'semantic-ui-calendar-react';



const sportOptions = [
    {
        key: 'Piłka nożna',
        text: 'Piłka nożna',
        value: 'Piłka nożna'
    },
    {
        key: 'Siatkówka',
        text: 'Siatkówka',
        value: 'Siatkówka'
    },
    {
        key: 'Koszykówka',
        text: 'Koszykówka',
        value: 'Koszykówka'
    }
]

class SearchView extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          date: '',
          time: '',
          dateTime: '',
          datesRange: ''
        };
      }
     
      handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }

      handleSubmit = (event) => {
          console.log(this.state.dateTime);
      }

    render(){
        return(
        <Grid textAlign='center'>
            <Grid.Row>
                <Grid.Column width={5}>
                    <Segment padded >
                        <Form >
                            <Header as='h1' color = 'orange'>
                                Wyszukaj wydarzenie!
                            </Header>
                            <Form.Group widths = 'equal'>
                                <Form.Field><Select placeholder='Wybierz dziedzinę sportu' options={sportOptions} />
                                    </Form.Field>
                                    <Form.Field>
                                        <DateTimeInput
                                        name="dateTime"
                                        placeholder="Czas wydarzenia"
                                        value={this.state.dateTime}
                                        iconPosition="left"
                                        onChange={this.handleChange}
                                        />
                                    </Form.Field>
                            </Form.Group>
                            <Form.Button fluid animated color="orange" onClick={this.handleSubmit}>
                                    <Button.Content visible>Wyszukaj</Button.Content>
                                        <Button.Content hidden>
                                        <Icon name='search' />
                                        </Button.Content>
                            </Form.Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        );
    }
}

export default SearchView;