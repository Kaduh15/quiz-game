import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../trivia.png';
import '../App.css';
import { addNameEmail } from '../Redux/Actions';

class Login extends React.Component {
  state = { name: '', email: '', isDisabeledButton: true };

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

    history.push('/jogo');
    dispatch(addNameEmail({ ...this.state }));
  };

  render() {
    const { history } = this.props;
    const { name, email, isDisabeledButton } = this.state;
    return (
      <div className="App-header">
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <main>
          <form onSubmit={ this.handlesubmit }>
            <input
              name="name"
              value={ name }
              onChange={ this.handleChange }
              type="text"
              data-testid="input-player-name"
            />
            <input
              value={ email }
              onChange={ this.handleChange }
              name="email"
              type="email"
              data-testid="input-gravatar-email"
            />
            <button
              type="submit"
              data-testid="btn-play"
              disabled={ isDisabeledButton }
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/config') }
            >
              Configuração
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
