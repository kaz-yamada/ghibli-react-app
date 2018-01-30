import React, { Component } from 'react';
import { Container } from 'reactstrap';

import Main from 'components/Main';
import Navigation from 'components/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/App.css';

export default class App extends Component {
	render() {
		return (
			<Container fluid>
				<Navigation />
				<Container>
					<Main />
				</Container>
			</Container>
		);
	}
}
