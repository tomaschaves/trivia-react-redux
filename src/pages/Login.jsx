import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetGravatar } from '../redux/actions/actionGetGravatar';

class Login extends Component {
  state = {
    nameUser: '',
    email: '',
    isDisabled: true,
  };

  onClickButton = async () => {
    const { history, dispatch } = this.props;

    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);

    dispatch(actionGetGravatar({ ...this.state }));

    history.push('/game');
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { nameUser, email } = this.state;
      const regexEmail = /\S+@\S+\.\S+/.test(email);
      if (nameUser && email) {
        this.setState({
          isDisabled: !(regexEmail && nameUser),
        });
      }
    });
  };

  render() {
    const { nameUser, email, isDisabled } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label
            htmlFor="nameUser"
          >
            Nome:
            <input
              id="nameUser"
              type="text"
              data-testid="input-player-name"
              name="nameUser"
              value={ nameUser }
              onChange={ this.handleChange }
            />

          </label>

          <label
            htmlFor="email"
          >
            E-mail:
            <input
              id="email"
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />

          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ () => this.onClickButton() }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
