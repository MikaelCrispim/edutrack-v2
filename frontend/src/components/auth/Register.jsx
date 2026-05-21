import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup, verifyRegistration } from '../../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("❌ As senhas não coincidem!");
      return;
    }

    if (formData.password.length < 6) {
      setError("❌ A senha deve ter no mínimo 6 caracteres!");
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await signup(formData);
      localStorage.setItem('token', response.data.authToken);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Ocorreu um erro durante o registro.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyRegistration(code);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Falha na verificação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">🚀</h1>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {step === 1 ? 'Criar uma Conta' : 'Verifique seu E-mail'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Comece sua jornada de aprendizado hoje</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg font-medium flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700 dark:hover:text-red-300 text-xl cursor-pointer">✕</button>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSubmitStep1} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-2 border-purple-100 dark:border-slate-700">
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span>👤</span>
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="João da Silva"
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span>📧</span>
                Endereço de E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="voce@exemplo.com"
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span>🔐</span>
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo de 6 caracteres"
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span>🔒</span>
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repita sua senha"
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Criando conta...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Criar Conta
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitStep2} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-2 border-purple-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">Enviamos um código de 6 dígitos para <span className="font-semibold text-gray-900 dark:text-gray-100">{formData.email}</span>.</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                Código de Verificação
              </label>
              <input
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors outline-none text-center text-3xl tracking-[0.5em] font-mono"
                placeholder="000000"
                maxLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Verificando...
                </>
              ) : (
                <>
                  <span>✅</span>
                  Verificar & Entrar
                </>
              )}
            </button>
          </form>
        )}

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline transition-colors">
              Entre aqui
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
          <p>© 2026 EduTrack. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
