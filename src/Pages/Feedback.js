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
        <div>
          <h1>Feedback</h1>
          <main>
            <p data-testid="feedback-text">
              {score < NOTA ? 'Could be better...' : 'Well Done!' }

            </p>
            <p data-testid="feedback-total-score">
              Pontos:
              {' '}
              {score}
            </p>
            <p data-testid="feedback-total-question">
              Acertos:
              {' '}
              {assertions}
            </p>
          </main>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => this.handleClick('/') }
          >
            Play Again

          </button>
          <button
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
