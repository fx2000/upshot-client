import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import projects from '../../lib/project-service';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";

// Bootstrap Components
import {
  Form,
  Button,
  Alert,
  Breadcrumb,
  Container,
  Row
} from 'react-bootstrap';

class CreateProject extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: '',
      imageURL: '',
      progress: '',
      isUploading: '',
      errors: ''
    };
  }

  // Form submit handler
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      description,
      imageURL
    } = this.state;
    projects.create({
      name,
      description,
      imageURL
    });

    this.setState({
      name: '',
      description: ''
    });
    // TODO: Fix redirect so it refreshes
    this.props.history.push('/projects')
  }

  // Form change handler
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Upload file handler
  handleUploadStart = () => this.setState({
    isUploading: true,
    progress: 0
  });

  // Upload progress handler
  handleProgress = progress => this.setState({
    progress
  });

  // Upload error handler
  handleUploadError = error => {
    this.setState({
      isUploading: false
    });
    console.log(error);
  };

  // Upload success handler
  handleUploadSuccess = filename => {
    this.setState({
      image: filename,
      progress: 100,
      isUploading: false
    });
    firebase
      .storage()
      .ref("projects")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({
        imageURL: url
      }));
  };

  render () {
    const {
      name,
      description,
      errors
    } = this.state;

    return (
      <Container fluid = { true }>
        <Row>
          <Breadcrumb>
            <LinkContainer to = "/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
            <LinkContainer to = "/projects"><Breadcrumb.Item>Projects</Breadcrumb.Item></LinkContainer>
            <Breadcrumb.Item active>Create Project</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>Create Project</h2>
        </Row>
        <Row>
          <Form onSubmit = { this.handleFormSubmit }>
            { /* Display uploaded image */ }
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.imageURL && <img src={this.state.imageURL} alt="File upload"/>}

            <Form.Group controlId = "name" >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type = "text"
                name = "name"
                value = { name }
                onChange = { this.handleChange }
                required
              />
            </Form.Group>

            <Form.Group controlId = "description" >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type = "text"
                name = "description"
                value = { description }
                onChange = { this.handleChange }
                required
              />
            </Form.Group>

            <label style = {
              {
                backgroundColor: 'steelblue',
                color: 'white',
                padding: 10,
                borderRadius: 4,
                cursor: 'pointer'
              }
            }>Upload a Project Image
              <FileUploader
                hidden
                accept="image/*"
                name="image"
                randomizeFilename
                storageRef={firebase.storage().ref("projects")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </label>
            
            {errors && (<Alert variant="danger" dismissible><p>{errors}</p></Alert>)}

            <Button variant="primary" type="submit" disabled = { !name || !description }>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withAuth(CreateProject);