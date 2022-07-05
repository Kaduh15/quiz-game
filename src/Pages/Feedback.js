import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { resetScore } from '../Redux/Actions';

class Feedback extends React.Component {
  // componentDidMount() {

  // }

  handleClick = (path) => {
    const { history, dispatch } = this.props;
    history.push(path);
    dispatch(resetScore());
  }

  render() {
    const { score, assertions } = this.props;
    const NOTA = 3;
    return (
      <>
        <Header />
        <div
          className="flex p-3 text-white min-h-full flex-col justify-center text-2xl gap-4 h-full py-10 bg-gray-500"
        >
          <main className="flex flex-col justify-center items-center">
            <p
              className="font-semibold"
              data-testid="feedback-text"
            >
              {score < NOTA ? 'Could be better...' : 'Well Done!' }
            </p>
            <p data-testid="feedback-total-score">
              Pontos:
              {score}
            </p>
            <p data-testid="feedback-total-question">
              Acertos:
              {assertions}
            </p>
          </main>
          <button
            className="mx-auto w-fit px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-500 hover:text-white transition-color duration-200"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => this.handleClick('/') }
          >
            Play Again
          </button>
          <button
            className="mx-auto w-fit px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-500 hover:text-white transition-color duration-200"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => this.handleClick('/ranking') }
          >
            Ranking
          </button>
        </div>
      </>

    );
  }
}

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
  email: player.gravatarEmail,
  nome: player.name,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,

};
export default connect(mapStateToProps)(Feedback);
