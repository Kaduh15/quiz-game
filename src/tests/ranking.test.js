import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Feedback from '../Pages/Feedback';
import App from '../App';
import Ranking from '../Pages/Ranking';

describe('Testando se a paǵina "Ranking"...',() => {
    test('Verifica elementos do header', () => {
      const teste = 
      [
        {
          name:"teste1",
          score:1,
          picture:"https://www.gravatar.com/avatar/da145c19ca6ba81410b5eb7370676382"
        },
        {
          name:"teste2",
          score:2,
          picture:"https://www.gravatar.com/avatar/da145c19ca6ba81410b5eb7370676382"
        },
        {
          name:"teste3",
          score:3,
          picture:"https://www.gravatar.com/avatar/da145c19ca6ba81410b5eb7370676382"
        },
      ];
      localStorage.setItem('ranking', JSON.stringify(teste));

      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/ranking');

      const titleRanking = screen.getByTestId('ranking-title');
      const playerNames = screen.getAllByText(/teste/);
      const score = screen.getByTestId('player-score-0');
      const images = screen.getAllByRole('img');

      expect(titleRanking).toBeInTheDocument();
      expect(playerNames).toHaveLength(3);
      expect(images).toHaveLength(3);
      expect(score).toBeInTheDocument();
    });

    test('Verifica botão inicio', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/ranking');
      const buttonInicio = screen.getByTestId('btn-go-home');
      expect(buttonInicio).toBeInTheDocument();
      userEvent.click(buttonInicio);
      expect(history.location.pathname).toBe('/');
    })
})