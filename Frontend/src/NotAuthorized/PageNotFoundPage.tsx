import { Link } from "react-router-dom";

const PageNotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]  text-white">
      <h1 className="text-5xl font-bold text-[#ffbd20]">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
      <p className="text-lg mt-2 text-gray-400">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-[#ffbd20] text-black font-semibold rounded"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFoundPage;
