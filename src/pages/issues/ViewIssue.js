import React, { Component } from 'react';
import issues from '../../lib/issue-service';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';
import IssueComments from '../../components/issue/IssueComments';
import Attachments from '../../components/issue/Attachments';

// Bootstrap Components
import {
  Tabs,
  Tab,
  Breadcrumb,
  Container,
  Row,
  Button,
  ButtonGroup
} from 'react-bootstrap';

class ViewIssue extends Component {
  constructor (props) {
    super(props);
    this.state = {
      issue: ''
    };
  }

  componentDidMount = () => {
    // Call issue details API
    const { id } = this.props.match.params;
    issues.details(id).then(
      response => {
        const issue = response.data;
        this.setState({
          issue: issue
        });
      }
    ).catch(error => console.log(error));
    
  }

  // Call follow issue API
  followIssue = () => {
    const id = this.state.issue._id;
    issues.follow({
      id
    });
  }

  // Call unfollow issue API
  unfollowIssue = () => {
    const id = this.state.issue._id;
    issues.unfollow({
      id
    });
  }

  // Call takeover issue API
  takeoverIssue = () => {
    const id = this.state.issue._id;
    issues.takeover({
      id
    });
  }

  // Call release issue API
  releaseIssue = () => {
    const id = this.state.issue._id;
    issues.release({
      id
    });
  }

  render = () => {
    // Check user properties to define button rendering
    let update = false;
    let following = false;
    let assigned = false;
    if (this.state.issue) {
      if (this.props.user._id === this.state.issue.creator._id) { update = true }

      this.props.user.following.forEach(issue => {
        if (issue._id === this.state.issue._id) { following = true }
      });

      this.props.user.assignedTo.forEach(issue => {
        if (issue._id === this.state.issue._id) { assigned = true }
      });
    }
    console.log(this.state.issue)
    
    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <LinkContainer to="/issues"><Breadcrumb.Item>Issues</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Issue Details</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="controls">
          {/* Render buttons according to user's profile */}
          <h2>{this.state.issue.title}</h2>

          <ButtonGroup aria-label="Actions">
            {
              this.state.issue && update ?
                <LinkContainer to={'/issues/' + this.state.issue._id + '/update'}><Button variant="upshot">Update</Button></LinkContainer> : null
            }
            {
              this.state.issue && following ?
                <Button onClick={this.unfollowIssue} variant="upshot">Unfollow</Button> : <Button onClick={this.followIssue} variant="upshot">Follow</Button>
            }
            {
              this.state.issue && assigned ?
                <Button onClick={this.releaseIssue} variant="upshot">Release</Button> : <Button onClick={this.takeoverIssue} variant="upshot">Takeover</Button>
            }
          </ButtonGroup>
          
        </Row>
        <Row>
          <Container fluid>
            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example" className="details">
              <Tab eventKey="details" title="Details">
                <Container fluid className="issue-details">
                  <Row>
                    {this.state.issue.content}
                  </Row>
                  <Row>
                    <Container className="attachment">
                      {
                        this.state.issue.attachments &&
                        this.state.issue.attachments.map((attachment, index) =>
                          <Attachments
                            key = { index }
                            attachment = { attachment }
                          />
                        )
                      }
                    </Container>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="comments" title="Comments">
                <Container fluid className="issue-details">
                  <Row>
                    <LinkContainer to={'/issues/' + this.state.issue._id + '/comment'}>
                      <Button variant="upshot">Post New Comment</Button>
                    </LinkContainer>
                  </Row>
                  <Row>
                    <Container fluid className="comments">
                      {
                        this.state.issue.comments &&
                        this.state.issue.comments.map((comment, index) =>
                          <IssueComments
                            key = { index }
                            id = { comment._id }
                            commenterId = { comment.user._id }
                            commenterName = { comment.user.firstName + ' ' + comment.user.lastName}
                            avatar = { comment.user.avatar }
                            content = { comment.content }
                          />
                        )
                      }
                    </Container>
                  </Row>
                </Container>
              </Tab>
            </Tabs>
          </Container>
        </Row>
      </Container>
    );
  }
}

export default withAuth(ViewIssue);
