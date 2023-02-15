import PropTypes from 'prop-types';
import '../css/Header.css';
import '../css/Button.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;

    const link = `https://www.gravatar.com/avatar/${gravatarEmail}`;

    return (
      <header className="App-header">
        <div className="id-hender">
          <img
            src={ link }
            className="header-img"
            alt="img-gravatar"
            data-testid="header-profile-picture"
          />
          <h1
            data-testid="header-player-name"
            className="header-h1-a"
          >
            {' '}
            { name }
          </h1>
        </div>
        <div>
          <p
            className="header-score"
            data-testid="header-score"
          >
            { score }
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ player: { gravatarEmail, name, score } }) => ({
  gravatarEmail,
  name,
  score,
});

export default connect(mapStateToProps)(Header);
