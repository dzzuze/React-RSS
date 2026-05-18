import './index.css';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';
import { Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import NotFound from './components/NotFound';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

const Bomb = (): never => {
  throw new Error();
};

export default function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldThrow, setShouldThrow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get('page') || '1');

  const fetchCharacters = useCallback(
    async (searchTerm?: string, page?: number) => {
      const effectivePage = page ?? 1;

      let baseURL = 'https://rickandmortyapi.com/api/character';

      if (searchTerm && searchTerm != '') {
        baseURL = `https://rickandmortyapi.com/api/character?name=${searchTerm}&page=${effectivePage}`;
      } else {
        baseURL = `https://rickandmortyapi.com/api/character?page=${effectivePage}`;
      }

      try {
        setIsLoading(true);
        setError(null);

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

        setResults(formatted);
        setTotalPages(data.info.pages);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const localTempApp: string | null = localStorage.getItem('searchTermTemp');
    const searchTerm = localTempApp?.trim() || undefined;

    const triggerFetch = async () => {
      fetchCharacters(searchTerm, currentPage);
    };

    triggerFetch();
  }, [currentPage, fetchCharacters]);

  const handleSearch = (searchTerm: string) => {
    fetchCharacters(searchTerm, 1);
    setSearchParams({ page: '1' });
  };

  const handleErrorClick = () => {
    setShouldThrow(true);
  };

  let resultContent;

  if (isLoading) {
    resultContent = <div>Loading...</div>;
  } else if (error) {
    resultContent = <div>Error: {error}</div>;
  } else {
    resultContent = <Results items={results} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col gap-4">
            <Link
              to="/about"
              className="px-5 py-2.5 bg-gray-100 hover:bg-green-300 duration-300 text-gray-800 font-medium text-sm rounded-lg shadow-sm transition-all active:scale-95 inline-flex items-center justify-center w-max"
            >
              About
            </Link>
            <Search onSearch={handleSearch} />

            <ErrorBoundary
              fallback={
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-sm animate-fade-in">
                  <div className="flex-1">
                    <p className="text-xs text-red-600/90 mt-0.5">
                      Error button clicked
                    </p>
                  </div>
                </div>
              }
            >
              {shouldThrow && <Bomb />}

              <div>{resultContent}</div>
            </ErrorBoundary>

            {!isLoading && !error && results.length > 0 && (
              <div className="flex items-center justify-center gap-8 w-full mt-6">
                <button
                  onClick={() =>
                    setSearchParams({ page: String(currentPage - 1) })
                  }
                  disabled={currentPage === 1}
                  className="w-28 bg-green-500 text-[#0000000] px-4 py-2 rounded-lg hover:bg-green-300 cursor-pointer duration-300"
                >
                  Previous
                </button>

                <span className="inline-block px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full shadow-sm tracking-wide">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setSearchParams({ page: String(currentPage + 1) })
                  }
                  disabled={currentPage === totalPages}
                  className="w-28 bg-green-500 text-[#0000000] px-4 py-2 rounded-lg hover:bg-green-300 cursor-pointer duration-300"
                >
                  Next
                </button>
              </div>
            )}

            <div className="flex justify-start mt-auto">
              <button
                onClick={handleErrorClick}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                Error click
              </button>
            </div>
          </div>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
