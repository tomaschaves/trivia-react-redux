import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import '../css/Button.css';
import trivia from '../image/trivia.png';
import { actionGetGravatar } from '../redux/actions/actionGetGravatar';
import { resetGame } from '../redux/actions/actionResetGame';

class Login extends Component {
  state = {
    nameUser: '',
    email: '',
    isDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetGame());
  }

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
      <div className="henser">
        <img className="logo-trivia" src={ trivia } alt={ trivia } />
        <form className="login">
          <h1 className="id">Login</h1>
          <div className="input-du">
            <input
              id="nameUser"
              type="text"
              className="input"
              data-testid="input-player-name"
              name="nameUser"
              placeholder="Escreva seu Nome"
              value={ nameUser }
              onChange={ this.handleChange }
            />

            <input
              id="email"
              type="email"
              className="input"
              placeholder="Digite seu E-mail"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <div className="button">
              <button
                type="button"
                data-testid="btn-play"
                className="button-29"
                disabled={ isDisabled }
                onClick={ () => this.onClickButton() }
              >
                Play
              </button>
              <button
                type="button"
                data-testid="btn-settings"
                className="button-29"
                onClick={ () => history.push('/settings') }
              >
                Configurações
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
