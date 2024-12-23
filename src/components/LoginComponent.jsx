import React, { useState } from 'react';
import Logo from '../IMG/A&V_logo.png'; // Correct import for an image

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    alert('Login Successful');
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-text">
      <div className="bg-black shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-3">
          <img src={Logo} alt="A&V Logo" className="h-24" /> {/* Added alt attribute */}
        </div>
        <h2 className="text-3xl font-bold text-center text-White-text mb-6">Login to A&V</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-White-text font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-White-text font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-primary-text hover:text-accent font-bold py-2 px-4 rounded-lg hover:bg-black transition-colors hover:border-accent"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-accent hover:text-accent hover:underline">
              Sign up
            </a>
          </p>
          <p className="text-gray-600 mt-2">
            Forgot your password?{' '}
            <a href="/reset-password" className="text-accent hover:text-accent hover:underline">
              Reset here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;