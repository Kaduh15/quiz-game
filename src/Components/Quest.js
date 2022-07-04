import React, { Component } from 'react';

import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { incrementScore } from '../Redux/Actions';
import './Quest.css';

const convertTextToHTML = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild.textContent;
};

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
    const color = (answer === correctAnswer)
      ? 'border-b-2 border-green-500 rounded-md' : 'border-b-2 border-red-500 rounded-md';
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
      <div
        className="flex flex-col items-center bg-gray-200 p-6 gap-4 rounded-md"
      >
        <p
          className="font-semibold"
          data-testid="question-category"
        >
          {category}

        </p>
        <p data-testid="question-text">{convertTextToHTML(question)}</p>
        <div data-testid="answer-options" className="flex gap-6">
          {answerRandom.length > 0 && answerRandom.map((answer, index) => (
            <button
              className={ `${buttonClicked
                ? this.changeClassColor(answer, correctAnswer)
                : ''}
                bg-slate-600 text-white px-4 py-1 rounded-md drop-shadow
                font-mono hover:bg-blue-400` }
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
              {convertTextToHTML(answer)}
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
