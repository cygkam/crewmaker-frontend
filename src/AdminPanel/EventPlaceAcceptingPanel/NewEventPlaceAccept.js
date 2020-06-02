import React, { Component } from 'react';
import { Grid, Segment, List, Pagination} from "semantic-ui-react";
import { eventPlaceService } from "../../Api/Api";
import LoadingIndicator from "../../common/LoadingIndicator";
import FilterBar from "./FilterBar"
import EventPlaceCard from "./EventPlaceCard"


class NewEventPlaceAccept extends Component {
  constructor(propos) {
    super(propos);
    this.state = {
      isLoading: true,
      listOfEventPlaces: null,
      activePage: 1,
      totalPages: 10,
      itemsCountPerPage: 10,
      totalItemsCount: null,
      filtering: "ALL",
      sorting: "ASC_eventPlaceId",
      city: "",
    };
  }

  componentDidMount() {
    this.getAllEventPlace(
      this.state.activePage,
      this.state.itemsCountPerPage,
      this.state.filtering,
      this.state.sorting,
      this.state.city
    );
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.getAllEventPlace(
      activePage,
      this.state.itemsCountPerPage,
      this.state.filtering,
      this.state.sorting,
      this.state.city
    );
  };

  handleChangeItemsOnPage = (e, { value }) => {
    this.setState({ itemsCountPerPage: value });
    this.getAllEventPlace(
      this.state.activePage,
      value,
      this.state.filtering,
      this.state.sorting,
      this.state.city
    );
  };

  handleChangeFiltering = (e, { value }) => {
    this.setState({ filtering: value, activePage: 1 });
    this.getAllEventPlace(
      1,
      this.state.itemsCountPerPage,
      value,
      this.state.sorting,
      this.state.city
    );
  };

  handleChangeSorting = (e, { value }) => {
    this.setState({ sorting: value });
    this.getAllEventPlace(
      this.state.activePage,
      this.state.itemsCountPerPage,
      this.state.filtering,
      value,
      this.state.city
    );
  };

  handleChangeCity = (e, { value }) => {
    this.setState({ city: value });
  };

  handleSumbit = () =>{
    this.getAllEventPlace(
      this.state.activePage,
      this.state.itemsCountPerPage,
      this.state.filtering,
      this.state.sorting,
      this.state.city
    );
  }

  handleChange(event, validationFunction) {
    const target = event.target;
    const inputValue = target.value;
    const inputName = target.name;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFunction(inputValue),
      },
    });
  }

  getAllEventPlace(activePage, itemsOnSite, filtering, sorting, city) {
    this.setState({ isLoading: true });
    eventPlaceService
      .getEventPlace(activePage, itemsOnSite, filtering, sorting, city)
      .then((response) => {
        this.setState({
          totalPages: response.totalPages,
          totalItemsCount: response.totalElements,
        });

        const results = response.content;
        const updatedResults = results.map((results) => {
          return {
            ...results,
          };
        });
        this.setState({ listOfEventPlaces: updatedResults });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Grid textAlign="center">
        <Grid.Column mobile={16} tablet={14} computer={8}>
          <Segment padded>
            <FilterBar
              isLoading={this.state.isLoading}
              itemsCountPerPage={this.state.itemsCountPerPage}
              sorting={this.state.sorting}
              filtering={this.state.filtering}
              city={this.state.city}
              onChangeItemsOnPage={this.handleChangeItemsOnPage}
              onChangeSorting={this.handleChangeSorting}
              onChangeFiltering={this.handleChangeFiltering}
              onChangeCity={this.handleChangeCity}
              onSumbit={this.handleSumbit}
            />
          </Segment>
          <Pagination
            activePage={this.state.activePage}
            boundaryRange={1}
            onPageChange={this.handlePaginationChange}
            size="mini"
            siblingRange={1}
            totalPages={this.state.totalPages}
          />
          <Segment textAlign="left">
            {this.state.isLoading === true ? (
              <LoadingIndicator />
            ) : (
              <React.Fragment>
                <List divided verticalAlign="middle" size="huge">
                  {this.state.listOfEventPlaces.map((eventPlace) => (
                    <Segment key={eventPlace.eventPlaceID}>
                      <EventPlaceCard
                        isAdmin={this.props.isAdmin}
                        eventPlaceDetails={eventPlace}
                      ></EventPlaceCard>
                    </Segment>
                  ))}
                </List>
              </React.Fragment>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default NewEventPlaceAccept;