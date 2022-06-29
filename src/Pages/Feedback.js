import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends React.Component {
  handleClick = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const { score, assertions } = this.props;
    const NOTA = 3;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          <h1>Feedback</h1>
          <main>
            <p data-testid="feedback-text">
              {score < NOTA ? 'Could be better...' : 'Well Done!' }

            </p>
            <p data-testid="feedback-total-score">{score}</p>
            <p data-testid="feedback-total-question">{assertions}</p>
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
});

Feedback.propTypes = {

  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(Feedback);
