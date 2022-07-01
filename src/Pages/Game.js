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
    console.log(url);
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
    if (json?.response_code === numberResponse || json.results.length === 0) {
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
        <h1>Jogo</h1>
        <span>Pontuação:</span>
        <span className={ dificuldades === 'easy' ? 'easy' : '' }>
          {' '}
          <strong>Easy:</strong>
          {' '}
          50
        </span>
        {' '}
        <span className={ dificuldades === 'medium' ? 'medium' : '' }>
          {' '}
          <strong>Medium:</strong>
          {' '}
          100
        </span>
        {' '}
        <span className={ dificuldades === 'hard' ? 'hard' : '' }>
          {' '}
          <strong>Hard:</strong>
          {' '}
          150
        </span>
        {' '}
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
