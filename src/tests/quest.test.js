import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Feedback from '../Pages/Feedback';
import App from '../App';
import Ranking from '../Pages/Ranking';
import {mockSucess} from '../tests/helpers/resolvedMocks'
import Quest from '../Components/Quest';



describe('Testando a pagina Game"...',() => {
  const INITIAL_STATE = {
    name: 'test',
    gravatarEmail: 'test@hotmail.com',
    score: 0
  }
  it('Testando o header dentro de Game',() =>{
    renderWithRouterAndRedux(<Quest 
		{ ...mockSucess.results[2] }
            answerRandom={ [...mockSucess.results[2].incorrect_answers,mockSucess.results[2].correct_answer] }
            // buttonClicked={ buttonClicked }
            // changeDisabledButton={ this.changeDisabledButton }
		
		/>, INITIAL_STATE, '/game')
		expect(screen.getByTestId('question-category')).toBeInTheDocument()
		// expect(screen.getByTestId('question-category').text).toBe('Science & Nature')
   expect(screen.getByTestId('question-text')).toBeInTheDocument()
   expect(screen.getByTestId('answer-options')).toBeInTheDocument()
   expect(screen.getByTestId('correct-answer')).toBeInTheDocument()
   expect(screen.getByTestId('wrong-answer-0')).toBeInTheDocument()
   expect(screen.getByTestId('wrong-answer-1')).toBeInTheDocument()
   expect(screen.getByTestId('wrong-answer-2')).toBeInTheDocument()


   //    expect(screen.getByText(/0/i)).toBeInTheDocument()
//    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

//   <Quest
//             { ...quests[questNumber] }
//             answerRandom={ answerRandom }
//             buttonClicked={ buttonClicked }
//             changeDisabledButton={ this.changeDisabledButton }
//           />

//   Quest.propTypes = {
// 	category: PropTypes.string.isRequired,
// 	question: PropTypes.string.isRequired,
// 	correct_answer: PropTypes.string.isRequired,
// 	answerRandom: PropTypes.arrayOf(string).isRequired,
// 	dispatch: PropTypes.func.isRequired,
// 	buttonClicked: PropTypes.bool.isRequired,
// 	changeDisabledButton: PropTypes.func.isRequired,
//   };
})