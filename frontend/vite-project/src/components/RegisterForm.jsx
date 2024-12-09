import React, { useState } from 'react';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Optional: Loading state for button

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Reset any previous error
    setError('');
    setLoading(true); // Start loading indicator

    // Basic validation
    if (!username || !email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:9000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('User registered successfully!', data);
        // Handle successful registration (e.g., redirect or show a success message)
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An error occurred during registration');
    } finally {
      setLoading(false); // End loading indicator
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          disabled={loading} // Disable the button during loading
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
