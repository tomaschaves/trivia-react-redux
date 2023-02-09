import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import App from '../App';

describe('Testando a pagina Login', () => {
  test('Verifica se a tela é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />)

    const login = screen.getByRole('heading', {
      name: /login/i
    })
    expect(login).toBeInTheDocument();
  })

  test('Verifica se existe um input para Nome e Email', () => {
    renderWithRouterAndRedux(<App />)

    const inputName = screen.getByRole('textbox', {
      name: /nome:/i
    })
    const inputEmail = screen.getByRole('textbox', {
      name: /e\-mail:/i
    })
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  })

  test('Verifica se existe um botão Play que faz uma requisição na API', async () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const buttonPlay = screen.getByTestId('btn-play')
    expect(buttonPlay).toBeInTheDocument()
    expect(buttonPlay).toHaveAttribute('disabled')

    const inputName = screen.getByRole('textbox', {
      name: /nome:/i
    })
    const inputEmail = screen.getByRole('textbox', {
      name: /e\-mail:/i
    })

    userEvent.type(inputName , 'nomeTeste')
    userEvent.type(inputEmail, 'teste@teste.com')

    expect(buttonPlay).not.toHaveAttribute('disabled')

    userEvent.click(buttonPlay)

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game')
    })

    await waitFor(() => {
      const tokenLS = localStorage.getItem('token')
      expect(tokenLS.length > 0).toBe(true)

    })
  })

  test('Verifica se ao clicar no botao de configuração, a tela é renderizada', async() => {
    const { history } = renderWithRouterAndRedux(<App />)

    const btnSettings = screen.getByText('Configurações')

    userEvent.click(btnSettings)

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/settings')
    })
  })
})
