import React, { Component } from 'react';

import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { incrementScore } from '../Redux/Actions';

class Quest extends Component {
  // state = {
  //   time: 30,
  // }

  // componentDidUpdate() {
  //   const { time } = this.state;
  //   if (time === 0) {
  //     this.setState({ time: 30 });
  //   } else {
  //     setTimeout(() => {
  //       this.setState({ time: time - 1 });
  //     }, 1000);
  //   }
  // }

  checkAnswer = (answer, correctAnswer) => answer === correctAnswer;

  render() {
    const {
      category,
      question,
      answerRandom,
      correct_answer: correctAnswer,
      dispatch } = this.props;
    // const { time } = this.state;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {answerRandom.length > 0 && answerRandom.map((answer, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ answer === correctAnswer
                ? 'correct-answer' : `wrong-answer-${index}` }
              onClick={ () => {
                dispatch(incrementScore(this.checkAnswer(answer, correctAnswer)));
              } }
            >
              {answer}
            </button>
          ))}
        </div>
        {/* {time} */}
      </div>
    );
  }
}

Quest.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correct_answer: PropTypes.string.isRequired,
  answerRandom: PropTypes.arrayOf(string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Quest);
