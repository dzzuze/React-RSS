import './index.css';
import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';

interface AppState {
  results: Array<{
    name: string;
    description: string;
    image: string;
  }>;
  isLoading: boolean;
  error: string | null;
}

export default class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      results: [],
      isLoading: false,
      error: null,
    };
  }

  fetchCharacters = async (searchTerm?: string) => {
    this.setState({ isLoading: true, error: null });

    let baseURL = 'https://rickandmortyapi.com/api/character';

    if (searchTerm && searchTerm != '') {
      baseURL = `https://rickandmortyapi.com/api/character?name=${searchTerm}`;
    }

    try {
      const response = await fetch(baseURL);
      if (!response.ok) throw new Error('Failed to fetch characters');

      const data = await response.json();

      const formatted = data.results.map(
        (char: { name: string; species: string; image: string }) => ({
          name: char.name,
          description: char.species,
          image: char.image,
        })
      );

      this.setState({ results: formatted, isLoading: false });
    } catch (err) {
      this.setState({ error: (err as Error).message, isLoading: false });
    }
  };

  componentDidMount = () => {
    const localTempApp: string | null = localStorage.getItem('searchTermTemp');

    if (localTempApp && localTempApp.trim() !== '') {
      this.fetchCharacters(localTempApp.trim());
    } else {
      this.fetchCharacters();
    }
  };

  handleSearch = (searchTerm: string) => {
    this.fetchCharacters(searchTerm);
  };

  render() {
    let resultContent;

    if (this.state.isLoading) {
      resultContent = <div>Loading...</div>;
    } else if (this.state.error) {
      resultContent = <div>Error: {this.state.error}</div>;
    } else {
      resultContent = <Results items={this.state.results} />;
    }

    return (
      <div className="max-w-4xl mx-auto p-4">
        <Search onSearch={this.handleSearch} />

        <div>{resultContent}</div>
      </div>
    );
  }
}
