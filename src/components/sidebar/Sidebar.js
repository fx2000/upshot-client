import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap components
import {
  ListGroup
} from 'react-bootstrap';

const Sidebar = () => {
  return (
    <ListGroup variant="flush">
      <LinkContainer to="/dashboard"><ListGroup.Item action variant="light">Dashboard</ListGroup.Item></LinkContainer>
      <LinkContainer to="/projects"><ListGroup.Item action variant="light">Projects</ListGroup.Item></LinkContainer>
      <LinkContainer to="/issues"><ListGroup.Item action variant="light">Issues</ListGroup.Item></LinkContainer>
      <LinkContainer to="/users"><ListGroup.Item action variant="light">Team Members</ListGroup.Item></LinkContainer>
    </ListGroup>
  );
};

export default Sidebar;
