import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { gravatarEmail, name } = this.props;

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
          Placar:0
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ gameReducer: { gravatarEmail, name } }) => ({
  gravatarEmail,
  name,
});

export default connect(mapStateToProps)(Header);
