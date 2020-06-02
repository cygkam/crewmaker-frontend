import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { validation } from "../Register/validationRules";
import { Input, Form, Typography, notification, Upload, Button, Row as RowAntd } from "antd";
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { ACCESS_TOKEN } from "../constants";
import "antd/dist/antd.less";
import "../index.css";


import "antd/dist/antd.less";
import "../index.css";

const FormItem = Form.Item;



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class EventPlaceLocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      isLoadingImage: false,
      eventPlaceImage:
        "https://react.semantic-ui.com/images/wireframe/image.png",
    };
    this.wrapper = React.createRef();
  }

  beforeUpload = (file) => {
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

    getBase64(file, (imageUrl) => {
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
      this.props.onChangeImage(imageUrl);
    });

    return false;
  };

  deleteImage = () =>{
    this.setState({
      imageUrl: null,
      eventPlaceImage: "https://react.semantic-ui.com/images/wireframe/image.png",
    });
    this.props.onChangeImage(null);
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.isLoadingImage ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    let { imageUrl } = this.state;
    imageUrl = this.props.eventPlaceImage;

    return (
      <Grid textAlign="center">
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <Form onSubmit={this.onSubmit} autoComplete="off">
            <Segment stacked>
              <FormItem
                hasFeedback
                style={{ marginBottom: 12 }}
                autoComplete="off"
                validateStatus={this.props.eventPlaceCity.validateStatus}
                help={this.props.eventPlaceCity.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceCity"
                  value={this.props.eventPlaceCity.value}
                  placeholder="Miasto"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceCity
                    );
                  }}
                />
              </FormItem>
              <FormItem
                style={{ marginBottom: 12 }}
                hasFeedback
                autoComplete="off"
                validateStatus={this.props.eventPlacePostalCode.validateStatus}
                help={this.props.eventPlacePostalCode.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlacePostalCode"
                  value={this.props.eventPlacePostalCode.value}
                  placeholder="Kod pocztowy"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlacePostalCode
                    );
                  }}
                />
              </FormItem>
              <FormItem
                style={{ marginBottom: 12 }}
                hasFeedback
                autoComplete="off"
                validateStatus={this.props.eventPlaceStreet.validateStatus}
                help={this.props.eventPlaceStreet.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceStreet"
                  value={this.props.eventPlaceStreet.value}
                  placeholder="Ulica"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceStreet
                    );
                  }}
                />
              </FormItem>
              <FormItem
                style={{ marginBottom: 12 }}
                hasFeedback
                autoComplete="off"
                validateStatus={
                  this.props.eventPlaceStreetNumber.validateStatus
                }
                help={this.props.eventPlaceStreetNumber.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceStreetNumber"
                  value={this.props.eventPlaceStreetNumber.value}
                  placeholder="Numer budynku/lokalu"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceStreetNumber
                    );
                  }}
                />
              </FormItem>
              <FormItem
                label="Wybierz zdjęcie obiektu [opcjonalne]"
                style={{ marginBottom: 6 }}
                className="parent"
              >
                <Segment textAlign="center" className="parent">
                  <RowAntd justify="center" type="flex" className="parent">
                    <ImgCrop rotate>
                      <Upload
                        listType="picture-card"
                        className="parent"
                        openFileDialogOnClick
                        showUploadList={false}
                        beforeUpload={this.beforeUpload}
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
                  {this.props.eventPlaceImage === null ? (
                    <React.Fragment />
                  ) : (
                    <Button onClick={this.deleteImage}>Usuń</Button>
                  )}
                </Segment>
              </FormItem>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventPlaceLocationForm;