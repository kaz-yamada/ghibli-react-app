import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Category from 'containers/Category';

export default class Main extends Component {
	render() {
		return (
			<main>
				<Route path="/" exact={true} component={Sidebar} />
				<Route path="/c/:category" component={Category} />
			</main>
		);
	}
}
