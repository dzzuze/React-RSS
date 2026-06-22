'use client';

import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col gap-4 items-center">
      <div className="flex-1"></div>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold">About</h1>
        <h2 className="text-xl font-semibold text-gray-700">
          Rick and Morty API
        </h2>
        <p className="text-gray-600">Hi, im dzzuze! This is my web-site🪐</p>
        <div>
          <button
            onClick={() => router.push}
            className="bg-green-500 text-[#0000000] px-4 py-2 rounded-lg hover:bg-green-300 cursor-pointer duration-300"
          >
            Main page
          </button>
        </div>
      </div>
      <div className="flex-1"></div>
      <footer>
        <a
          href="https://rs.school/"
          className="text-sm font-medium text-gray-400 hover:text-green-500 transition-colors duration-300 cursor-pointer"
        >
          RSSchool
        </a>
      </footer>
    </div>
  );
}
