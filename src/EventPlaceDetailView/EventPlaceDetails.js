import React, { Component } from "react";
import {
  Segment,
  Grid,
  Label,
  Header,
  Button,
  Icon,
} from "semantic-ui-react";
import PlaceOpinionCard from "../PlaceOpinion/PlaceOpinionCard";
import AddPlaceOpinion from "../PlaceOpinion/AddPlaceOpinion";
import { eventPlaceOpinionService, eventService } from "../Api/Api";
import LoadingIndicator from "../common/LoadingIndicator";
import { USER, ACCESS_TOKEN } from "../constants";
import ImgCrop from "antd-img-crop";
import { Upload, notification, Row as RowAntd } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.less";
import "../index.css";


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    notification.error({
      message: "Uploading image",
      description: "You can only upload JPG/PNG file!",
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification.error({
      message: "Uploading image",
      description: "Image must be smaller than 2MB!",
    });
  }
  return isJpgOrPng && isLt2M;
}


class EventPlaceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opinions: [],
      aboutUsername: "",
      currentUser: "",
      currentUserOpinion: null,
      isLoading: true,
      imageUrl: null,
      opinionAdding: false,
      isLoadingImage: false,
      eventPlaceImage:
        "https://react.semantic-ui.com/images/wireframe/image.png",
    };

    this.opinionEditionHandler = this.changeOpinionEditionPanel.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ isLoadingImage: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          imageUrl,
          isLoadingImage: false,
        });
        notification.success({
          message: "Zmiana zdjęcia obiektu",
          description: "Z sukcecem zmieniono zdjęcie!",
        });
        this.setState({
          eventPlaceImage: imageUrl,
        });
      });
    }
  };


  changeOpinionEditionPanel() {
    this.setState({
      opinionAdding: !this.state.opinionAdding,
    });
  }

  handleCommentChange(newComment) {
    this.setState({
      currentUserOpinion: newComment,
    });
    console.log(this.state.currentUserOpinion);
  }

  componentDidMount() {
    this.loadOpinions(this.props.eventPlaceDetails.eventPlaceID);
    const user = JSON.parse(localStorage.getItem(USER).toString());
    this.loadOpinion(this.props.eventPlaceDetails.eventPlaceID, user.username);
    this.loadEventPlaceImage(this.props.eventPlaceDetails.eventPlaceID);
  }

  loadOpinions(eventPlaceID) {
    eventPlaceOpinionService
      .getEventPlaceOpinions(eventPlaceID)
      .then((response) => {
        this.setState({
          opinions: response,
          isLoading: false,
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoading: false,
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false,
          });
        }
      });
  }

  loadOpinion(username, current) {
    eventPlaceOpinionService
      .getEventPlaceOpinion(username, current)
      .then((response) => {
        this.setState({
          currentUserOpinion: response,
          isLoading: false,
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoading: false,
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false,
          });
        }
      });
  }

  loadEventPlaceImage(eventPlaceID) {
    eventService
      .getEventPlaceImage(eventPlaceID)
      .then((response) => {
        this.setState({
          eventPlaceImage: "data:image/jpeg;base64," + response.binaryData,
          isLoadingImage: false,
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            isLoadingImage: false,
            eventPlaceImage:
              "https://react.semantic-ui.com/images/wireframe/image.png",
          });
        } else {
          this.setState({
            serverError: true,
            isLoadingImage: false,
          });
        }
      });
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.isLoadingImage ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    let { imageUrl } = this.state;
    imageUrl = this.state.eventPlaceImage;

    const headers = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    };

    let opinionButton = (
      <Button
        floated="right"
        animated
        color="orange"
        onClick={this.opinionEditionHandler}
      >
        <Button.Content visible>Dodaj opinię</Button.Content>
        <Button.Content hidden>
          <Icon name="plus" />
        </Button.Content>
      </Button>
    );
    if (this.state.opinionAdding) {
      opinionButton = (
        <Button floated="right" negative onClick={this.opinionEditionHandler}>
          Anuluj
        </Button>
      );
    } else if (this.state.currentUserOpinion != null) {
      opinionButton = (
        <Button
          floated="right"
          animated
          color="orange"
          onClick={this.opinionEditionHandler}
        >
          <Button.Content visible>Edytuj opinię</Button.Content>
          <Button.Content hidden>
            <Icon name="plus" />
          </Button.Content>
        </Button>
      );
    }

    let userOpinion = null;
    if (this.state.currentUserOpinion != null && !this.state.opinionAdding) {
      userOpinion = (
        <PlaceOpinionCard
          key={this.state.currentUserOpinion.userOpinionID}
          opinionData={this.state.currentUserOpinion}
        ></PlaceOpinionCard>
      );
    } else if (this.state.opinionAdding) {
      userOpinion = (
        <AddPlaceOpinion
          aboutEventPlace={this.props.eventPlaceDetails.eventPlaceID}
          currentUser={this.state.currentUser}
          opinionData={this.state.currentUserOpinion}
          handler={this.opinionEditionHandler}
          onChange={this.handleCommentChange}
        ></AddPlaceOpinion>
      );
    }

    if (this.state.isLoading) {
      return <LoadingIndicator></LoadingIndicator>;
    } else {
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                <Label
                  size="big"
                  textAlign="left"
                  attached="top left"
                  color="orange"
                >
                  Nazwa
                </Label>
                {this.props.eventPlaceDetails.eventPlaceName}
              </Segment>
              <Segment>
                <Label textAlign="left" attached="top left" color="orange">
                  Opis
                </Label>
                {this.props.eventPlaceDetails.eventPlaceDescription
                  ? this.props.eventPlaceDetails.eventPlaceDescription
                  : "Brak"}
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Segment>
                <Label textAlign="left" attached="top left" color="orange">
                  Miasto
                </Label>
                {this.props.eventPlaceDetails.eventPlaceCity}
              </Segment>
              <Segment>
                <Label textAlign="left" attached="top left" color="orange">
                  Kod pocztowy
                </Label>
                {this.props.eventPlaceDetails.eventPlacePostCode}
              </Segment>
              <Segment>
                <Label textAlign="left" attached="top left" color="orange">
                  Ulica/Numer
                </Label>
                {this.props.eventPlaceDetails.eventPlaceStreetName}{" "}
                {this.props.eventPlaceDetails.eventPlaceStreetNumber}
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment textAlign="center" className="parent">
                <Label textAlign="left" attached="top left" color="orange">
                  Zdjęcie obiektu
                </Label>
                {this.props.isAdmin ? (
                  <RowAntd justify="center" type="flex">
                    <ImgCrop rotate>
                      <Upload
                        listType="picture-card"
                        className="parent"
                        headers={headers}
                        openFileDialogOnClick
                        showUploadList={false}
                        action={
                          "http://localhost:8080/api/event-place-image/" +
                          this.props.eventPlaceDetails.eventPlaceID
                        }
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                      >
                        {!this.state.isLoadingImage ? (
                          <img
                            src={imageUrl}
                            alt="zdjęcie obiektu"
                            style={{ width: "256px", height: "256px" }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </ImgCrop>
                  </RowAntd>
                ) : (
                  <RowAntd justify="center" type="flex">
                    <img
                      src={imageUrl}
                      alt="zdjęcie obiektu"
                      style={{ width: "256px", height: "256px" }}
                    />
                  </RowAntd>
                )}
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16} verticalAlign="middle">
              <Segment>
                <Label textAlign="left" attached="top" color="orange">
                  Opinie
                  {opinionButton}
                </Label>
                {userOpinion}
                {this.state.opinions.length > 0 &&
                  this.state.opinions.map((opinion) => (
                    <PlaceOpinionCard
                      key={opinion.userOpinionID}
                      opinionData={opinion}
                    ></PlaceOpinionCard>
                  ))}
                {this.state.opinions.length === 0 &&
                  this.state.currentUserOpinion == null && (
                    <Grid textAlign="center">
                      <Grid.Column>
                        <Grid.Row>
                          <Segment>
                            <Header as="h1" color="orange">
                              Brak opinii o miejscu
                            </Header>
                          </Segment>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid>
                  )}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

export default EventPlaceDetails;
