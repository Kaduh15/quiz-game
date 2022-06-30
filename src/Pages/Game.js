import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Quest from '../Components/Quest';

const ONE_SECOND_IN_MILLISECONDS = 1000;
const TIME = 30;

class Game extends React.Component {
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

  componentWillUnmount() {
    const { nome, email, score } = this.props;
    const hash = md5(email).toString();
    const rankings = JSON.parse(localStorage?.getItem('ranking'));
    if (!rankings) {
      localStorage.setItem('ranking', JSON.stringify([{ name: nome, score, picture: `https://www.gravatar.com/avatar/${hash}` }]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...rankings, { name: nome, score, picture: `https://www.gravatar.com/avatar/${hash}` }]));
    }
  }

  handleTime = (time) => {
    if (time === 0) {
      this.setState({ buttonClicked: true, time: -1 });
    } else if (time > 0 && time <= TIME) {
      const a = setTimeout(() => {
        this.setState({ time: time - 1 });
      }, ONE_SECOND_IN_MILLISECONDS);
      this.a = a;
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
    const number = 0.5;

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = quests[questNumber];

    const answers = [correctAnswer, ...incorrectAnswer];
    answers.sort(() => Math.random() - number);
    this.setState({ answerRandom: answers });
  };

  getQuests = async () => {
    const token = localStorage?.getItem('token');
    const url = (toke) => `https://opentdb.com/api.php?amount=5&token=${toke}`;
    const response = await fetch(url(token));
    const json = await response.json();
    console.log(json);
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

const mapStateToProps = ({ player }) => ({
  score: player.score,
  email: player.gravatarEmail,
  nome: player.name,
});

Game.propTypes = {
  history: PropTypes.node.isRequired,
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
