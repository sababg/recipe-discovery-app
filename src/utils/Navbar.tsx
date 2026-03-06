import * as React from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

type NavbarProps = {
  searchPath?: string;
};

const Navbar: React.FC<NavbarProps> = ({ searchPath = "/search" }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [q, setQ] = React.useState(searchParams.get("q") ?? "");

  React.useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();

    if (!query) {
      navigate(searchPath);
      return;
    }

    navigate(`${searchPath}?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white fixed top-0 left-0 z-10 text-black">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <form onSubmit={onSubmit} className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search recipes (e.g. Arrabiata)"
              className="w-full min-w-0 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-black text-white px-3 py-2 text-sm cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>
        <Link
          to="/"
          className="inline-flex items-center text-black px-3 py-2 text-sm"
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className="inline-flex items-center text-black px-3 py-2 text-sm"
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
