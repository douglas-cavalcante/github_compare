import React from 'react';
import moment from 'moment';
import Logo from '../../assets/logo.png';
import { Form, Container } from './styles';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

export default class Main extends React.Component {
  state = {
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  };

  handleChange = (e) => {
    this.setState({ repositoryInput: e.target.value });
  };

  handleAddRepository = async (e) => {
    const { repositoryInput } = this.state;
    e.preventDefault();
    try {
      const { data: repository } = await api.get(`repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState(prevState => ({
        repositoryInput: '',
        repositories: [...prevState.repositories, repository],
        repositoryError: false,
      }));
    } catch (error) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const { repositoryInput, repositoryError, repositories } = this.state;
    return (
      <Container>
        <img src={Logo} alt="Git Compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            value={repositoryInput}
            onChange={this.handleChange}
            placeholder="usuário/repositório"
          />
          <button type="submit">Ok</button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
