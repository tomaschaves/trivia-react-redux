import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  render() {
    const { questions, disable, click, number } = this.props;

    console.log(questions);

    // realização depois da monitoria V
    const answers = [];

    questions.forEach((question, index) => {
      answers.push({
        question: index,
        answer: question.correct_answer,
        tag: 'correct-answer',
      });
      question.incorrect_answers.forEach((wronganswer, indexIncorrect) => {
        answers.push({
          question: index,
          answer: wronganswer,
          tag: `wrong-answer-${indexIncorrect}`,
        });
      });
    });
    console.log(answers);
    // acima, temos um array de objetos que possui todas as respostas para todas as questões

    // na renderização dos botões, uso os dados dos objetos do array para isso
    const MEIO = 0.5;

    return (
      <div>
        <h1 data-testid="question-category">{questions[number].category}</h1>
        {/* // pega o array de objetos do estado global Questions, atribui o index, acessa a chave question */}
        <p data-testid="question-text">{questions[number].question}</p>
        {/* filtramos as respostas do array de respostas, com base no index da questão */}
        <div data-testid="answer-options">
          {answers
            // filtra o array de respostas que esta ligado a pergunta do indexQuestion
            // dentro da funca de ordenação(sort) eu vou querer utilizar um math.random-0.5
            // agora que tenho o array sorteado e unificado, utilizo o map
            .filter((answer) => answer.question === number)
            .sort(() => Math.random() - MEIO)
            .map((answer) => (
              <button
                key={ answer.tag }
                data-testid={ answer.tag }
                onClick={ click }
                disabled={ disable }
              >
                {answer.answer}
              </button>
            ))}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.array,
}.isRequired;

const mapStateToProps = ({ player: { questions } }) => ({
  questions,
});

export default connect(mapStateToProps)(Questions);
