import React from 'react';
import moment from 'moment';
import Logo from '../../assets/logo.png';
import { Form, Container } from './styles';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

export default class Main extends React.Component {
  state = {
    loading: false,
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const repositories = await this.getLocalRepositories();
    this.setState({ loading: false, repositories });
  }

  handleChange = (e) => {
    this.setState({ repositoryInput: e.target.value });
  };

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('@local_repositories')) || [];

  setLocalRepositories = () => {
    const { repositories } = this.state;
    localStorage.setItem('@local_repositories', JSON.stringify(repositories));
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { repositoryInput } = this.state;

    try {
      const { data: repository } = await api.get(`repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();
      this.setState(
        prevState => ({
          repositoryInput: '',
          repositories: [...prevState.repositories, repository],
          repositoryError: false,
        }),
        this.setLocalRepositories,
      );
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleEditRepositoy = async (id) => {
    const { repositories } = this.state;
    const repositorySelected = repositories.find(repository => repository.id === id);
    try {
      const { data } = await api.get(`/repos/${repositorySelected.full_name}`);
      data.lastCommit = moment(data.pushed_at).fromNow();
      this.setState(
        prevState => ({
          ...prevState,
          repositories: prevState.repositories.map(repository => (repository.id === data.id ? data : repository)),
        }),
        this.setLocalRepositories,
      );
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteRepository = async (id) => {
    const { repositories } = this.state;
    const newRepositories = repositories.filter(repository => repository.id !== id);
    this.setState(
      prevState => ({
        ...prevState,
        repositories: newRepositories,
      }),
      this.setLocalRepositories,
    );
  };

  render() {
    const {
      repositoryInput, repositoryError, repositories, loading,
    } = this.state;

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
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}</button>
        </Form>
        <CompareList
          repositories={repositories}
          editRepository={this.handleEditRepositoy}
          deleteRepository={this.handleDeleteRepository}
        />
      </Container>
    );
  }
}
