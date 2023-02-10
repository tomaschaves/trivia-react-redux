// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
// import { connect } from 'react-redux';
// import { RequestAPIToken } from '../redux/actions/index';

class Game extends Component {
  state = {
    results: [],
    seconds: 30,
    // numberOfQuestions: 1,
    endQuestion: false,
  };

  componentDidMount() {
    this.requestAPITrivia();
    const oneSecond = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, oneSecond);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.seconds === 1) {
      this.setState({ endQuestion: true });
      clearInterval(this.intervalID);
    }
  }

  requestAPITrivia = async () => {
    const tokenLocalStorage = localStorage.getItem('token');

    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`);
    const data = await response.json();
    const { results } = data;
    const randomIndex = Math.floor(Math.random() * results.length);
    const randomElement = results[randomIndex];
    console.log(randomElement);
    this.setState({
      results: randomElement,
    });
  };

  disableButtons = () => {
    const { seconds, endQuestion } = this.state;
    if (seconds === 0 || endQuestion) {
      return true;
    }
  };

  handleClick = () => {
    clearInterval(this.intervalID);
    this.setState({
      endQuestion: true,
    });
  };

  nextQuestion = () => {
    console.log('próxima');
  };

  render() {
    const { results, seconds, endQuestion } = this.state;
    // console.log(results);
    // const randomIndex = Math.floor(Math.random() * results.length);
    // const randomElement = results[randomIndex];
    // console.log(randomElement);
    return (
      <div>
        <h1>
          Game
        </h1>
        <Header />
        <div>
          <p
            data-testid="question-category"
          >
            {`Categoria: ${results.category}`}

          </p>

          <p
            data-testid="question-text"
          >
            {`Pergunta: ${results.question}`}

          </p>
          <div
            data-testid="answer-options"
          />
        </div>
        <h2>{ seconds }</h2>
        <button
          data-testid="correct-answer"
          disabled={ this.disableButtons() }
          onClick={ this.handleClick }
        >
          A
        </button>
        <button
          data-testid="wrong-answer"
          disabled={ this.disableButtons() }
          onClick={ this.handleClick }
        >
          B
        </button>
        <button
          data-testid="wrong-answer"
          disabled={ this.disableButtons() }
          onClick={ this.handleClick }
        >
          C
        </button>
        <button
          data-testid="wrong-answer"
          disabled={ this.disableButtons() }
          onClick={ this.handleClick }
        >
          D
        </button>
        {
          endQuestion
          && <button data-testid="btn-next" onClick={ this.nextQuestion }>Next</button>
        }
      </div>
    );
  }
}

export default Game;
