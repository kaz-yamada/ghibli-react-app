/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { textLabels } from '../data/displayFields';

export default class DetailText extends Component {
  render() {
    const { category, item, excerpt } = this.props;
    const field = textLabels[category];
    let label = '';

    return field.text.map(currentField => {
      if (currentField.label) {
        label = currentField.label;
      } else if (!currentField.hideLabel) {
        const string =
          currentField.name.charAt(0).toUpperCase() + currentField.name.slice(1).toLowerCase();
        label = string;
      }

      let text = item[currentField.name];

      if (text && text.length > 300 && excerpt) {
        text = `${text.substring(0, 300)}...`;
      }

      return (
        <p key={currentField.name}>
          {!currentField.hideLabel && <span className="label">{label}: </span>}
          {text}
        </p>
      );
    });
  }
}

DetailText.propTypes = {
  category: PropTypes.string.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string,
  }).isRequired,
  excerpt: PropTypes.bool.isRequired,
};
