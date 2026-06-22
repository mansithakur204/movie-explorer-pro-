import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    toast.success(data.message);

    navigate("/login");

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-8 rounded-xl w-[400px]"
      >
        <h1 className="text-3xl text-red-500 font-bold mb-6">Register</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
