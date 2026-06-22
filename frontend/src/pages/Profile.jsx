import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    fetchUser();
    fetchFavoritesCount();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("https://movie-explorer-backend-u172.onrender.com/api/auth/me", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavoritesCount = async () => {
    try {
      const response = await fetch("https://movie-explorer-backend-u172.onrender.com/api/favorites", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      setFavoritesCount(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-xl">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-4xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <h1 className="text-4xl font-bold text-red-500 mb-8">My Profile</h1>

        <p className="text-xl mb-4">👤 Name: {user.name}</p>

        <p className="text-xl mb-4">📧 Email: {user.email}</p>

        <p className="text-xl mb-4">❤️ Total Favorites: {favoritesCount}</p>

        <p className="text-xl mb-4">🔐 Account Status: Active</p>

        <p className="text-xl text-red-500">🎬 Movie Explorer Member</p>
      </div>
    </div>
  );
}

export default Profile;
