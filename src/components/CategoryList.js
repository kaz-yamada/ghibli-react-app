import React, { Component } from 'react';
import { Row, Col, Card, CardTitle, CardText, Jumbotron } from 'reactstrap';

const displayFields = {
	films: [
		{ name: 'description', hideLabel: true },
		{ name: 'director' },
		{ name: 'producer' },
		{ name: 'release_date', label: 'Release Date' },
		{ name: 'rt_score', label: 'Rotten Tomatoes Score' }
	],
	locations: [
		{ name: 'climate' },
		{ name: 'terrain' },
		{ name: 'surface_water', label: 'Surface Water' }
	],
	people: [
		{ name: 'gender' },
		{ name: 'age' },
		{ name: 'eye_color', label: 'Eye Color' },
		{ name: 'hair_color', label: 'Hair color' }
	],
	species: [
		{ name: 'eye_colors', label: 'Eye Colors' },
		{ name: 'hair_colors', label: 'Hair Colors' }
	],
	vehicles: [
		{ name: 'description', hideLabel: true },
		{ name: 'vehicle_class', label: 'Vehicle Class' },
		{ name: 'length' }
	]
};

export default class CategoryList extends Component {
	displayText(arrayItem) {
		let category = displayFields[this.props.category];
		let label = '';

		return category.map(currentField => {
			if (currentField.label && !currentField.hideLabel) {
				label = <label>{currentField.label}: </label>;
			} else if (!currentField.hideLabel) {
				let string =
					currentField.name.charAt(0).toUpperCase() +
					currentField.name.slice(1).toLowerCase();
				label = <label>{string}: </label>;
			}
			return (
				<p key={currentField.name}>
					{label}
					{arrayItem[currentField.name]}
				</p>
			);
		});
	}

	displayCard(item) {
		return (
			<Col xs="12" md="6" lg="4" key={item.id}>
				<Card className="h-100 card-body">
					<CardTitle>{item.name || item.title}</CardTitle>
					<CardText tag="div">{this.displayText(item)}</CardText>
				</Card>
			</Col>
		);
	}

	displayJumbotron(category) {
		const title =
			category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

		return (
			<Jumbotron>
				<h1>{title}</h1>
			</Jumbotron>
		);
	}

	render() {
		return (
			<div>
				{this.displayJumbotron(this.props.category)}
				<Row className="category-list">
					{this.props.list.map(item => {
						return this.displayCard(item);
					})}
				</Row>
			</div>
		);
	}
}
