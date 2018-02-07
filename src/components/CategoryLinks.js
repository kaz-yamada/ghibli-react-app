import React, { Component } from 'react';
import { getLinkedCategories } from 'actions/ApiActions.js';

const displayFields = {
	film: [''],
	people: [
		{ label: 'films', heading: 'Appears in' },
		{ label: 'species', heading: 'Species' }
	],
	locations: [
		{ label: 'people', heading: 'Residents' },
		{ label: 'films', heading: 'Appears In' }
	],
	species: [
		{ label: 'people', heading: 'Members' },
		{ label: 'films', heading: 'Appears in' }
	],
	vehicles: [
		{ label: 'people', heading: 'Pilots' },
		{ label: 'films', heading: 'Appears in' }
	]
};

export default class CategoryLinks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			films: [],
			location: [],
			people: [],
			species: [],
			vechiles: []
		};

		this.displayLinks = this.displayLinks.bind(this);
	}

	componentDidMount() {
		const promiseArray = getLinkedCategories(
			this.props.item,
			this.props.category
		);
		this.setState({ loaded: false });

		promiseArray.forEach(arrayItem => {
			arrayItem.promises
				.then(responseArray => {
					const relatedItems = responseArray.map(response => {
						return response.data;
					});

					let category = arrayItem.category;
					if (category === 'residents' || category === 'pilot') {
						category = 'people';
					}

					let obj = {};
					obj[category] = relatedItems;
					this.setState(obj);
				})
				.then(() => {
					this.setState({ loaded: true });
				})
				.catch(err => {
					console.log(err);
				});
		});
	}

	displayLinks() {
		const fields = displayFields[this.props.category];

		return fields.map(relatedItem => {
			return (
				<div key={relatedItem.label}>
					<h4>{relatedItem.heading}</h4>
					<div>{this.getNames(relatedItem.label)}</div>
				</div>
			);
		});
	}

	getNames(label) {
		const name = this.state[label].map(val => {
			return <p key={val.id}>{val.title || val.name}</p>;
		});
		return name.length ? name : <p>Empty</p>;
	}

	render() {
		if (this.state.loaded) return <div>{this.displayLinks()}</div>;

		return <p>Loading...</p>;
	}
}
