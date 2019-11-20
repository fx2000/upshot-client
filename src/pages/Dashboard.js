import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';

// Bootstrap Components
import {
  Breadcrumb,
  Container,
  Row,
} from 'react-bootstrap';

class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dash: ''
    };
  }

  render () {
    return (
      <Container fluid>
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <h2>Dashboard</h2>
        </Row>
        <Row>
        </Row>
      </Container>
    );
  }
}

export default withAuth(Dashboard);
