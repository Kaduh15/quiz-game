import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Feedback from '../Pages/Feedback';
import App from '../App';

describe('Testando se a paǵina "Feedback"...',() => {
    test('Verifica elementos do header', () => {
      renderWithRouterAndRedux(<Feedback />);
      const profilePicture = screen.getByTestId('header-profile-picture');
      const totalScore = screen.getByTestId('feedback-total-score');
      const totalQuestion = screen.getByTestId('feedback-total-question');

      expect(profilePicture).toBeInTheDocument()
      expect(totalScore).toBeInTheDocument()
      expect(totalQuestion).toBeInTheDocument()
    });
    test('Verifica elementos do main', () => {
      renderWithRouterAndRedux(<Feedback />);
      const feedBacktitle = screen.getByRole('heading', { name: /feedback/i });
      const feedbackText = screen.getByTestId('feedback-text');
      const feedbackTotalScore = screen.getByTestId('feedback-total-score');
      const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');

      expect(feedBacktitle).toBeInTheDocument();
      expect(feedbackText).toBeInTheDocument();
      expect(feedbackTotalScore).toBeInTheDocument();
      expect(feedbackTotalQuestion).toBeInTheDocument();
    });

    test('Verifica botão playAgain', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');
      const buttonPlayAgain = screen.getByTestId('btn-play-again');

      expect(buttonPlayAgain).toBeInTheDocument();

      userEvent.click(buttonPlayAgain);
      expect(history.location.pathname).toBe('/');
    });

    test('Verifica botão playAgain', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');
      const buttonRaking = screen.getByTestId('btn-ranking');

      expect(buttonRaking).toBeInTheDocument();

      userEvent.click(buttonRaking);
      expect(history.location.pathname).toBe('/ranking');
    });
})