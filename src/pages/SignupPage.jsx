import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../IMG/A&V_logo.png';
const API_URL = import.meta.env.VITE_API_URL;

const SignupPage = () => {
    //     const [formData, setFormData] = useState({
    //         username: "",
    //         email: "",
    //         password: "",
    //     });

    //     const [error, setError] = useState("");
    //     const [success, setSuccess] = useState("");

    //     // Handle form input changes
    //     const handleChange = (e) => {
    //         const { name, value } = e.target;
    //         setFormData({ ...formData, [name]: value });
    //     };

    //     // Handle form submission
    //     const handleSubmit = async (e) => {
    //         e.preventDefault();
    //         setError("");
    //         setSuccess("");

    //         try {
    //             const response = await fetch("http://localhost:3000/auth/register", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(formData),
    //             });

    //             const data = await response.json();
    //             if (response.ok) {
    //                 setSuccess("Account created successfully! Redirecting...");
    //                 console.log(success)
    //                 setTimeout(() => {
    //                     window.location.href = data.redirectTo;
    //                 }, 2000);
    //             } else {
    //                 setError(data.message || "Failed to create account");
    //             }
    //         } catch (error) {
    //             setError("An unexpected error occurred");
    //         }
    //     };

    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    //                 <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

    //                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    //                 {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

    //                 <form onSubmit={handleSubmit} className="space-y-6">
    //                     <div>
    //                         <label
    //                             htmlFor="username"
    //                             className="block text-sm font-medium text-gray-700"
    //                         >
    //                             Full Name
    //                         </label>
    //                         <input
    //                             type="text"
    //                             id="username"
    //                             name="username"
    //                             value={formData.username}
    //                             onChange={handleChange}
    //                             placeholder="John Doe"
    //                             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
    //                             required
    //                         />
    //                     </div>
    //                     <div>
    //                         <label
    //                             htmlFor="email"
    //                             className="block text-sm font-medium text-gray-700"
    //                         >
    //                             Email Address
    //                         </label>
    //                         <input
    //                             type="email"
    //                             id="email"
    //                             name="email"
    //                             value={formData.email}
    //                             onChange={handleChange}
    //                             placeholder="example@mail.com"
    //                             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
    //                             required
    //                         />
    //                     </div>
    //                     <div>
    //                         <label
    //                             htmlFor="password"
    //                             className="block text-sm font-medium text-gray-700"
    //                         >
    //                             Password
    //                         </label>
    //                         <input
    //                             type="password"
    //                             id="password"
    //                             name="password"
    //                             value={formData.password}
    //                             onChange={handleChange}
    //                             placeholder="********"
    //                             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
    //                             required
    //                         />
    //                     </div>
    //                     <button
    //                         type="submit"
    //                         className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
    //                     >
    //                         Sign Up
    //                     </button>
    //                 </form>
    //                 <p className="text-center text-sm text-gray-500 mt-4">
    //                     Already have an account?{" "}
    //                     <a
    //                         href="/login"
    //                         className="text-green-500 font-medium hover:underline"
    //                     >
    //                         Log in
    //                     </a>
    //                 </p>
    //             </div>
    //         </div>
    //     );
    // };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // For client-side navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!username || !email || !password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Registration failed');
            } else {
                // Navigate to login page after successful registration
                navigate('/login');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary-text">
            <div className="bg-black shadow-md rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-center mb-3">
                    <img src={Logo} alt="A&V Logo" className="h-24" />
                </div>
                <h2 className="text-3xl font-bold text-center text-White-text mb-6">
                    Sign up for A&V
                </h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-White-text font-medium mb-2">
                            Username
                        </label>
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
                            type="text"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            placeholder="Create a password"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-accent text-primary-text hover:text-accent font-bold py-2 px-4 rounded-lg transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:border-accent'
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign up'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-accent hover:text-accent hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
