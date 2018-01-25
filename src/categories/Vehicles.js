import React, { Component } from 'react';
import { Row, Jumbotron } from 'reactstrap';

import { fetchItems } from 'APIactions';
import ListItem from 'common/ListItem';

export default class Characters extends Component {
	constructor(props) {
		super();
		this.state = {
			isLoaded: false,
			vehicles: []
		};
	}

	vehicleInfo(vehicle) {
		return (
			<div>
				<p>{vehicle.description}</p>
				<ul>
					<li>Class: {vehicle.vechicle_class}</li>
					<li>Length: {vehicle.length}</li>
				</ul>
			</div>
		);
	}

	componentDidMount() {
		console.log('Loading vehicles...');
		fetchItems('vehicles')
			.then(response => {
				this.setState({
					isLoaded: true,
					vehicles: response.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		if (!this.state.isLoaded) {
			return <p>loading...</p>;
		}

		return (
			<div>
				<Jumbotron>
					<h1>Vehicles</h1>
					<p>List of vehicles that appear in films by Studio Ghilbi</p>
				</Jumbotron>
				<Row className="vehicles cards-list">
					{this.state.vehicles.map(vehicle => {
						return (
							<ListItem
								key={vehicle.id}
								title={vehicle.name}
								text={this.vehicleInfo(vehicle)}
							/>
						);
					})}
				</Row>
			</div>
		);
	}
}
