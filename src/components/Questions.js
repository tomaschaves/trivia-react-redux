import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  // state = {
  //   indexQuestion: 0,
  // };

  // handleClick = (xablau) => {
  //   console.log(xablau);
  // };

  render() {
    // const { indexQuestion } = this.state;
    const { questions,
      disable,
      click,
      number,
    } = this.props;

    console.log(questions);
    // const {
    //   correct_answer: correctAnswer,
    //   incorrect_answers: incorrectAnswer,
    // } = questions[indexQuestion];

    // eu preciso criar um array com todas as alternativas
    // const arrayAnswers = [...incorrectAnswer, correctAnswer];

    // realização depois da monitoria V
    const answers = [];

    questions.forEach((question, index) => {
      answers.push({
        question: index,
        answer: question.correct_answer,
        // LUANA: retirei o datatestid que estava nas tags abaixo
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

    // FINAL DA REALIZAÇÃO PÓS MONITORIA

    // fazer um objeto com as opções correta e incorretas
    // {
    //   answer: ...incorrectAnswer[1],
    //   data-testid='xablau-${index}'
    //  }
    // correct answer vou transformar nesse array acima, e o incorrect manipular para virar a mesma coisa
    // na renderização dos botões, uso os dados dos objetos para isso
    const MEIO = 0.5;

    // dentro da funca de ordenação(sort) eu vou querer utilizar um math.random-0.5 produza  resultado do sort
    // agora que tenho o array sorteado e unificado, utilizo o map

    return (
      <div>
        <h1 data-testid="question-category">
          {questions[number].category}
        </h1>
        {/* // pega o array de objetos do estado global Questions, atribui o index, acessa a chave question */}
        <p data-testid="question-text">{questions[number].question}</p>
        {/* REALIZAÇÃO PÓS MONITORIA */}
        {/* filtramos as respostas do array de respostas, com base no index da questão */}
        {/* LUANA: div, com o data test id */}
        <div data-testid="answer-options">
          {answers
          // filtra o array de respostas que esta ligado a pergunta do indexQuestion
            .filter((answer) => answer.question === number)
            .sort(() => Math.random() - MEIO)
            .map((answer) => (
              //       answer === questions[indexQuestion].correctAnswer
              //         ? (
              //           <button
              //             key={ index }
              //             data-testid="correct-answer"
              //             onClick={ handleClick }
              //             disabled={ disableButtons }
              //           >
              //             { answer }
              //           </button>
              //         )
              //         : (
              //           <button
              //             key={ index }
              //             data-testid={ `wrong-answer-${index}` }
              //             onClick={ handleClick }
              //             disabled={ disableButtons }
              //           >
              //             {' '}
              //             { answer }
              //             {' '}

              //           </button>
              //         )
              //     ))}
              // </div>

              // answer === questions[indexQuestion].correctAnswer
              //   ? (
              <button
                key={ answer.tag }
                data-testid={ answer.tag }
                // por algum motivo, não está funcionando colocar as funções passadas por props para os botões, seja a de onClick ou a de disabled, conferir isso. se colocamos elas com (), elas funcionam já na renderização, mas não é o que queremos
                onClick={ click }
                disabled={ disable }
              >
                {answer.answer}
              </button>
              // FINAL DA REALIZAÇÃO PÓS MONITORIA
              // )
              // : (
              //   <button
              //     key={ index }
              //     data-testid={ `wrong-answer-${index}` }
              //     onClick={ handleClick }
              //     disabled={ disableButtons }
              //   >
              //     {' '}
              //     { answer }
              //     {' '}

              //   </button>
              // )
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
