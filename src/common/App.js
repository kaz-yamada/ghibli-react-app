import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Sidebar from 'common/Sidebar';
import Main from 'common/Main';
import Navigation from 'common/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/App.css';

class App extends Component {
	render() {
		return (
			<Container fluid>
				<Navigation />
				<Row>
					<Col xs="12" lg="3">
						<Sidebar />
					</Col>
					<Col xs="12" lg="9">
						<Main />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
