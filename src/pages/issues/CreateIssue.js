import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import issues from '../../lib/issue-service';
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

class CreateIssue extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      project: '',
      priority: '',
      filenames: [],
      attachments: [],
      isUploading: false,
      uploadProgress: 0,
      errors: '',
      projects: [],
    };
  }

  // Form submit handler
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      content,
      project,
      priority,
      attachments
    } = this.state;

    issues.create({
      title,
      content,
      project,
      priority,
      attachments
    });

    this.setState({
      title: '',
      content: '',
      project: '',
      priority: '',
      filenames: [],
      attachments: [],
      isUploading: false,
      uploadProgress: 0,
      errors: ''
    });
    // TODO: Fix redirect so it refreshes
    this.props.history.push('/issues');
  }

  // Form change handler
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Upload file handler
  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  // Upload progress handler
  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  // Upload error handler
  handleUploadError = error => {
    this.setState({
      isUploading: false
    });
    console.error(error);
  };

  // Upload success handler
  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();
 
    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      attachments: [...oldState.attachments, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
  };

  componentDidMount () {
    // Get Projects list
    projects.list().then(
      response => {
        const projects = response.data;
        if (projects.length > 0) {
          this.setState({ projects });
        }
      }
    ).catch(error => console.log(error));
  }

  render () {
    const {
      title,
      content,
      errors
    } = this.state;

    return (
      <Container fluid={true}>
        <Row>
          <Breadcrumb>
            <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
            <LinkContainer to="/issues"><Breadcrumb.Item>Issues</Breadcrumb.Item></LinkContainer>
            <Breadcrumb.Item active>Create Issue</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>Create Issue</h2>
        </Row>
        <Row>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group controlId="title" >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="content" >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                rows="10"
                name="content"
                value={content}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="project">
              <Form.Label>Project</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} name="project" value={this.props.match.params.id} required>
                {
                  this.state.projects && this.state.projects.map(project => (
                    <option value={project._id} key={project._id}>{project.name}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId = "priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} name="priority" required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </Form.Control>
            </Form.Group>
            
            <label style = {
              {
                backgroundColor: 'steelblue',
                color: 'white',
                padding: 10,
                borderRadius: 4,
                cursor: 'pointer'
              }
            }>Add attachments
              <FileUploader
                hidden
                accept="image/*"
                name="image-uploader-multiple"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
                multiple
              />
            </label>
            <Container>
              <Row>
                <p>Upload Progress: {this.state.uploadProgress}%</p>
              </Row>
              <Row>
                <p>Attachments:</p>
                <ul className="attachments">
                  {this.state.filenames.map((attachment, index) =>
                    <li key={index}>{attachment}</li>
                  )}
                </ul>
              </Row>
              <Row>
                {this.state.attachments.map((downloadURL, i) => {
                  return <img
                    key={i}
                    alt = "Attachment"
                    src = {downloadURL}
                    width = "auto"
                    height = "100"
                    className = "d-inline-block align-top" />
                })}
              </Row>
            </Container>

            {errors && (<Alert variant="danger" dismissible><p>{errors}</p></Alert>)}

            <Button variant="primary" type="submit" disabled={!title || !content}>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withAuth(CreateIssue);