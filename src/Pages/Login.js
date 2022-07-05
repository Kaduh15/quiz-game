import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../trivia.png';
import { addNameEmail } from '../Redux/Actions';
import Config from './Config';

class Login extends React.Component {
  state = { name: '', email: '', isDisabeledButton: true, showConfig: false };

  handleChange = ({ target: { name, value } }) => {
    // const {name,value} = target;
    this.setState({ [name]: value }, this.validateButton);
  };

  validateButton = () => {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({ isDisabeledButton: false });
    } else {
      this.setState({ isDisabeledButton: true });
    }
  };

  fetchToken = async () => {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const json = await response.json();
    return json.token;
  };

  handlesubmit = async (e) => {
    const { history, dispatch } = this.props;
    e.preventDefault();
    const token = await this.fetchToken();
    localStorage.setItem('token', token);

    history.push('/game');
    dispatch(addNameEmail({ ...this.state }));
  };

  render() {
    const { name, email, isDisabeledButton, showConfig } = this.state;
    return (
      <div className="gap-9 dark:bg-gray-800 flex flex-col justify-center items-center w-full min-h-screen">
        <header className="flex flex-col items-center justify-center gap-4 text-white">
          <img src={ logo } className="w-72" alt="logo" />
          <p className="text-2xl font-bold">SUA VEZ</p>
        </header>
        <main className="flex flex-col">
          { showConfig ? <Config /> : (
            <form
              onSubmit={ this.handlesubmit }
              className="flex flex-col justify-center space-y-10 p-8 rounded-md bg-gray-600 h-64 "
            >
              <label className="flex gap-4 text-white" htmlFor="name">
                Nome:
                <input
                  className="rounded w-48 h-6 "
                  name="name"
                  id="name"
                  value={ name }
                  onChange={ this.handleChange }
                  type="text"
                  data-testid="input-player-name"
                />
              </label>
              <label
                htmlFor="email"
                className="flex gap-4 space-x-4 text-white "
              >
                Email:
                <input
                  className="rounded w-48 h-6"
                  id="email"
                  value={ email }
                  onChange={ this.handleChange }
                  name="email"
                  type="email"
                  data-testid="input-gravatar-email"
                />
              </label>
              <button
                className="bg-white text-gray-800 w-20 rounded hover:bg-blue-500 hover:text-white transition-color duration-200 self-center"
                type="submit"
                data-testid="btn-play"
                disabled={ isDisabeledButton }
              >
                Play
              </button>
            </form>
          )}
          <button
            className="self-end text-white"
            type="button"
            data-testid="btn-settings"
            onClick={ () => {
              this.setState({ showConfig: !showConfig });
            } }
          >
            { showConfig ? 'login' : 'Configurações'}
          </button>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
