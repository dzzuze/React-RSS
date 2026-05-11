import { Component } from 'react';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    const localTemp: string | null = localStorage.getItem('searchTermTemp');

    let examLocalTemp: string;

    if (localTemp) {
      examLocalTemp = localTemp;
    } else {
      examLocalTemp = '';
    }

    this.state = {
      searchTerm: examLocalTemp,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.searchTerm.trim();
    const localTemp: string | null = localStorage.getItem('searchTermTemp');

    if (trimmed === localTemp) {
      return;
    } else {
      localStorage.setItem('searchTermTemp', this.state.searchTerm.trim());
      this.props.onSearch(trimmed);
    }
  };

  render() {
    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow-sm mb-4 flex gap-5">
        <input
          onChange={this.handleInputChange}
          value={this.state.searchTerm}
          className="border border-green-500 rounded px-3 py-2 flex-grow outline-none focus:ring-1 focus:ring-green-600"
        />
        <button
          onClick={this.handleSearch}
          className="bg-green-500 text-[#0000000] px-4 py-2 rounded hover:bg-yellow-400"
        >
          Search
        </button>
      </div>
    );
  }
}
