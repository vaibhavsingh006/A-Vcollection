import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const OwnerSignup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setError('All fields are required');
            return;
        }

        // Make API call to register the owner
        try {
            const response = await fetch(`${API_URL}/owner/register`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('owner has been created please login now')
                navigate('/ownerlogin');  // Redirect to homepage after successful signup
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Server Error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-4">Owner Signup</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email Address</label>
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
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default OwnerSignup