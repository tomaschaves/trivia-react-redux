import React, { Component } from 'react';

class Login extends Component {
  state = {
    nameUser: '',
    email: '',
    isDisabled: true,
  };

  onClickButton = () => {
    console.log('botão funcionando');
  };

  handleChange = ({ target: { name, value } }) => {
    console.log('digitei');

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
        </form>
      </div>
    );
  }
}

export default Login;
