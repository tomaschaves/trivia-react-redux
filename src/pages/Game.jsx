import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import {
  actionShuffle } from '../redux/actions/actionShuffle';
import { correctAnswer,
  incorrectAnswer } from '../redux/actions/actionAnswers';
// import { RequestAPIToken } from '../redux/actions/index';

class Game extends Component {
  state = {
    seconds: 30,
    numberOfQuestion: 0,
    endQuestion: false,
    isLoading: true,
    clicked: false,
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

  handleClick = ({ target }) => {
    clearInterval(this.intervalID);
    this.setState({
      endQuestion: true,
    });

    const { seconds } = this.state;
    const { dispatch } = this.props;

    this.setState({
      clicked: true,
    });

    if (target.dataset.testid === 'correct-answer') {
      dispatch(correctAnswer(seconds));
    }
    if (target.dataset.testid.includes('wrong-answer')) {
      dispatch(incorrectAnswer());
      // this.setState({
      //   clicked: true,
      // });
    }
  };

  disableButtons = () => {
    const { seconds, endQuestion } = this.state;
    if (seconds === 0 || endQuestion) {
      return true;
    }
  };

  nextQuestion = () => {
    const { numberOfQuestion } = this.state;
    const { history } = this.props;
    const maximumNumberOfQuestions = 4;

    if (numberOfQuestion === maximumNumberOfQuestions) {
      history.push('/feedback');
    } else if (numberOfQuestion < maximumNumberOfQuestions) {
      this.setState({
        clicked: false,
        numberOfQuestion: numberOfQuestion + 1,
        endQuestion: false,
      });
    }
  };

  render() {
    const {
      seconds,
      endQuestion,
      isLoading,
      numberOfQuestion,
      clicked,
    } = this.state;

    if (isLoading) return (<p>Loading...</p>);
    console.log(numberOfQuestion);
    return (
      <div>
        <h1>
          Game
        </h1>
        <Header />
        <Questions
          disable={ this.disableButtons() }
          click={ this.handleClick }
          number={ numberOfQuestion }
          colorButton={ clicked }
        />
        <h2>{ seconds }</h2>
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
