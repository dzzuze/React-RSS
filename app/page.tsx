import { SearchBar } from './SearchBar';
import Results from '../src/components/Results/Results';
import Link from 'next/link';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string }>;
}) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page) : 1;
  const searchTerm = params.name || '';

  let apiUrl = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
  if (searchTerm) apiUrl += `&name=${encodeURIComponent(searchTerm)}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const characters = (data.results || []).map(
    (char: { id: string; name: string; species: string; image: string }) => ({
      id: String(char.id),
      name: char.name,
      description: char.species,
      image: char.image,
    })
  );

  const totalPages = data.info?.pages || 1;

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <SearchBar initialValue={searchTerm} />
      <Results items={characters} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="mt-4 flex gap-2">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`} className="...">
          Previous
        </Link>
      )}
      <span className="px-3 py-1">
        {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`} className="...">
          Next
        </Link>
      )}
    </div>
  );
}
