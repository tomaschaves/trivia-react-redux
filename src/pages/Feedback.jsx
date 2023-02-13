import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import PropTypes from 'prop-types';
// import { actionGetGravatar } from '../redux/actions/actionGetGravatar';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Well Done!</p>
      </div>
    );
  }
}

export default connect()(Feedback);
