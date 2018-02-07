import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from 'components/Home';
import Category from 'containers/Category';

export default class Main extends Component {
	render() {
		return (
			<main>
				<Route
					path={`${process.env.PUBLIC_URL}/`}
					exact={true}
					component={Home}
				/>
				<Route
					path={`${process.env.PUBLIC_URL}/c/:category`}
					component={Category}
				/>
			</main>
		);
	}
}
