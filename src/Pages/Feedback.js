import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends React.Component {
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
};

export default connect(mapStateToProps)(Feedback);
