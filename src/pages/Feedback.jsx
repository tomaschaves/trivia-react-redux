import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Feedback.css';
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
        JSON.stringify([userRanking]),
      );
    } else {
      const existingRanking = JSON.parse(localStorage.getItem('userRanking'));
      const newRanking = [...existingRanking, userRanking];
      localStorage.setItem('userRanking', JSON.stringify(newRanking));
    }
  }

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { assertions, score, history } = this.props;
    const minimum3 = 3;
    return (
      <div className="feedback">
        <div className="feedback-is">
          <Header />
          <div className="feed">
            <p data-testid="feedback-text">
              { assertions < minimum3 ? 'Could be better...' : 'Well Done!'}
            </p>
            <p
              className="rende"
              data-testid="feedback-total-question"
            >
              { assertions }
            </p>
            <p
              data-testid="feedback-total-score"
            >
              { score }
            </p>
          </div>
          <button
            type="button"
            className="button-17"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Play Again
          </button>
          <button
            type="button"
            className="button-17"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>

        </div>
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
