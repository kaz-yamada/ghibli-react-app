import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';

import Main from './components/Main';
import Navigation from './components/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

export default () => (
  <BrowserRouter>
    <Container fluid>
      <Navigation />
      <Container>
        <Main />
      </Container>
    </Container>
  </BrowserRouter>
);
