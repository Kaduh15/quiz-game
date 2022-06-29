import React from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
    state ={ name: '', email: '', isDisabeledButton: true, loading: false }

handleChange = ({ target: { name, value } }) => {
  // const {name,value} = target;
  this.setState({ [name]: value }, this.validateButton);
}

validateButton = () => {
  const { name, email } = this.state;
  if (name && email) {
    this.setState({ isDisabeledButton: false });
  } else {
    this.setState({ isDisabeledButton: true });
  }
}

fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const json = await response.json();
  return json.token;
}

handlesubmit = async (e) => {
  // const { loading } = this.state;
  // const { history } = this.props;
  e.preventDefault();
  const token = await this.fetchToken();
  this.setState({ loading: false }, () => {
    localStorage.setItem('token', token);
    this.setState({ loading: true });
  });

  // this.setState(() => {
  // console.log(token);
  // localStorage.setItem('token', JSON.stringify(token));

  //   return { loading: true };
  // });
  // console.log(token);
  // history.push('/jogo');
}

render() {
  const { name, email, isDisabeledButton, loading } = this.state;
  return (
    <div className="App">

      <header className="App-header">
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
          <button type="submit" data-testid="btn-play" disabled={ isDisabeledButton }>
            Play
          </button>
        </form>
        {loading && <Redirect to="/jogo" />}

      </main>
    </div>
  );
}
}

Login.propTypes = {
  // history: PropTypes.node.isRequired,
};

export default Login;
