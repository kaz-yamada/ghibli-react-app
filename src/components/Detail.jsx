import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { getById, isEmpty } from '../api/ApiActions';
import DetailText from './DetailText';
import DetailLinks from './DetailLinks';

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      modal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getCategoryDetails();
  }

  async getCategoryDetails() {
    const { category, item, routeProps } = this.props;
    let data = {};

    if (isEmpty(item)) {
      const { id } = routeProps.match.params;
      const categoryData = sessionStorage.getItem(category);

      if (categoryData === null) {
        const response = await getById(category, id);
        data = await response.json();
      } else {
        const list = JSON.parse(categoryData);
        data = list[id];
      }
    } else {
      data = item;
    }

    this.setState({
      item: data,
      modal: true,
    });
  }

  toggleModal = () => {
    const { category, routeProps } = this.props;
    const url = `/c/${category}`;

    routeProps.history.push(url);

    this.setState(prevState => {
      return { modal: !prevState.modal };
    });
  };

  render() {
    const { category } = this.props;
    const { item, modal } = this.state;
    return (
      <div>
        <Modal isOpen={modal} autoFocus={false}>
          <ModalHeader toggle={this.toggleModal}>{item.title || item.name}</ModalHeader>
          <ModalBody>
            <DetailText item={item} category={category} excerpt={false} />
            <DetailLinks item={item} category={category} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

Detail.propTypes = {
  category: PropTypes.string.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string,
  }).isRequired,
  routeProps: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};
