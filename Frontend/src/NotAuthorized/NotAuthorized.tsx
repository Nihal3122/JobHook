import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center  min-h-[90vh] text-white">
      <h1 className="text-3xl font-bold">403 - Not Authorized</h1>
      <p className="text-lg mt-2">
        You do not have permission to access this page.
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

export default NotAuthorized;
