import React, { Component } from 'react';

import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { incrementScore } from '../Redux/Actions';
import './Quest.css';

class Quest extends Component {
  checkAnswer = (answer, correctAnswer) => {
    const { difficulty } = this.props;
    if (answer === correctAnswer) {
      if (difficulty === 'hard') {
        return { score: 150, assertions: true };
      }
      if (difficulty === 'medium') {
        return { score: 100, assertions: true };
      }
      if (difficulty === 'easy') {
        return { score: 50, assertions: true };
      }
    } else {
      return { score: 0, assertions: false };
    }
  };

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
      buttonClicked, changeDisabledButton, difficulty } = this.props;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-difficulty">{difficulty}</p>
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
  difficulty: PropTypes.string.isRequired,
};

export default connect()(Quest);
