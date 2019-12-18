import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { getById, isEmpty } from '../api/ApiActions';
import DetailText from '../components/DetailText';
import DetailLinks from '../components/DetailLinks';

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

  /**
   * Fetch the Details of the clicked category item
   * @param {*} props
   */
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
      category,
    });
  }

  toggleModal = () => {
    const { routeProps } = this.props;
    const { category } = this.state;

    routeProps.history.push(`/c/${category}`);

    this.setState(prevState => {
      return { modal: !prevState.modal };
    });
  };

  render() {
    const { item, modal, category } = this.state;
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
    history: PropTypes.shape({}),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};
