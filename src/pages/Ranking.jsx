import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history, gravatarEmail, name, score } = this.props;

    const link = `https://www.gravatar.com/avatar/${gravatarEmail}`;

    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking

        </h1>
        <ul>
          <li>
            <img
              src={ link }
              alt="img-gravatar"
            />
          </li>
          <li>
            { name }
          </li>
          <li>
            { score }
          </li>
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
