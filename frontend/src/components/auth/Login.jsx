import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await login({ email, password });
      const token = response.data.authToken;

      localStorage.setItem('token', token);
      console.log('Login successful, token saved:', token);

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">📚</h1>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            EduTrack
          </h1>
          <p className="text-gray-600 mt-2">Welcome back to your learning hub</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg font-medium flex justify-between items-center">
            <span>❌ {error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 text-xl">✕</button>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>📧</span>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>🔐</span>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Logging in...
              </>
            ) : (
              <>
                <span>🚀</span>
                Login
              </>
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors">
              Register here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© 2024 EduTrack. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
