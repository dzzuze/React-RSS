import { useNavigate } from 'react-router-dom';

export default function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <div>
        <button
          onClick={() => navigate('/')}
          className="bg-green-500 text-[#0000000] px-4 py-2 rounded-lg hover:bg-green-300 cursor-pointer duration-300"
        >
          Main page
        </button>
      </div>
    </div>
  );
}
