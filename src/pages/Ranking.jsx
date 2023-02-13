import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const existingRanking = JSON.parse(localStorage.getItem('userRanking'));
    const { history } = this.props;

    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking

        </h1>
        <ul>
          {
            existingRanking
              .sort((a, b) => b.score - a.score)
              .map((person, index = 0) => (
                <div key={ index }>
                  <li>
                    <img
                      src={ person.link }
                      alt="img-gravatar"
                    />
                  </li>
                  <li data-testid={ `player-name-${index}` }>
                    { person.name }
                  </li>
                  <li data-testid={ `player-score-${index}` }>
                    { person.score }
                  </li>
                </div>
              ))
          }
        </ul>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Login
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ player: { gravatarEmail, name, score } }) => ({
  gravatarEmail,
  name,
  score,
});

export default connect(mapStateToProps)(Ranking);
