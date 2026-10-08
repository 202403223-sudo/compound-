
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-[#f8f5ef] px-5">

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eee7dc] text-[#6d5945]">
          <Compass size={34} />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#a48664]">
          Error 404
        </p>

        <h1 className="serif mt-3 text-6xl text-[#44372c]">
          Page not found.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#7c7167]">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="primary-btn mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
        >
          <ArrowLeft size={17} />
          Back to Maison Verde
        </Link>

      </div>

    </div>
  );
}

