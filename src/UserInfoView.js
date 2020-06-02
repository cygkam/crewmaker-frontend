import React, { Component } from 'react';
import { Button, Label, Icon, Grid, GridColumn, Image, Segment } from 'semantic-ui-react';
import LoadingIndicator from "./common/LoadingIndicator";
import ImgCrop from "antd-img-crop";
import { Upload, notification, Row as RowAntd } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.less";
import "./index.css";

import { ACCESS_TOKEN} from "./constants";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    notification.error({
      message: "Uploading avatar",
      description: "You can only upload JPG/PNG file!",
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification.error({
      message: "Uploading avatar",
      description: "Image must be smaller than 2MB!",
    });
  }
  return isJpgOrPng && isLt2M;
}

class UserInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingAvatar: false,
      imageUrl: null,
      user: this.props.user,
      username: "login użytkownika",
      name: "imie",
      surname: "nazwisko",
      email: "email użytkownika",
      userProfileImage:
        "https://react.semantic-ui.com/images/wireframe/image.png",
      phoneNumber: "telefon użytkownika",
      description: "Lorem ipsum dolor sit amet.",
      previewVisible: false,
    };
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loadingAvatar: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(
        info.file.originFileObj,
        (imageUrl) => {
          this.setState({
            imageUrl,
            loadingAvatar: false,
          })
          notification.success({
            message: "Zmiana zdjęcia profilowego",
            description: "Z sukcecem zmieniono zdjęcie!",
          });
          this.props.onChangeAvatar(imageUrl);
        }
        
      );
     
    }
  };


  componentDidMount(props) {
    this.setState((props) => ({
      username: this.props.username,
      name: this.props.name,
      surname: this.props.surname,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber,
      description: this.props.description,
      userProfileImage: this.props.userProfileImage,
    }));
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingIndicator />;
    }

    let isCurrent = this.props.currentUser === this.props.username;

    let button = null;
    if (this.props.currentUser === this.props.username) {
      button = (
        <Button fluid size="small" color="grey" onClick={this.props.handler}>
          <Button.Content visible>Edytuj profil</Button.Content>
        </Button>
      );
    }

    const uploadButton = (
      <div>
        {this.state.loadingAvatar ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    let { imageUrl } = this.state;
    imageUrl = this.props.userProfileImage;
    
    const headers = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    }

    return (
      <Grid>
        <GridColumn width="16">
          <Grid.Row>
            <Segment textAlign="center" className="parent">
              <Label attached="top">{this.props.username}</Label>
              {(() => {
                if (this.props.isLoadingImage) return <LoadingIndicator />;
                else if (isCurrent)
                  return (
                    <RowAntd justify="center" type="flex">
                      <ImgCrop rotate>
                        <Upload
                          listType="picture-card"
                          className="parent"
                          headers={headers}
                          openFileDialogOnClick
                          showUploadList={false}
                          action="http://localhost:8080/api/uploadPhoto/"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {!this.state.loadingAvatar ? (
                            <img
                              src={imageUrl}
                              alt="avatar"
                              style={{ width: "256px", height: "256px" }}
                            />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </ImgCrop>
                    </RowAntd>
                  );
                else
                  return (
                    <Image
                      fluid
                      bordered
                      rounded
                      centered
                      src={this.props.userProfileImage}
                      style={{ height: "200px", width: "200px" }}
                    />
                  );
              })()}
            </Segment>
            <Segment textAlign="left">
              <Icon name="user" />
              {this.props.name + " " + this.props.surname}
            </Segment>
            <Segment textAlign="left">
              <Icon name="mail" />
              {this.props.email}
            </Segment>
            <Segment textAlign="left">
              <Icon name="phone" />
              {this.props.phoneNumber}
            </Segment>
            <Segment textAlign="left">
              <Icon name="book" />
              {this.props.description}
            </Segment>
            {button}
          </Grid.Row>
        </GridColumn>
      </Grid>
    );
  }
}

export default UserInfoView;