import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([]));
    } else {
      ranking.sort((a, b) => b.score - a.score);
      this.setState({ ranking });
    }
  }

  render() {
    const { ranking } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        { ranking.length > 0 && ranking.map((rank, index) => (
          <div key={ index + rank.name }>
            <p data-testid={ `player-name-${index}` }>{rank.name}</p>
            <p data-testid={ `player-score-${index}` }>
              Pontos:
              {rank.score}
            </p>
            <p>
              Acertos:
              {rank.assertions}
            </p>
            <img src={ rank.picture } alt={ rank.name } />
          </div>))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Inicio

        </button>
      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
