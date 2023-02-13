import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
    const minimum3 = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions < minimum3 ? 'Could be better...' : 'Well Done!'}
        </p>
        <p
          data-testid="feedback-total-question"
        >
          { assertions }
        </p>
        <p
          data-testid="feedback-total-score"
        >
          { score }
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>

      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

export default connect(mapStateToProps)(Feedback);
