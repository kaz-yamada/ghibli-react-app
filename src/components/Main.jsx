import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Category from '../containers/Category';

export default () => (
  <main>
    <Route path={`${process.env.PUBLIC_URL}/`} exact component={Home} />
    <Route path={`${process.env.PUBLIC_URL}/c/:category`} component={Category} />
  </main>
);
