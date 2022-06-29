import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Components/Header';
import Quest from '../Components/Quest';

class Jogo extends React.Component {
  state = {
    quests: [],
    answerRandom: [],
    questNumber: 0,
  }

  async componentDidMount() {
    this.setState({ quests: await this.getQuests() }, () => this.randomAnswer());
  }

  handleClick = () => {
    const number = 5;
    const { questNumber } = this.state;
    this.setState({ questNumber: questNumber === number
      ? 0 : questNumber + 1 }, () => this.randomAnswer());
  }

  randomAnswer = () => {
    const { quests, questNumber } = this.state;
    if (!quests) return;
    // console.log(quests[questNumber]);
    const number = 0.5;

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = quests[questNumber];

    const answers = [correctAnswer, ...incorrectAnswer];
    answers.sort(() => Math.random() - number);
    console.log(answers);
    this.setState({ answerRandom: answers });
  }

  getQuests = async () => {
    const token = localStorage?.getItem('token');
    const url = (toke) => `https://opentdb.com/api.php?amount=5&token=${toke}`;
    const response = await fetch(url(token));
    const json = await response.json();
    const numberResponse = 3;
    if (json?.response_code === numberResponse) {
      const { history } = this.props;
      return history.push('/');
    }
    return json?.results;
  }

  render() {
    const { quests, questNumber, answerRandom } = this.state;
    return (
      <>
        <Header />
        <h1>Jogo</h1>
        {quests?.length > 0 && (
          <Quest { ...quests[questNumber] } answerRandom={ answerRandom } />
        )}
        <button type="button" onClick={ this.handleClick }>Próxima</button>
        {console.log(quests)}
      </>
    );
  }
}

Jogo.propTypes = {
  history: PropTypes.node.isRequired,
};

export default Jogo;
