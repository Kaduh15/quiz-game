import React, { useReducer } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
describe('Testando se a paǵina "Login"...',() => {
    test('Contém os inputs para "Nome" e "Email', () => {
        renderWithRouterAndRedux(<App />);
        const nameInput = screen.getByRole('textbox', { name:/nome:/i })
        const emailInput = screen.getByRole('textbox', { name:/email:/i })
        const playButton = screen.getByRole('button', { name:/play/i })
        const settingsButton = screen.getByRole('button', { name:/configurações/i })
        expect(nameInput).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(playButton).toBeInTheDocument()
        expect(settingsButton).toBeInTheDocument()
    });
    test('Muda de rota ao clicar em "Configurações"', () => {
        const {history} = renderWithRouterAndRedux(<App />);
        const settingsButton = screen.getByRole('button', { name:/configurações/i })
        userEvent.click(settingsButton)
        expect(screen.getByRole('heading', { name:/config/i })).toBeInTheDocument()
    })
    test('Verifica os inputs e troca de página ao clicar em "Play"', async () => {
        const response = {"response_code":0,"response_message":"Token Generated Successfully!","token":"f551ff46a84dd26576d2c0bd0686b7ee113f73b45b749bebaddef59ececeb59a"}
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(response),
        });
        const {history} = renderWithRouterAndRedux(<App />);
        const nameInput = screen.getByRole('textbox', { name:/nome:/i })
        const emailInput = screen.getByRole('textbox', { name:/email:/i })
        const playButton = screen.getByRole('button', { name:/play/i })
        expect(playButton).toBeDisabled();
        userEvent.type(nameInput, 'grupo13')
        userEvent.type(emailInput, 'grupo13@hotmail.com')
        expect(playButton).not.toBeDisabled();
        userEvent.click(playButton)
        expect(global.fetch).toBeCalledTimes(1)
        await waitForElementToBeRemoved(
            () => screen.getByRole('button', { name:/play/i }),
            { timeout: 3000 },
        )
        expect(history.location.pathname).toBe('/game')
    })
    test('Exibe o logo na tela', () => {
        const {history} = renderWithRouterAndRedux(<App />);
        const logoImg = screen.getByRole('banner')
        expect(logoImg).toBeInTheDocument();
    })
})