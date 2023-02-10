// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
// import { connect } from 'react-redux';
// import { RequestAPIToken } from '../redux/actions/index';

class Game extends Component {
  state = {
    results: [],
  };

  componentDidMount() {
    this.requestAPITrivia();
  }

  requestAPITrivia = async () => {
    const tokenLocalStorage = localStorage.getItem('token');

    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`);
    const data = await response.json();
    const { results } = data;

    this.setState({
      results,
    });
  };

  render() {
    const { results } = this.state;
    console.log(results);
    return (
      <div>
        <h1>
          Game
        </h1>
        <Header />
        <div>
          { results.map((result) => (
            <div
              key={ result.category }
            >
              <p
                data-testid="question-category"
              >
                {`Categoria: ${result.category}`}

              </p>
              <p
                data-testid="question-text"
              >
                {`Pergunta: ${result.question}`}

              </p>
              <div
                data-testid="answer-options"
              >
                <button />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
