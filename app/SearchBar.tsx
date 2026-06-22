'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const SearchBar = ({ initialValue }: { initialValue: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const trimmed = name.trim();

    const params = new URLSearchParams(searchParams.toString());
    if (trimmed) {
      params.set('name', trimmed);
    } else {
      params.delete('name');
    }
    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        name="name"
        defaultValue={initialValue}
        placeholder="Search character..."
        className="border px-2 py-1 rounded flex-1"
      />
      <button
        type="submit"
        className="px-4 py-1 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </form>
  );
};
