import React, {Component} from 'react';
import { Grid, Segment} from "semantic-ui-react";
import { validation } from "../Register/validationRules"
import { Input, Form, Typography } from "antd";
import ToggleButton from "@material-ui/lab/ToggleButton";
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
  },
  {
    value: "2",
    icon: volleyballIcon,
  },
  {
    value: "3",
    icon: basketball11,
  },
  {
    value: "4",
    icon: bxBasketball,
  },
  {
    value: "6",
    icon: tennisIcon,
  },
  {
    value: "7",
    icon: tennisIcon,
    additional: "x2",
  },
  {
    value: "8",
    icon: tennisIcon,
    icon2: LineOutlined,
  },
  {
    value: "5",
    icon: roundSportsHandball,
  },
  {
    value: "9",
    icon: badmintonIcon,
  },
  {
    value: "10",
    icon: badmintonIcon,
    additional: "x2",
  },
  {
    value: "11",
    icon: roundDirectionsRun,
  },
  {
    value: "12",
    icon: roundDirectionsBike,
  },
  {
    value: "13",
    icon: swimming15,
  },
  {
    value: "14",
    icon: pingPongRacket,
  },
  {
    value: "15",
    icon: climbingIcon,
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
                    "justify-content": "center",
                    "align-items": "center",
                  }}
                  value={this.props.sportsCategory}
                  onChange={this.props.handleToggle}
                >
                  {toggleSportsCategories.map((item) => (
                    <ToggleButton value={item.value}>
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