import React, { Component } from 'react';
import issues from '../../lib/issue-service';
import IssueListItem from '../../components/issue/IssueListItem';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap Components
import {
  Breadcrumb,
  Container,
  Row,
  Table,
  Button
} from 'react-bootstrap';

class Issues extends Component {
  constructor () {
    super();
    this.state = {
      issues: []
    };
  }

  componentDidMount () {
    // Call issues list API
    issues.list().then(
      response => {
        const issues = response.data;
        if (issues.length > 0) {
          this.setState({ issues });
        }
      }
    ).catch(error => console.log(error));
  }

  render () {
    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Issues</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="controls">
          <h2>Issues</h2>
          <LinkContainer to="/issues/create"><Button variant="upshot">Create Issue</Button></LinkContainer>
        </Row>
        <Row>
          { /* Add "Assigned To" column */}
          <Table responsive className="table" striped hover>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
                <th>Title</th>
                <th>Description</th>
                <th>Project</th>
                <th>Followers</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.issues.map((issue, index) =>
                  <IssueListItem
                    key = { index }
                    id = { issue._id }
                    priority = { issue.priority }
                    status = {issue.status}
                    title = { issue.title }
                    created = { issue.relativeDate }
                    description = { issue.content }
                    projectId = { issue.project._id }
                    projectName = { issue.project.name }
                    creatorId = { issue.creator._id }
                    creatorName = { issue.creator.firstName + ' ' + issue.creator.lastName}
                    followers = { issue.followers.length }
                    comments = { issue.comments.length }
                  />
                )
              }
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

export default withAuth(Issues);
