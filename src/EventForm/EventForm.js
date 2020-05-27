import React from "react";
import { Steps, notification } from "antd";
import { Grid, Button } from "semantic-ui-react";
import EventGeneralInfo from "./EventGeneralInfo"
import EventLocationTime from "./EventLocationTime";
import EventSumUp from "./EventSumUp";
import { eventPlaceService, sportCategoryService, eventService } from "../Api/Api";
import { USER } from "../constants";

const { Step } = Steps;

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            isValidated: true,
            eventName: {
                value: "",
            },
            eventDescription: {
                value: "",
            },
            eventMaxPlayers: {
                value: "",
            },
            sportCategory: {
                value: "",
            },
            eventPlace: {
                value: 10,
            },
            isCyclic: {
                value: false,
            },
            eventCyclicity: {
                value: "",
            },
            eventDate: {
                value: "",
            },
            eventTime: {
                value: "",
            },
            eventDuration: {
                value: "",
            },
            userAgreement: false,
            eventPlaces: [],
            sportCategories: [],
            cyclics: []
        };
        this.isStepDetailsInvalid = this.isStepDetailsInvalid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleAgreement = this.toggleAgreement.bind(this);
        this.wrapper = React.createRef();
    }

    componentDidMount () {
        this.loadEventPlaces();
        this.loadSportCategories(this.state.eventPlace.value);
        this.loadCyclics();
    }

    loadEventPlaces () {
        eventPlaceService
            .getEventPlaces()
            .then((response) => {
                console.log("Pobrano!");
                this.setState({
                    eventPlaces: response,
                    eventPlace: {
                        value: response[0].eventPlaceId,
                    }
                });
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true
                    });
                } else {
                    this.setState({
                        serverError: true
                    });
                }
            });
    }

    loadSportCategories (eventPlaceId) {
        sportCategoryService
            .getSportCategoriesForPlace(eventPlaceId)
            .then((response) => {
                this.setState({
                    sportCategories: response,
                    sportCategory: {
                        value: response[0].sportsCategoryID
                    }
                });
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true
                    });
                } else {
                    this.setState({
                        serverError: true
                    });
                }
            });
    }

    loadCyclics () {
        eventPlaceService
            .getCyclics()
            .then((response) => {
                this.setState({
                    cyclics: response
                });
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true
                    });
                } else {
                    this.setState({
                        serverError: true
                    });
                }
            });
    }

    getStepContent (stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <EventGeneralInfo
                        eventName={this.state.eventName}
                        eventDescription={this.state.eventDescription}
                        eventMaxPlayers={this.state.eventMaxPlayers}
                        sportCategory={this.state.sportCategory}
                        eventPlace={this.state.eventPlace}
                        eventPlaces={this.state.eventPlaces}
                        sportCategories={this.state.sportCategories}
                        onChange={this.handleChange}
                    />
                );
            case 1:
                return (
                    <EventLocationTime
                        isCyclic={this.state.isCyclic}
                        eventCyclicity={this.state.eventCyclicity}
                        eventDate={this.state.eventDate}
                        eventTime={this.state.eventTime}
                        eventDuration={this.state.eventDuration}
                        cyclics={this.state.cyclics}
                        onChange={this.handleChange}
                    />
                );
            case 2:
                return (
                    <EventSumUp
                        eventName={this.state.eventName}
                        eventDescription={this.state.eventDescription}
                        sportCategory={this.state.sportCategory}
                        eventPlace={this.state.eventPlace}
                        eventDate={this.state.eventDate}
                        eventTime={this.state.eventTime}
                        toggleAgreement={this.toggleAgreement}
                    />
                );
            default:
                return "You're a long way from home sonny jim!";
        }
    }

    handleSubmit () {
        const newEventRequest = {
            cycleId: this.state.eventCyclicity,
            eventPlaceId: this.state.eventPlace,
            sportCategoryId: this.state.sportCategory,
            eventName: this.state.eventName,
            eventDescription: this.state.eventDescription,
            eventDate: this.state.eventDate,
            eventTime: this.state.eventTime,
            maxPlayers: this.state.eventMaxPlayers,
            isCyclic: this.state.isCyclic,
            eventDuration: this.state.eventDuration
        };
        eventService
            .newEvent(newEventRequest)
            .then((response) => {
                notification.success({
                    message: "New event",
                    description:
                        "Thank you! Event created! Notify your friends about your event!",
                });

                this.setState({
                    eventName: "",
                    eventDescription: "",
                    eventMaxPlayers: "",
                    sportCategory: "",
                    eventPlace: "",
                    isCyclic: "",
                    eventCyclicity: "",
                    eventDate: "",
                    eventTime: "",
                    eventDuration: ""
                });

                const user = JSON.parse(localStorage.getItem(USER).toString());

                this.props.history.push(`/mainProfilePage/${user.username}`);
            })
            .catch((error) => {
                notification.error({
                    message: "New event",
                    description:
                        error.message || "Sorry! Something went wrong. Please try again!",
                });
            });
    }

    toggleAgreement = () => {
        this.setState({
            userAgreement: !this.state.userAgreement,
        });
    };

    handleChange (event, validationFunction) {
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

    isStepDetailsInvalid () {
        return !(
            this.state.eventName.validateStatus === "success" &&
            this.state.eventDescription.validateStatus === "success" &&
            this.state.eventMaxPlayers.validateStatus === "success" &&
            this.state.sportCategory &&
            this.state.eventPlace
        );
    }

    isStepLocationInvalid () {
        return !(
            true
        );
    }

    isStepSumUpInvalid () {
        return !(this.state.userAgreement === true);
    }

    setStatus (validationFunction, number) {
        if (number > this.state.current) {
            return "wait";
        }
        if (validationFunction) {
            return "finish";
        } else {
            return "error";
        }
    }

    prev () {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    next () {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    render () {
        const { current } = this.state;
        const steps = [
            {
                title: "Nazwa i opis",
                content: "First-content",
                status: "process",
                validateStatus: this.isStepDetailsInvalid(),
            },
            {
                title: "Czas i lokalizacja",
                content: "Second-content",
                status: "wait",
                validateStatus: this.isStepLocationInvalid(),
            },
            {
                title: "Potwierdzenie",
                content: "Last-content",
                status: "wait",
                validateStatus: this.isStepSumUpInvalid(),
            },
        ];

        return (
            <Grid centered stackable columns={1}>
                <Grid.Column mobile={16} tablet={8} computer={12}>
                    <Steps className="custome-step" current={this.state.current}>
                        <Step
                            title={steps[0].title}
                            status={
                                0 < this.state.current
                                    ? "finish"
                                    : this.setStatus(!this.isStepDetailsInvalid(), 0)
                            }
                        />
                        <Step
                            title={steps[1].title}
                            status={
                                1 < this.state.current
                                    ? "finish"
                                    : this.setStatus(!this.isStepLocationInvalid(), 1)
                            }
                        />
                        <Step
                            title={steps[2].title}
                            status={
                                2 < this.state.current
                                    ? "finish"
                                    : this.setStatus(!this.isStepSumUpInvalid(), 2)
                            }
                        />
                    </Steps>

                    <div className="steps-content">{this.getStepContent(current)}</div>
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <Button
                                color="orange"
                                disabled={steps[current].validateStatus}
                                onClick={() => this.next()}
                            >
                                Następny krok
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button
                                disabled={steps[current].validateStatus}
                                color="orange"
                                onClick={this.handleSubmit}
                            >
                                Zgłoś obiekt
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                                Poprzedni krok
                            </Button>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}
export default EventForm;