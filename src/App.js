import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

// Authentication Middleware
import AuthProvider from './lib/AuthProvider';
import AnonRoute from './components/auth/AnonRoute';
import PrivateRoute from './components/auth/PrivateRoute';

// Components
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

// Bootstrap Components
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

// Pages
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Issues from './pages/issues/Issues';
import CreateIssue from './pages/issues/CreateIssue';
import ViewIssue from './pages/issues/ViewIssue';
import CommentIssue from './pages/issues/CommentIssue';
import UpdateIssue from './pages/issues/UpdateIssue';
import Projects from './pages/projects/Projects';
import CreateProject from './pages/projects/CreateProject';
import ViewProject from './pages/projects/ViewProject';
import UpdateProject from './pages/projects/UpdateProject';
import Users from './pages/users/Users';
import ViewUser from './pages/users/ViewUser';
import UpdateUser from './pages/users/UpdateUser';

// Firebase
import firebase from 'firebase';
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
};
firebase.initializeApp(config);

class App extends Component {
  render () {
    return (
      <AuthProvider>
        <Navbar />
        <Container fluid>
          <Row>
            <Col sm={2} className="sidebar">
              <Sidebar />
            </Col>
            <Col sm={10} className="main">
              <Switch>
                <AnonRoute exact path="/signup" component={Signup} />
                <AnonRoute exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/issues" component={Issues} />
                <PrivateRoute exact path="/issues/create" component={CreateIssue} />
                <PrivateRoute exact path="/issues/create/:id" component={CreateIssue} />
                <PrivateRoute exact path="/issues/:id" component={ViewIssue} />
                <PrivateRoute exact path="/issues/:id/comment" component={CommentIssue} />
                <PrivateRoute exact path="/issues/:id/update" component={UpdateIssue} />
                <PrivateRoute exact path="/projects" component={Projects} />
                <PrivateRoute exact path="/projects/create" component={CreateProject} />
                <PrivateRoute exact path="/projects/:id" component={ViewProject} />
                <PrivateRoute exact path="/projects/:id/update" component={UpdateProject} />
                <PrivateRoute exact path="/users" component={Users} />
                <PrivateRoute exact path="/users/:id" component={ViewUser} />
                <PrivateRoute exact path="/users/:id/update" component={UpdateUser} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </AuthProvider>
    );
  }
}

export default App;
