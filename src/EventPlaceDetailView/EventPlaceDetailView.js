import React, { Component } from "react";
import { Label, Grid, Segment, List } from "semantic-ui-react";
import LoadingIndicator from "../common/LoadingIndicator";
import badmintonSingle from "../Icons/colorScale/badmintonSingle.svg";
import badmintonDouble from "../Icons/colorScale/badmintonDouble.svg";
import basketball from "../Icons/colorScale/basketball.svg";
import climbing from "../Icons/colorScale/climbing.svg";
import cycling from "../Icons/colorScale/cycling.svg";
import handball from "../Icons/colorScale/handball.svg";
import indoor from "../Icons/colorScale/indoor.svg";
import pingpong from "../Icons/colorScale/pingpong.svg";
import running from "../Icons/colorScale/running.svg";
import soccer from "../Icons/colorScale/soccer.svg";
import squash from "../Icons/colorScale/squash.svg";
import swimming from "../Icons/colorScale/swimming.svg";
import tennisDouble from "../Icons/colorScale/tennisDouble.svg";
import tennisSingle from "../Icons/colorScale/tennisSingle.svg";
import volleyball from "../Icons/colorScale/volleyball.svg";
import EventPlaceStatistics from "./EventPlaceStatistics";
import EventPlaceDetails from "./EventPlaceDetails";

const toggleSportsCategories = [
  {
    value: "1",
    icon: soccer,
    tooltip: "Piłka nożna",
  },
  {
    value: "2",
    icon: volleyball,
    tooltip: "Siatkówka",
  },
  {
    value: "3",
    icon: basketball,
    tooltip: "Koszykówka",
  },
  {
    value: "4",
    icon: indoor,
    tooltip: "Piłka halowa",
  },
  {
    value: "6",
    icon: tennisSingle,
    tooltip: "Tenis ziemny - single",
  },
  {
    value: "7",
    icon: tennisDouble,
    tooltip: "Tenis ziemny - debel",
  },
  {
    value: "8",
    icon: squash,
    tooltip: "Squash",
  },
  {
    value: "5",
    icon: handball,
    tooltip: "Piłka ręczna",
  },
  {
    value: "9",
    icon: badmintonSingle,
    tooltip: "Badminton - single",
  },
  {
    value: "10",
    icon: badmintonDouble,
    additional: "x2",
    tooltip: "Badminton - debel",
  },
  {
    value: "11",
    icon: running,
    tooltip: "Bieganie",
  },
  {
    value: "12",
    icon: cycling,
    tooltip: "Kolarstwo",
  },
  {
    value: "13",
    icon: swimming,
    tooltip: "Pływanie",
  },
  {
    value: "14",
    icon: pingpong,
    tooltip: "Tenis stołowy",
  },
  {
    value: "15",
    icon: climbing,
    tooltip: "Wspinaczka",
  },
];

class EventPlaceDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      event: null,
      participants: [],
      eventPlaceDetails: null
    };
  }

  componentDidMount(props){
      this.setState({
       eventPlaceDetails: this.props.location.state.eventPlaceDetails,
      })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    } else {
      return (
        <Grid textAlign="center" stackable columns={3}>
          <Grid.Column mobile={16} tablet={8} computer={3}>
            <Segment>
              <Label textAlign="center" attached="top" color="orange">
                Statystyki
              </Label>
              <EventPlaceStatistics
                eventPlaceDetails={this.props.location.state.eventPlaceDetails}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment>
              <Label textAlign="center" attached="top" color="orange">
                Informacje o miejscu
              </Label>
              <EventPlaceDetails
                isAdmin={this.props.isAdmin}
                eventPlaceDetails={this.props.location.state.eventPlaceDetails}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign="left" mobile={16} tablet={8} computer={3}>
            <Segment>
              <Label textAlign="center" attached="top" color="orange">
                Kategorie sportu powiązane z miejscem
              </Label>
              <Grid>
                <Grid.Row centered>
                  <List>
                    {this.props.location.state.eventPlaceDetails.sportsCategories.map(
                      (item) => (
                        <List.Item key={item.sportsCategoryId - 1}>
                            <img
                              height="80"
                              width="80"
                              src={
                                toggleSportsCategories[
                                  item.sportsCategoryId - 1
                                ].icon
                              }
                              alt=""
                            />
                          <List.Content>
                            <List.Header>{toggleSportsCategories[item.sportsCategoryId - 1]
                                .tooltip}</List.Header>
                          </List.Content>
                        </List.Item>
                      )
                    )}
                  </List>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      );}
}
}

export default EventPlaceDetailView;