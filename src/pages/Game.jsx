import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { actionShuffle } from '../redux/actions/actionShuffle';
// import { RequestAPIToken } from '../redux/actions/index';

class Game extends Component {
  state = {
    seconds: 30,
    // numberOfQuestions: 1,
    endQuestion: false,
    isLoading: true,
  };

  componentDidMount() {
    this.requestAPITrivia();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.seconds === 1) {
      this.setState({ endQuestion: true });
      clearInterval(this.intervalID);
    }
  }

  requestAPITrivia = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      const { history, dispatch } = this.props;
      // pega o token do LS
      const tokenLocalStorage = localStorage.getItem('token');
      // Faz o fetch na API e pega as perguntas e respostas
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`);
      const data = await response.json();
      const { results } = data;
      if (!results.length) {
        localStorage.removeItem('token');
        history.push('/');
      } else {
        dispatch(actionShuffle(results));
        this.setState({
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
    // TIMER
    const oneSecond = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, oneSecond);
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
    const { seconds, endQuestion, isLoading } = this.state;
    if (isLoading) return (<p>Loading...</p>);
    return (
      <div>
        <h1>
          Game
        </h1>
        <Header />
        <Questions
          disable={ this.disableButtons() }
          click={ this.handleClick }
        />
        {/* <div>
          <div
            data-testid="answer-options"
          />
        </div> */}
        <h2>{ seconds }</h2>
        {/* <button
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
        </button> */}
        {
          endQuestion
          && <button data-testid="btn-next" onClick={ this.nextQuestion }>Next</button>
        }
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Game);
