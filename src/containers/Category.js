import React, { Component } from 'react';
import { getCategoryItems } from 'actions/ApiActions';

import CategoryList from 'components/CategoryList';

export default class Category extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentCategory: this.props.match.params.category,
			isLoaded: false,
			catItems: []
		};
	}

	componentDidMount() {
		this.fetchCategoryItems(this.state.currentCategory);
	}

	componentWillReceiveProps(nextProps) {
		const nextCategory = nextProps.match.params.category;
		if (this.state.currentCategory !== nextCategory) {
			this.setState({ isLoaded: false });
			this.fetchCategoryItems(nextCategory);
		}
	}

	fetchCategoryItems(category) {
		getCategoryItems(category)
			.then(response => {
				this.setState({
					catItems: response.data,
					currentCategory: category,
					isLoaded: true
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
				<CategoryList
					category={this.state.currentCategory}
					list={this.state.catItems}
					url={this.props.match.url}
				/>
			</div>
		);
	}
}
