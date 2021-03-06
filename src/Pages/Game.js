import React from 'react';
import PropTypes, { any } from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Quest from '../Components/Quest';
import { choseDifficulty } from '../Redux/Actions';
import './Games.css';

const ONE_SECOND_IN_MILLISECONDS = 1000;
const TIME = 30;

const colorTime = (time) => {
  if (time <= Number('10')) return 'text-red-500';
  if (time <= Number('20')) return 'text-yellow-600';
  return '';
};

class Game extends React.Component {
  state = {
    quests: [],
    answerRandom: [],
    questNumber: 0,
    buttonClicked: false,
    time: TIME,
    dificuldades: '',
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
    const { nome, email, score, dispatch, assertions } = this.props;
    const hash = md5(email).toString();
    const rankings = JSON.parse(localStorage?.getItem('ranking'));
    if (!rankings) {
      localStorage.setItem('ranking', JSON.stringify([{ name: nome, score, picture: `https://www.gravatar.com/avatar/${hash}`, assertions }]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...rankings, { name: nome, score, picture: `https://www.gravatar.com/avatar/${hash}`, assertions }]));
    }
    dispatch(choseDifficulty({ dificuldade: 'todos',
      tipo: 5,
      categoria: 'todos' }));
    clearTimeout(this.a);
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
    // const number = 4;
    const { history } = this.props;
    const { quests } = this.state;
    const { questNumber } = this.state;

    if (questNumber !== quests.length - 1) {
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
      difficulty,
    } = quests[questNumber];
    this.cores(difficulty);

    const answers = [correctAnswer, ...incorrectAnswer];
    answers.sort(() => Math.random() - number);
    this.setState({ answerRandom: answers });
  };

  getQuests = async () => {
    const { filtros: { difficulty, tipo, categoria } } = this.props;

    const token = localStorage?.getItem('token');

    let url = 'https://opentdb.com/api.php?';
    if (tipo !== 'todos') {
      url += `amount=${tipo}`;
    }
    if (categoria !== 'todos') {
      url += `&category=${categoria}`;
    }
    if (difficulty !== 'todos') {
      url += `&difficulty=${difficulty}`;
    }

    url += `&token=${token}`;

    const response = await fetch(url);
    const json = await response.json();

    const numberResponse = 3;
    if (json?.response_code === numberResponse || json?.results?.length === 0) {
      const { history } = this.props;
      return history.push('/');
    }
    return json?.results;
  };

  changeDisabledButton = () => {
    this.setState((state) => ({ buttonClicked: !state.stabuttonClicked, time: TIME }));
  };

  cores = (difficulty) => {
    if (difficulty === 'easy') {
      this.setState({ dificuldades: 'easy' });
    }
    if (difficulty === 'medium') {
      this.setState({ dificuldades: 'medium' });
    }
    if (difficulty === 'hard') {
      this.setState({ dificuldades: 'hard' });
    }
  }

  render() {
    const { quests, questNumber, answerRandom,
      buttonClicked, time, dificuldades } = this.state;
    return (
      <>
        <Header />
        <div className="flex flex-col gap-2 m-3">
          <span>Pontua????o:</span>
          <div className="flex gap-3">
            <span
              className={ dificuldades === 'easy'
                ? 'border-b-8 border-green-500' : '' }
            >
              <strong>Easy:</strong>
              50
            </span>
            <span
              className={ dificuldades === 'medium'
                ? 'border-b-8 border-blue-500' : '' }
            >
              <strong>Medium:</strong>
              100
            </span>
            <span
              className={ dificuldades === 'hard'
                ? 'border-b-8 border-red-500' : '' }
            >
              <strong>Hard:</strong>
              150
            </span>
          </div>
          {(
            <p
              className={ ` ${!buttonClicked ? 'visible' : 'invisible'} ${colorTime(time)} m-auto font-bold text-2xl drop-shadow font-mono bg-gray-200 rounded-full w-10 h-10 p-2 flex justify-center items-center` }
            >
              {time}
            </p>)}
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
              className="mx-auto bg-gray-800 text-white w-20 rounded hover:bg-blue-500 hover:text-white transition-color duration-200"
              type="button"
              onClick={ this.handleClick }
              data-testid="btn-next"
            >
              Pr??xima
            </button>
          )}
        </div>

      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  score: player.score,
  email: player.gravatarEmail,
  nome: player.name,
  assertions: player.assertions,
  filtros: player.filtros,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  difficulty: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  filtros: PropTypes.shape({
    tipo: PropTypes.number.isRequired,
    difficulty: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,

};

Game.defaultProps = {
  difficulty: any,
};
export default connect(mapStateToProps)(Game);
