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
      <div className="bg-gray-800 min-h-screen flex flex-col justify-center gap-4 items-center space-y-0">
        <h1
          className="text-white text-6xl justify-self-start"
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <button
          className="mx-auto w-fit px-3 py-1 bg-white text-gray-800 rounded hover:bg-blue-500 hover:text-white transition-color duration-200"
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Inicio

        </button>
        <div className="flex flex-col gap-4 items-center">
          { ranking.length > 0 && ranking.map((rank, index) => (
            <div
              key={ index + rank.name }
              className="w-fit bg-blue-300 flex gap-2 px-2 py-1 items-center drop-shadow rounded-md"
            >
              <img
                className="rounded-full"
                src={ rank.picture }
                alt={ rank.name }
              />
              <p
                className="truncate w-28"
                data-testid={ `player-name-${index}` }
              >
                {rank.name || 'Usuário'}

              </p>
              <p
                className="truncate w-28"
                data-testid={ `player-score-${index}` }
              >
                Pontos:
                {rank.score}
              </p>
              <p>
                Acertos:
                {rank.assertions}
              </p>
            </div>))}
        </div>
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
