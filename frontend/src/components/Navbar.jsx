import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.reload();
  };

  return (
    <nav className="bg-black text-white px-4 md:px-8 py-4 border-b border-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-red-500 flex items-center gap-2">
          🎬 Movie Explorer Pro
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/">Home</Link>

          {token ? (
            <>
              <Link to="/favorites">Favorites</Link>
              <Link to="/watchlist">Watchlist</Link>
              <Link to="/profile">Profile</Link>

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
  <Link to="/">Home</Link>

  {token ? (
    <>
      <Link to="/favorites">Favorites</Link>

      <Link to="/watchlist">Watchlist</Link>

      <Link to="/profile">Profile</Link>

      <button onClick={handleLogout} className="text-left">
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login">Login</Link>

      <Link to="/register">Register</Link>
    </>
  )}
</div>
      )}
    </nav>
  );
}

export default Navbar;
