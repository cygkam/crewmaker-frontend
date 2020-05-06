import React, { Component } from "react";
import { Grid, Select, Form, Icon, Button, Segment, Header, List } from "semantic-ui-react";
import {
    DateTimeInput
} from 'semantic-ui-calendar-react';
import { eventService, sportCategoryService } from "../Api/Api";


/*const sportOptions = [
    {
        key: 'Piłka nożna',
        text: 'Piłka nożna',
        value: 'Piłka nożna' // tutaj potem id przesylac
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
]*/

class SearchView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            time: '',
            dateTime: '',
            datesRange: '',
            events: [],
            sportCategories: [],
            isLoading: false,
            sportCategory: ''
        };
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (event) => {
        this.setState({ isLoading: true });
        eventService.getAllEvents(this.state.sportCategory).then((response) => {
            this.setState({ events: response })
            this.setState({ isLoading: false })
            console.log(this.state.events)
        }
        ).catch(
            (error) => console.log("Error")
        );

        //console.log(this.state.sportCategories)
        //console.log(this.state.dateTime);
    }


    fetchSportCategory () {
        sportCategoryService.getAllSportsCat().then((response) => {
            console.log(response)
            this.setState({
                sportCategories: response.map(
                    (cat) => JSON.parse('{"key" : ' + cat.sportsCategoryID + ', "text" : "' + cat.sportsCategoryName + '", "value" :' + cat.sportsCategoryID + '}')
                )
            })
            console.log(this.state.sportCategories)
        }
        ).catch(
            (error) => console.log("ERROR")
        );
    }


    componentDidMount () {
        this.fetchSportCategory();
        console.log("Mounted component");
    }

    render () {
        return (
            <Grid textAlign='center'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Segment padded >
                            <Form >
                                <Header as='h1' color='orange'>
                                    Wyszukaj wydarzenie!
                            </Header>
                                <Form.Group widths='equal'>
                                    <Form.Field><Select placeholder='Wybierz dziedzinę sportu' options={this.state.sportCategories}
                                        name="sportCategory"
                                        value={this.state.sportCategory}
                                        onChange={this.handleChange} />
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
                                    <Form.Button fluid animated color="orange" onClick={this.handleSubmit}
                                        loading={this.state.isLoading}
                                    >
                                        <Button.Content visible>Wyszukaj</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='search' />
                                        </Button.Content>
                                    </Form.Button>
                                </Form.Group>
                            </Form>
                        </Segment>
                        {
                            this.state.events.length > 0 &&
                            <Segment textAlign='left'>
                                <Grid columns='equal' verticalAlign='middle' textAlign='center' >
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header as='h3' color='orange'>Nazwa wydarzenia</Header>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header as='h3' color='orange'>Miejsce wydarzenia</Header>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header as='h3' color='orange'>Data</Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <List divided verticalAlign='middle' size='huge'>
                                    {this.state.events.map((event) =>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    <Grid columns='equal' divided>
                                                        <Grid.Row>
                                                            <Grid.Column>
                                                                {event.eventName}
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                {event.eventPlaceName}
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                {event.eventDate}
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </List.Header>
                                            </List.Content>
                                        </List.Item>
                                    )}
                                </List>
                            </Segment>
                        }
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        );
    }
}

export default SearchView;