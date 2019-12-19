import React from 'react';
import { Container } from 'reactstrap';
import { HashRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Category from './pages/Category';
import Navigation from './components/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

export default () => (
  <HashRouter>
    <Container fluid>
      <Navigation />
      <Container>
        <Route path="/" exact component={Home} />
        <Route path="/c/:category" component={Category} />
      </Container>
    </Container>
  </HashRouter>
);
