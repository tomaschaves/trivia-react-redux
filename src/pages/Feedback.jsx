import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const minimum3 = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions < minimum3 ? 'Could be better...' : 'Well Done!'}
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { assertions } }) => ({
  assertions,
});

export default connect(mapStateToProps)(Feedback);
