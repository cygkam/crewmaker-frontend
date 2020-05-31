import React, { Component } from 'react';
import { Grid, Segment } from "semantic-ui-react";
import { validation } from "../Register/validationRules"
import { Input, Form } from "antd";
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {
    DateInput,
    TimeInput
} from 'semantic-ui-calendar-react';
import { withStyles } from '@material-ui/core/styles';
import "antd/dist/antd.less";
import "../index.css";
const FormItem = Form.Item;

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

class EventGeneralInfo extends Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
    }

    render () {
        return (
            <Grid textAlign="center">
                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Form onSubmit={this.onSubmit} autoComplete="off">
                        <Segment stacked>
                            <FormItem style={{ marginBottom: 12 }}>
                                <FormItem
                                    style={{ marginBottom: 0, display: 'inline-block' }}
                                    hasFeedback
                                    autoComplete="off"
                                    validateStatus={this.props.eventDate.validateStatus}
                                    help={this.props.eventDate.errorMsg}
                                >
                                    <DateInput
                                        name="eventDate"
                                        placeholder="Data wydarzenia"
                                        iconPosition='left'
                                        style={{ width: 400 }}
                                        value={this.props.eventDate.value}
                                        onChange={(event, { name, value }) => {
                                            this.props.onChangeCalendar(
                                                event,
                                                { name, value },
                                                validation.validateEventDate
                                            );
                                        }}
                                    />
                                </FormItem>
                                <FormItem
                                    style={{ marginBottom: 0, display: 'inline-block', paddingLeft: 10 }}
                                    hasFeedback
                                    autoComplete="off"
                                    validateStatus={this.props.eventTime.validateStatus}
                                    help={this.props.eventTime.errorMsg}
                                >
                                    <TimeInput
                                        name="eventTime"
                                        placeholder="Czas wydarzenia"
                                        style={{ width: 400 }}
                                        value={this.props.eventTime.value}
                                        iconPosition="left"
                                        onChange={(event, { name, value }) => {
                                            this.props.onChangeCalendar(
                                                event,
                                                { name, value },
                                                validation.validateSelect
                                            );
                                        }}
                                    />
                                </FormItem>
                            </FormItem>
                            <FormItem
                                style={{ marginBottom: 12 }}
                                hasFeedback
                                autoComplete="off"
                                validateStatus={this.props.eventDuration.validateStatus}
                                help={this.props.eventDuration.errorMsg}
                            >
                                <Input
                                    autoComplete="off"
                                    name="eventDuration"
                                    value={this.props.eventDuration.value}
                                    placeholder="Czas trwania"
                                    onChange={(event) => {
                                        this.props.onChange(
                                            event,
                                            validation.validateEventDuration
                                        );
                                    }}
                                />
                            </FormItem>
                            <FormItem style={{ marginBottom: 12 }}>
                                <FormItem
                                    style={{ marginBottom: 0, display: 'inline-block' }}
                                    hasFeedback
                                    autoComplete="off"
                                    validateStatus={this.props.isCyclic.validateStatus}
                                    help={this.props.isCyclic.errorMsg}
                                >
                                    <Checkbox
                                        checked={this.props.isCyclic.value}
                                        name="isCyclic"
                                        color="orange"
                                        onChange={(event) => {
                                            this.props.onChange(
                                                event,
                                                validation.validateSelect
                                            );
                                        }}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </FormItem>
                                <FormItem
                                    style={{ marginBottom: 0, display: 'inline-block', paddingLeft: 10 }}
                                    hasFeedback
                                    autoComplete="off"
                                    validateStatus={this.props.eventCyclicity.validateStatus}
                                    help={this.props.eventCyclicity.errorMsg}
                                >
                                    <Select
                                        style={{ width: 762 }}
                                        value={this.props.eventCyclicity.value}
                                        input={<BootstrapInput />}
                                        name="eventCyclicity"
                                        disabled={!this.props.isCyclic.value}
                                        onChange={(event) => {
                                            this.props.onChange(
                                                event,
                                                validation.validateSelect
                                            );
                                        }}
                                    >
                                        {this.props.cyclics
                                            .map((cyclic) => (
                                                <MenuItem value={cyclic.cyclePeriodId}>{cyclic.cycleLength} {cyclic.cycleType}</MenuItem>
                                            ))}
                                    </Select>
                                    <FormHelperText>Cykliczność</FormHelperText>
                                </FormItem>
                            </FormItem>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default EventGeneralInfo;