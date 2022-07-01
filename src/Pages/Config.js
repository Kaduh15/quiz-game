import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { choseDifficulty } from '../Redux/Actions';

class Config extends React.Component {
state={ dificuldade: 'todos',
  category: [],
  categoria: 'todos',
  tipo: 5,

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
  const { dispatch, history } = this.props;
  const { dificuldade, tipo, categoria } = this.state;

  dispatch(choseDifficulty({ dificuldade, tipo, categoria }));

  history.push('/');
}

render() {
  const { category, tipo } = this.state;

  return (
    <div>
      <h1 data-testid="settings-title">
        Config
      </h1>
      <label htmlFor="dificuldade">

        <select onChange={ this.handleChange } id="dificuldade" name="dificuldade">
          <option hidden>Dificuldade</option>

          <option value="easy">easy</option>
          <option value="medium">normal</option>
          <option value="hard">hard</option>
        </select>

      </label>

      <label htmlFor="categoria">

        <select onChange={ this.handleChange } id="categoria" name="categoria">
          <option hidden>Categoria</option>

          {category.lenght !== 0 && category.map((el) => (
            <option value={ el.id } key={ el.id }>{el.name}</option>))}

        </select>

      </label>

      <label htmlFor="tipo">
        <input
          onChange={ this.handleChange }
          value={ tipo }
          id="tipo"
          name="tipo"
          type="number"
          max="50"
        />
      </label>

      <button type="button" onClick={ this.handleButton }>Começar</button>

    </div>

  );
}
}

Config.propTypes = {
  history: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,

};

export default connect()(Config);
