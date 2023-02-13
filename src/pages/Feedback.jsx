import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, gravatarEmail } = this.props;
    const link = `https://www.gravatar.com/avatar/${gravatarEmail}`;
    const userRanking = {
      name, score, link,
    };

    if (!JSON.parse(localStorage.getItem('userRanking'))) {
      localStorage.setItem(
        'userRanking',
        JSON.stringify(userRanking),
      );
    } else {
      localStorage.setItem(
        'userRanking',
        JSON.stringify(...userRanking, userRanking),
      );
    }
  }

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
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>

      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { assertions, score, gravatarEmail, name } }) => ({
  assertions,
  score,
  gravatarEmail,
  name,
});

export default connect(mapStateToProps)(Feedback);
