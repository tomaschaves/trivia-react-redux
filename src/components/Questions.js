import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  state = {
    indexQuestion: 0,
  };

  handleClick = (xablau) => {
    console.log(xablau);
  };

  render() {
    const { indexQuestion } = this.state;
    const { questions, disable, onClick } = this.props;
    // console.log(disable);
    // console.log(questions);
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = questions[indexQuestion];

    // eu preciso criar um array com todas as alternativas
    const arrayAnswers = [...incorrectAnswer, correctAnswer];
    // console.log(arrayAnswers);

    // realização depois da monitoria V
    const answers = [];

    questions.forEach((question, index) => {
      // console.log(question.category);
      answers.push({
        question: index,
        answer: question.correct_answer,
        tag: 'data-testid=correct-answer',
      });
      question.incorrect_answers.forEach((wronganswer, indexIncorrect) => {
        answers.push({
          question: index,
          answer: wronganswer,
          tag: `data-testid=wrong-answer-${indexIncorrect}`,
        });
      });
    });

    // FINAL DA REALIZAÇÃO PÓS MONITORIA
    // console.log(answers);

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
        {/* REALIZAÇÃO PÓS MONITORIA */}
        { answers.filter((answer) => (
          answer.question === indexQuestion
        ))
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
              // onClick={  }
              // disabled={ disable }
              // disabled="true"
            >
              { answer.answer }
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
