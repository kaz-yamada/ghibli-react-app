import React, { Component } from 'react';
import { Row, Col, Jumbotron, Card, CardTitle, CardText } from 'reactstrap';
import { Link, Route } from 'react-router-dom';

import Detail from 'containers/Detail';
import CategoryText from 'components/CategoryText';

export default class CategoryList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentItem: {}
		};
	}

	setCategoryItem(item) {
		this.setState({ currentItem: item });
	}

	displayCard(item) {
		const detailsLink =
			process.env.PUBLIC_URL + '/c/' + this.props.category + '/' + item.id;

		return (
			<Col xs="12" md="6" lg="4" key={item.id}>
				<Card className="h-100 card-body">
					<CardTitle>{item.name || item.title}</CardTitle>
					<CardText tag="div">
						<CategoryText
							item={item}
							category={this.props.category}
							excerpt={true}
						/>
					</CardText>
					<Link to={detailsLink} onClick={() => this.setCategoryItem(item)}>
						More Info
					</Link>
				</Card>
			</Col>
		);
	}

	displayJumbotron(category) {
		const title =
			category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

		return <h1>{title}</h1>;
	}

	render() {
		return (
			<div className="list-wrapper">
				<Jumbotron>{this.displayJumbotron(this.props.category)}</Jumbotron>
				<Row className="category-list">
					{this.props.list.map(item => {
						return this.displayCard(item);
					})}
				</Row>
				<Route
					path={`${this.props.url}/:id`}
					render={routeProps => (
						<Detail
							routeProps={routeProps}
							item={this.state.currentItem}
							category={this.props.category}
						/>
					)}
				/>
			</div>
		);
	}
}
