import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestPasswordReset, verifyPasswordReset } from '../../api';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await requestPasswordReset(email);
      setMessage(response.data.message || 'Enviamos um código de verificação para seu e-mail.');
      setMessageType('success');
      setStep(2);
    } catch (err) {
      setMessage('Se a conta existir, enviamos um código de verificação para o e-mail.');
      setMessageType('success');
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (newPassword.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres.');
      setMessageType('error');
      return;
    }
    setLoading(true);
    try {
      await verifyPasswordReset(email, code, newPassword);
      setMessage('Senha redefinida com sucesso! Redirecionando...');
      setMessageType('success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Código inválido ou falha ao redefinir a senha.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">🔑</h1>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            Redefinir Senha
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Vamos ajudar você a voltar aos estudos</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg font-medium flex justify-between items-center border-2 ${
              messageType === 'success'
                ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
            }`}
          >
            <span>{message}</span>
            <button
              onClick={() => setMessage(null)}
              className={`text-xl cursor-pointer ${messageType === 'success' ? 'text-green-500 hover:text-green-700 dark:hover:text-green-300' : 'text-red-500 hover:text-red-700 dark:hover:text-red-300'}`}
            >
              ✕
            </button>
          </div>
        )}

        {/* Forms */}
        {step === 1 ? (
          <form onSubmit={handleSubmitStep1} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-2 border-green-100 dark:border-slate-700">
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span>📧</span>
                Endereço de E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@exemplo.com"
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Digite o e-mail associado à sua conta.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mb-4 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Enviando...
                </>
              ) : (
                <>
                  <span>📬</span>
                  Enviar Código
                </>
              )}
            </button>

            {/* Back to Login Button */}
            <Link
              to="/login"
              className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>←</span>
              Voltar ao Login
            </Link>
          </form>
        ) : (
          <form onSubmit={handleSubmitStep2} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-2 border-green-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-300">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                Código de Verificação
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="000000"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors outline-none text-center text-3xl tracking-[0.5em] font-mono"
                required
                maxLength="6"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Nova Senha
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Verificando...
                </>
              ) : (
                <>
                  <span>✅</span>
                  Verificar & Redefinir
                </>
              )}
            </button>
          </form>
        )}

        {/* Help Text */}
        <div className="mt-8 text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>💡 Verifique seu e-mail para encontrar o código.</p>
            <p>Não recebeu? Verifique a pasta de spam.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
          <p>© 2026 EduTrack. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
