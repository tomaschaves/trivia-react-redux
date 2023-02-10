import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  state = {
    indexQuestion: 0,
  };

  render() {
    const { indexQuestion } = this.state;
    const { questions, disableButtons, handleClick } = this.props;
    console.log(questions);
    const { correct_answer, incorrect_answers } = questions[indexQuestion];

    // eu preciso criar um array com todas as alternativas
    const arrayAnswers = [...incorrect_answers, correct_answer];
    console.log(arrayAnswers);

    const MEIO = 0.5;

    // dentro da funca de ordenação(sort) eu vou querer utilizar um math.random-0.5 produza  resultado do sort

    // agora que tenho o array sorteado e unificado, utilizo o map
    return (
      <div>
        <h1
          data-testid="question-category"
        >
          { questions[indexQuestion].category }
        </h1>
        {/* // pega o array de objetos do estado global Questions, atribui o index, acessa a chave question */}
        <p
          data-testid="question-text"
        >
          { questions[indexQuestion].question }
        </p>
        { arrayAnswers.sort(() => Math.random() - MEIO)
          .map((answer, index = 0) => (
            answer === questions[indexQuestion].correct_answer
              ? <button
                  key={ index }
                  data-testid="correct-answer"
                  onClick={ handleClick }
                  disabled={ disableButtons }
              >
                { answer }
              </button>
              : <button
                  key={ index }
                  data-testid={ `wrong-answer-${indexQuestion}` }
                  onClick={ handleClick }
                  disabled={ disableButtons }
              >
                {' '}
                { answer }
                {' '}

                </button>
          ))}
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.array,
}.isRequired;

const mapStateToProps = ({ gameReducer: { questions } }) => ({
  questions,
});

export default connect(mapStateToProps)(Questions);
