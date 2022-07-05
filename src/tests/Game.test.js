import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';
import {mockSucess, mockFail} from '../tests/helpers/resolvedMocks'
import Game from '../Pages/Game';
import Quest from '../Components/Quest'

const quests = mockSucess.results
const {
  correct_answer: correctAnswer,
  incorrect_answers: incorrectAnswer,
} = quests[0];
const answers = [correctAnswer, ...incorrectAnswer]

describe('Testando a pagina Game"...',() => {
  const token = 'f4d4e562d78b0fae2b07a8ae75735ffebdb8d3d9a2c91cfb418db21153aeaa81'
  localStorage.setItem('token', token)
  const INITIAL_STATE = {
    name: 'test',
    gravatarEmail: 'test@hotmail.com',
    score: 0
    //
  }

  it('Testando Componente Game', async () =>{
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSucess)
    })
    renderWithRouterAndRedux(<Game/>, INITIAL_STATE, '/game')
    expect(global.fetch).toHaveBeenCalled()
    expect(global.fetch).toBeCalledWith(`https://opentdb.com/api.php?amount=5&token=${token}`)

    expect(screen.getByText(/30/i))
    await waitFor (() =>{ 
      const btn = screen.getAllByRole('button')
      expect(btn).toHaveLength(2)
  
    } )
    await waitFor (() =>{ 
      const btn1 = screen.getAllByRole('button')[0]
      userEvent.click(btn1)

  const allBtn = screen.getAllByRole('button')
  expect(allBtn).toHaveLength(3)
  
    } )
  
  }, 32000)

  it('Testando o header dentro de Game',() =>{
    renderWithRouterAndRedux(<Game/>, INITIAL_STATE, '/game')
  expect(screen.getByRole('img', {  name: /foto perfil/i})).toBeInTheDocument()
  expect(screen.getByTestId('header-player-name')).toBeInTheDocument()
  expect(screen.getByTestId('header-score')).toBeInTheDocument()
  expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('Testando Componente Game',async () =>{
    renderWithRouterAndRedux(<Game/>, INITIAL_STATE, '/game')
    expect(screen.getByRole('heading', {  name: /jogo/i})).toBeInTheDocument()
    // expect(await screen.findByTestId('btn-next', '', {timeout:5000})).toBeInTheDocument()
	expect(await screen.findByText(/26/, '', {timeout:5000})).toBeInTheDocument()
	expect(screen.queryByTestId('btn-next')).not.toBeInTheDocument()

	// expect(await screen.findByText(/28/, '', {timeout:27000})).not.toBeInTheDocument()
	expect(await screen.findByTestId('btn-next','', {timeout:27000})).toBeInTheDocument()
  }, 38000)


  it('Testando Componente Quest', () => {
    const buttonClicked = true
  const changeDisabledButton = jest.fn().mockReturnValue(true)
  const {history} = renderWithRouterAndRedux(<Quest buttonClicked={buttonClicked} changeDisabledButton={changeDisabledButton }answerRandom={answers} {...quests[0]}/>, INITIAL_STATE, '/game')
  expect(history.location.pathname).toBe('/game')
    expect(screen.getByTestId('question-category')).toBeInTheDocument()
    expect(screen.getByText('History')).toBeInTheDocument()

    expect(screen.getByTestId('question-text')).toBeInTheDocument()  
    expect(screen.getAllByRole('button')).toHaveLength(2)
    const btn = screen.getAllByRole('button')[0]
    const btn2 = screen.getAllByRole('button')[1]
    userEvent.click(btn)
    // changeDisabledButton()
    // expect(changeDisabledButton).toHaveBeenCalled()
    // changeDisabledButton = jest.fn().mockReturnValue(true)
    expect(btn.className).toBe('correct-Answer')
    expect(btn2.className).toBe('incorrect-Answer')    
  })
  it('Testando Componente Quest', async () => {
    const {history} = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

	expect(history.location.pathname).toBe('/game')
  userEvent.click(await screen.findByTestId('correct-answer'));
  userEvent.click(await screen.findByTestId('btn-next'));
  userEvent.click(await screen.findByTestId('correct-answer'));
  expect(await screen.findByTestId(/wrong-answer/i));
  expect(await screen.findByTestId('correct-answer'));
  expect(await screen.findAllByTestId('correct-answer')).toHaveLength(1);
  expect(await screen.findAllByTestId(/wrong-answer/i)).toHaveLength(1);



  userEvent.click(await screen.findByTestId('btn-next'));
  userEvent.click(await screen.findByTestId('correct-answer'));
  userEvent.click(await screen.findByTestId('btn-next'));
  userEvent.click(await screen.findByTestId('correct-answer'));
  userEvent.click(await screen.findByTestId('btn-next'));
  userEvent.click(await screen.findByTestId('correct-answer'));
  userEvent.click(await screen.findByTestId('btn-next'));
  expect( await screen.findByText(/Feedback/i)).toBeInTheDocument()
  expect(history.location.pathname).toBe('/feedback')
})


it('Testando Componente Game', async () =>{
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFail)
    })
    const { history } = renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/game')
    expect(global.fetch).toHaveBeenCalled()
    expect(global.fetch).toBeCalledWith(`https://opentdb.com/api.php?amount=5&token=${token}`)

	expect(history.location.pathname).toBe('/game')

	expect(await screen.findByText(/nome:/i)).toBeInTheDocument()

	expect(history.location.pathname).toBe('/')

//     expect(screen.getByText(/30/i))
//     await waitFor (() =>{ 
//       const btn = screen.getAllByRole('button')
//       expect(btn).toHaveLength(2)

//     } )
//     await waitFor (() =>{ 
//       const btn1 = screen.getAllByRole('button')[0]
//       userEvent.click(btn1)

//    const allBtn = screen.getAllByRole('button')
//    expect(allBtn).toHaveLength(3)

//     } )

})
})
