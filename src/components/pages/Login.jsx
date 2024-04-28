import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase'; // Import the auth object from firebase.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // If successful, user is authenticated
      const user = userCredential.user;
      console.log('User logged in successfully:', user);
      // Redirect to dashboard after successful login
      navigate('/dashboard'); // Navigate to dashboard route
    } catch (error) {
      // Handle authentication errors
      if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (error.code === 'auth/invalid-credential') {
        setError('Invalid credentials');
      } else {
        setError('Failed to sign in: ' + error.message);
      }
    }
  };

  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <div className="min-h-screen flex justify-center items-center">
        <form className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <div className="mt-4 text-gray-700 ">
            Don't have an account? <Link to="/sign-up" className="text-blue-500">Create one</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
