import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-6">
      <div className="text-center max-w-lg">

        <h1 className="text-8xl md:text-9xl font-extrabold text-accent">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-600 leading-relaxed">
          The page you're looking for doesn't exist, may have been moved,
          or the URL might be incorrect.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}