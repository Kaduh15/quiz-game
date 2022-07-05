import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { choseDifficulty } from '../Redux/Actions';

class Config extends React.Component {
state={ dificuldade: 'todos',
  category: [],
  categoria: 'todos',
  tipo: 5,
  save: false,

}

componentDidMount() {
  this.getCategory();
}

getCategory = async () => {
  const url = 'https://opentdb.com/api_category.php';
  const response = await fetch(url);
  const json = await response.json();
  const category = json.trivia_categories;
  this.setState({ category });
}

handleChange = ({ target }) => {
  const MAXNUMBER = 50;
  const { name, value } = target;
  if (name === 'tipo' && value > MAXNUMBER) {
    this.setState({ tipo: MAXNUMBER });
  } else {
    this.setState({ [name]: value });
  }
}

handleButton =() => {
  const { dispatch } = this.props;
  const { dificuldade, tipo, categoria } = this.state;

  dispatch(choseDifficulty({ dificuldade, tipo, categoria }));

  // history.push('/');
  this.setState({ save: true });
  setTimeout(() => this.setState({ save: false }), Number('1000'));
}

render() {
  const { category, tipo, save } = this.state;

  if (category.lenght === 0) return (<div />);

  return (
    <div className="bg-gray-800">
      <h1 className="text-white text-6xl" data-testid="settings-title">
        Config
      </h1>
      <div className="flex rounded bg-gray-500 p-8 gap-4">
        <label htmlFor="dificuldade">
          <select onChange={ this.handleChange } id="dificuldade" name="dificuldade">
            <option hidden>Dificuldade</option>
            <option value="easy">easy</option>
            <option value="medium">normal</option>
            <option value="hard">hard</option>
          </select>
        </label>
        <label htmlFor="categoria">
          <select
            className="w-32"
            onChange={ this.handleChange }
            id="categoria"
            name="categoria"
          >
            <option hidden>Categoria</option>
            {category.lenght !== 0 && category.map((el) => (
              <option value={ el.id } key={ el.id }>{el.name}</option>))}
          </select>
        </label>
        <label htmlFor="tipo">
          <input
            className="w-12 items-center"
            onChange={ this.handleChange }
            value={ tipo }
            id="tipo"
            name="tipo"
            type="number"
            max="50"
          />
        </label>
        <button
          className="bg-white text-gray-800 w-20 rounded hover:bg-blue-500 hover:text-white transition-color duration-200"
          type="button"
          onClick={ this.handleButton }
        >
          Salvar
        </button>
      </div>
      {save
      && (<div className="p-2 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 absolute top-10 right-10" role="alert">
        {' '}
        <span className="font-medium">Salvo com sucesso</span>

          </div>
      )}
    </div>

  );
}
}

Config.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Config);
