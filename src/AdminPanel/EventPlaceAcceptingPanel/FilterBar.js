import React, { Component } from 'react';
import {
  Form,
  Header,
  Dropdown,
  Button,
  Input,
  Icon,
  Grid,
} from "semantic-ui-react";


const itemsOnPageOptions = [
  { key: "1", value: 10, text: "10" },
  { key: "2", value: 25, text: "25" },
  { key: "3", value: 50, text: "50" },
];

const sortingOptions = [
  { key: "1", value: "DESC_name", text: "Malejąco po nazwie obiektu" },
  { key: "2", value: "ASC_name", text: "Rosnąco po nazwie obiektu" },
  { key: "3", value: "DESC_eventPlaceId", text: "Malejąco po ID obiektu" },
  { key: "4", value: "ASC_eventPlaceId", text: "Rosnąco po ID obiektu" },
  { key: "5", value: "DESC_city", text: "Malejąco po nazwie miasta" },
  { key: "6", value: "ASC_city", text: "Rosnąco po nazwie miasta" },
];

const filteringOptions = [
  { key: "1", value: "ACC", text: "Zaakceptowane" },
  { key: "2", value: "NOTACC", text: "Niezaakceptowane" },
  { key: "3", value: "ALL", text: "Wszystkie" },
  { key: "4", value: "ARCH", text: "Zarchiwizowane" },
  { key: "5", value: "NOTARCH", text: "Niezarchiwizowane" },
];


class FilterBar extends Component {
  constructor(propos) {
    super(propos);
    this.state = {
      isLoading: false,
      listOfEventPlaces: null,
      itemsOnPage: "10",
    };
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  

  render() {
    return (
      <Form>
        <Header as="h1" color="orange">
          Dostępne obiekty
        </Header>
        <Grid columns="equal">
          <Grid.Row columns={5} stretched>
            <Grid.Column>
              <Form.Field>
                <label>Obiektów na stronie</label>
                <Dropdown
                  placeholder="Liczba obiektów na stronie"
                  compact
                  disabled={this.props.isLoading}
                  selectOnNavigation={false}
                  name="itemsCountPerPage"
                  selection
                  value={this.props.itemsCountPerPage}
                  options={itemsOnPageOptions}
                  onChange={this.props.onChangeItemsOnPage}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Filtrowanie</label>
                <Dropdown
                  placeholder="Filtrowanie"
                  compact
                  disabled={this.props.isLoading}
                  selectOnNavigation={false}
                  name="filtering"
                  selection
                  value={this.props.filtering}
                  options={filteringOptions}
                  onChange={this.props.onChangeFiltering}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Sortowanie obiektów</label>
                <Dropdown
                  placeholder="Sortowanie obiektów"
                  compact
                  disabled={this.props.isLoading}
                  selectOnNavigation={false}
                  name="sorting"
                  selection
                  value={this.props.sorting}
                  options={sortingOptions}
                  onChange={this.props.onChangeSorting}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <label>Wyszukaj po mieście</label>
                    <Input
                      placeholder="Miasto"
                      onChange={this.props.onChangeCity}
                      name="eventCity"
                    ></Input>
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label> </label>
                    <Button
                      fluid
                      animated
                      color="orange"
                      onClick={this.props.onSumbit}
                      loading={this.props.isLoading}
                    >
                      <Button.Content visible>Wyszukaj</Button.Content>
                      <Button.Content hidden>
                        <Icon name="search" />
                      </Button.Content>
                    </Button>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Form.Group widths="equal"></Form.Group>
      </Form>
    );
  }
}

export default FilterBar;