import React, { Component } from 'react';

import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { incrementScore } from '../Redux/Actions';
import './Quest.css';

class Quest extends Component {
  checkAnswer = (answer, correctAnswer) => answer === correctAnswer;

  changeClassColor = (answer, correctAnswer) => {
    let color;
    if (answer === correctAnswer) {
      color = 'correct-Answer';
    } else {
      color = 'incorrect-Answer';
    }
    return color;
  }

  render() {
    const {
      category,
      question,
      answerRandom,
      correct_answer: correctAnswer,
      dispatch,
      buttonClicked, changeDisabledButton } = this.props;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {answerRandom.length > 0 && answerRandom.map((answer, index) => (
            <button
              className={ buttonClicked
                ? this.changeClassColor(answer, correctAnswer) : '' }
              key={ index }
              type="button"
              data-testid={ answer === correctAnswer
                ? 'correct-answer' : `wrong-answer-${index}` }
              disabled={ buttonClicked }
              onClick={ () => {
                changeDisabledButton();
                dispatch(incrementScore(this.checkAnswer(answer, correctAnswer)));
              } }
            >
              {answer}
            </button>
          ))}
        </div>
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
  buttonClicked: PropTypes.bool.isRequired,
  changeDisabledButton: PropTypes.func.isRequired,
};

export default connect()(Quest);
