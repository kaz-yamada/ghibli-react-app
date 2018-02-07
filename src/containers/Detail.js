import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { getById, isEmpty } from 'actions/ApiActions.js';
import CategoryText from 'components/CategoryText';
import CategoryLinks from 'components/CategoryLinks';

export default class Detail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			item: {},
			modal: false
		};

		this.getCategoryDetails = this.getCategoryDetails.bind(this);
		this.setDetailState = this.setDetailState.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	componentDidMount() {
		this.getCategoryDetails();
	}

	componentWillReceiveProps(nextProps) {
		this.getCategoryDetails(nextProps);
	}

	/**
	 * Fetch the Details of the clicked category item
	 * @param {*} props
	 */
	getCategoryDetails(props = this.props) {
		const category = props.category;

		if (isEmpty(props.item)) {
			const id = props.routeProps.match.params.id;
			getById(category, id)
				.then(response => {
					this.setDetailState(response.data, props.category);
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			this.setDetailState(props.item, props.category);
		}
	}

	setDetailState(item, category) {
		this.setState({
			item: item,
			category: category,
			modal: true
		});
	}

	toggleModal() {
		this.setState({
			modal: !this.state.modal
		});

		const history = this.props.routeProps.history;

		if (history.action === 'PUSH') {
			this.props.routeProps.history.goBack();
		} else {
			history.push(`/c/${this.state.category}`);
		}
	}

	render() {
		return (
			<div>
				<Modal isOpen={this.state.modal} autoFocus={false}>
					<ModalHeader toggle={this.toggleModal}>
						{this.state.item.title || this.state.item.name}
					</ModalHeader>
					<ModalBody>
						<CategoryText
							item={this.state.item}
							category={this.state.category}
							excerpt={false}
						/>
						<CategoryLinks
							item={this.state.item}
							category={this.state.category}
						/>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
