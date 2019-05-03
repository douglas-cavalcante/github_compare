import React from 'react';
import Logo from '../../assets/logo.png';
import { Form, Container } from './styles';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

export default class Main extends React.Component {
  state = {
    repositoryInput: '',
    repositories: [],
  };

  handleChange = (e) => {
    this.setState({ repositoryInput: e.target.value });
  };

  handleAddRepository = async (e) => {
    const { repositoryInput } = this.state;
    e.preventDefault();
    try {
      const response = await api.get(`repos/${repositoryInput}`);
      this.setState({
        repositoryInput: '',
        repositories: [...this.state.repositories, response.data],
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { repositoryInput, repositories } = this.state;
    return (
      <Container>
        <img src={Logo} alt="Git Compare" />
        <Form onSubmit={this.handleAddRepository}>
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
