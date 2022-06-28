import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
    state ={ name: '', email: '', isDisabeledButton: true }

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

handlesubmit = (e) => {
  e.preventDefault();
}

render() {
  const { name, email, isDisabeledButton } = this.state;
  return (
    <div>

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

      </main>
    </div>
  );
}
}

export default Login;
