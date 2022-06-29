import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Components/Header';
import Quest from '../Components/Quest';

const ONE_SECOND_IN_MILLISECONDS = 1000;
const TIME = 30;

class Jogo extends React.Component {
  state = {
    quests: [],
    answerRandom: [],
    questNumber: 0,
    buttonClicked: false,
    time: TIME,
  };

  async componentDidMount() {
    this.setState({ quests: await this.getQuests() }, () => this.randomAnswer());
  }

  componentDidUpdate() {
    const { time } = this.state;
    clearTimeout(this.a);
    this.handleTime(time);
  }

  handleTime = (time) => {
    if (time === 0) {
      this.setState({ buttonClicked: true, time: -1 });
    } else if (time > 0 && time <= TIME) {
      const a = setTimeout(() => {
        this.setState({ time: time - 1 });
      }, ONE_SECOND_IN_MILLISECONDS);
      this.a = a;
      console.log(a);
    }
  }

  handleClick = () => {
    const number = 4;
    const { history } = this.props;
    const { questNumber } = this.state;
    if (questNumber !== number) {
      this.setState(
        {
          questNumber: questNumber + 1,
          buttonClicked: false,
          time: TIME,
        },
        () => this.randomAnswer(),
      );
    } else {
      history.push('./feedback');
    }
  };

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
    // console.log(answers);
    this.setState({ answerRandom: answers });
  };

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
  };

  changeDisabledButton = () => {
    this.setState((state) => ({ buttonClicked: !state.stabuttonClicked, time: TIME }));
  };

  render() {
    const { quests, questNumber, answerRandom, buttonClicked, time } = this.state;
    return (
      <>
        <Header />
        <h1>Jogo</h1>
        {quests?.length > 0 && (
          <Quest
            { ...quests[questNumber] }
            answerRandom={ answerRandom }
            buttonClicked={ buttonClicked }
            changeDisabledButton={ this.changeDisabledButton }
          />
        )}
        {buttonClicked && (
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-next"
          >
            Próxima
          </button>
        )}
        {!buttonClicked && <div>{time}</div>}
      </>
    );
  }
}

Jogo.propTypes = {
  history: PropTypes.node.isRequired,
};

export default Jogo;
