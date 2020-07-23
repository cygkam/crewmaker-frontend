import React, { Component } from "react";
import { Grid, Segment, Checkbox, Image } from "semantic-ui-react";
import { Form, Typography } from "antd";
import { Link } from "react-router-dom";
import Regulamin from "../Register/Regulamin";
import "antd/dist/antd.less";
import "../index.css";
import { Icon } from '@iconify/react';
import twotoneLocationCity from '@iconify/icons-ic/twotone-location-city';
import stadiumIcon from '@iconify/icons-mdi/stadium';
import cardText from '@iconify/icons-bi/card-text';
import signpostIcon from '@iconify/icons-oi/signpost';
import postalCode from '@iconify/icons-map/postal-code';
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

const FormItem = Form.Item;

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

class EventPlaceSumUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      eventPlaceName: "Nazwa miejsca",
      sportsCategory: "login użytkownika",
      eventPlaceDescription: "imie",
      eventPlaceCity: "nazwisko",
      eventPlacePostalCode: "email użytkownika",
      eventPlaceStreet: "https://react.semantic-ui.com/images/wireframe/image.png",
      eventPlaceStreetNumber: "telefon użytkownika",
    };

    this.wrapper = React.createRef();
  }

  componentDidMount() {
    this.setState((props) => ({
        eventPlaceName: this.props.eventPlaceName,
        sportsCategory: this.props.sportsCategory,
        eventPlaceDescription: this.props.eventPlaceDescription,
        eventPlaceCity: this.props.eventPlaceCity,
        eventPlacePostalCode: this.props.eventPlacePostalCode,
        eventPlaceStreet: this.props.eventPlaceStreet,
        eventPlaceStreetNumber: this.props.eventPlaceStreetNumber,
    }));
    console.log(this.props.sportsCategory)
  }

  render() {
    return (
      <Grid textAlign="center" columns="equal">
        <Grid.Row mobile={16} tablet={16} computer={12} columns={2} stretched>
          <Grid.Column>
            <Segment>
              <Icon icon={stadiumIcon} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlaceName}
              </Typography>
            </Segment>
            <Segment>
              <Icon icon={cardText} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlaceDescription}
              </Typography>
            </Segment>
            <Segment>
              <Icon icon={twotoneLocationCity} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlaceCity}
              </Typography>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment verticalAlign="middle">
              <Image
                fluid
                bordered
                rounded
                centered
                src={
                  this.props.eventPlaceImage
                    ? this.props.eventPlaceImage
                    : "https://react.semantic-ui.com/images/wireframe/image.png"
                }
                style={{ height: "200px", width: "200px" }}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row mobile={16} tablet={16} computer={12} columns={3}>
          <Grid.Column>
            <Segment>
              <Icon icon={postalCode} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlacePostalCode}
              </Typography>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Icon icon={signpostIcon} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlaceStreet}
              </Typography>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row mobile={16} tablet={16} computer={12} columns={1}>
          <Grid.Column>
            <Segment>
              {this.props.sportsCategory.map((item) => (
                <img
                  key={item.sportsCategoryId - 1}
                  height="80"
                  width="80"
                  src={toggleSportsCategories[item - 1].icon}
                  alt=""
                />
              ))}
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row mobile={16} tablet={16} computer={12} columns={1}>
          <Grid.Column>
            <Segment>
              <Checkbox
                onChange={this.props.toggleAgreement}
                label={
                  <label
                    style={{
                      "line-height": 16,
                    }}
                  >
                    Zapoznałem się z regulaminem i akceptuję wszystkie jego
                    postanowienia, aby móc zaproponować obiekt opisany w
                    formularzu.{" "}
                    <FormItem as={Link} onClick={this.handleToggleModal}>
                      Regulamin
                    </FormItem>
                  </label>
                }
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Regulamin isOpen={this.state.open} onClose={this.handleToggleModal} />
      </Grid>
    );
  }
}

export default EventPlaceSumUpForm;






