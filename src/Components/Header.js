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
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="foto perfil"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        Header
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
