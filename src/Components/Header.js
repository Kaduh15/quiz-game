import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  state = { }

  render() {
    const { name, email, score } = this.props;
    const hash = md5(email).toString();
    return (
      <header className="bg-blue-400 px-12 py-4 flex items-center justify-center space-x-5">
        <img
          className="rounded-full drop-shadow-md"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="foto perfil"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score" className="min-w-fit">{`Pontos: ${score}`}</p>
        <p data-testid="header-player-name">{name || 'Usuario' }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
