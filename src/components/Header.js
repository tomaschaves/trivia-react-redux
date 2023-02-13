import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;

    const link = `https://www.gravatar.com/avatar/${gravatarEmail}`;

    return (
      <header>
        <img
          src={ link }
          alt="img-gravatar"
          data-testid="header-profile-picture"
        />
        <h1
          data-testid="header-player-name"
        >
          {' '}
          { name }
        </h1>
        <p
          data-testid="header-score"
        >
          {/* Placar: */}
          { score }
        </p>
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
