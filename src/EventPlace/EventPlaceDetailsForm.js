import React, {Component} from 'react';
import { Grid, Segment} from "semantic-ui-react";
import { validation } from "../Register/validationRules"
import { Input, Form, Typography } from "antd";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Icon } from "@iconify/react";
import bxBasketball from "@iconify/icons-bx/bx-basketball";
import volleyballIcon from '@iconify/icons-uil/volleyball';
import roundSportsHandball from '@iconify/icons-ic/round-sports-handball';
import swimming15 from "@iconify/icons-maki/swimming-15";
import soccer11 from "@iconify/icons-maki/soccer-11";
import basketball11 from "@iconify/icons-maki/basketball-11";
import tennisIcon from "@iconify/icons-map/tennis";
import climbingIcon from "@iconify/icons-map/climbing";
import badmintonIcon from "@iconify/icons-mdi/badminton";
import roundDirectionsRun from "@iconify/icons-ic/round-directions-run";
import roundDirectionsBike from "@iconify/icons-ic/round-directions-bike";
import pingPongRacket from "@iconify/icons-si-glyph/ping-pong-racket";
import { LineOutlined} from "@ant-design/icons";
import "antd/dist/antd.less";
import "../index.css";

const FormItem = Form.Item;

const toggleSportsCategories = [
  {
    value: "1",
    icon: soccer11,
    tooltip: "Piłka nożna",
  },
  {
    value: "2",
    icon: volleyballIcon,
    tooltip: "Siatkówka",
  },
  {
    value: "3",
    icon: basketball11,
    tooltip: "Koszykówka",
  },
  {
    value: "4",
    icon: bxBasketball,
    tooltip: "Piłka halowa",
  },
  {
    value: "6",
    icon: tennisIcon,
    tooltip: "Tenis ziemny - single",
  },
  {
    value: "7",
    icon: tennisIcon,
    additional: "x2",
    tooltip: "Tenis ziemny - debel",
  },
  {
    value: "8",
    icon: tennisIcon,
    icon2: LineOutlined,
    tooltip: "Squash",
  },
  {
    value: "5",
    icon: roundSportsHandball,
    tooltip: "Piłka ręczna",
  },
  {
    value: "9",
    icon: badmintonIcon,
    tooltip: "Badminton - single",
  },
  {
    value: "10",
    icon: badmintonIcon,
    additional: "x2",
    tooltip: "Badminton - debel",
  },
  {
    value: "11",
    icon: roundDirectionsRun,
    tooltip: "Bieganie",
  },
  {
    value: "12",
    icon: roundDirectionsBike,
    tooltip: "Kolarstwo",
  },
  {
    value: "13",
    icon: swimming15,
    tooltip: "Pływanie",
  },
  {
    value: "14",
    icon: pingPongRacket,
    tooltip: "Tenis stołowy",
  },
  {
    value: "15",
    icon: climbingIcon,
    tooltip: "Wspinaczka",
  },
];


class EventPlaceDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  render() {
    return (
      <Grid textAlign="center">
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <Form onSubmit={this.onSubmit} autoComplete="off">
            <Segment stacked>
              <FormItem
                hasFeedback
                style={{ marginBottom: 12 }}
                autoComplete="off"
                validateStatus={this.props.eventPlaceName.validateStatus}
                help={this.props.eventPlaceName.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceName"
                  value={this.props.eventPlaceName.value}
                  placeholder="Nazwa miejsca"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceName
                    );
                  }}
                />
              </FormItem>
              <FormItem
                style={{ marginBottom: 12 }}
                hasFeedback
                autoComplete="off"
                validateStatus={this.props.eventPlaceDescription.validateStatus}
                help={this.props.eventPlaceDescription.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceDescription"
                  value={this.props.eventPlaceDescription.value}
                  placeholder="Opis miejsca"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceDescription
                    );
                  }}
                />
              </FormItem>
              <FormItem>
                <Typography>
                  Wybierz co najmniej jedną dyscyplinę powiązaną z tym miejscem
                </Typography>
              </FormItem>

              <FormItem style={{ marginBottom: 6 }}>
                <ToggleButtonGroup
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  value={this.props.sportsCategory}
                  onChange={this.props.handleToggle}
                >
                  {toggleSportsCategories.map((item, key) => (
                      <ToggleButton
                        value={item.value}
                        tooltip={item.tooltip}
                        key={key}
                      >
                        <Icon icon={item.icon} width="3em" height="3em" />
                        {item.additional}
                      </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </FormItem>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventPlaceDetailsForm;