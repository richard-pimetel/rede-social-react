import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if value is entered
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (err) {
      setError('Erro ao enviar código de verificação');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
    } catch (err) {
      setError('Código inválido');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(4);
    } catch (err) {
      setError('Erro ao redefinir senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A2A5E] flex items-center justify-center p-5">
      <div className="w-full max-w-[500px] bg-white rounded-[15px] p-10 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0A2A5E]">
            Esporte<span className="text-[#4CAF50]">ON</span>
          </h1>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Esqueceu a senha?</h2>
            <p className="text-center text-gray-600 mb-8">Redefina a senha em duas etapas</p>
            
            <form onSubmit={handleSubmitEmail} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-0 pt-3 pb-2 text-gray-800 border-b-2 border-gray-300 focus:border-[#0A2A5E] focus:outline-none transition-colors"
                  placeholder=" "
                  required
                />
                <label className="absolute left-0 top-3 text-gray-600 transition-all duration-300 pointer-events-none transform origin-left">
                  E-mail
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A2A5E] text-white py-3 rounded-lg font-medium hover:bg-[#09377B] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center h-[48px]"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Enviar'
                )}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Verificação de código</h2>
            <p className="text-center text-gray-600 mb-8">
              Acabamos de enviar um código para seu e-mail.<br />
              Insira o código de verificação de 6 dígitos.
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="flex justify-between gap-2 mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    data-index={index}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-[#0A2A5E] focus:outline-none"
                  />
                ))}
              </div>

              {error && (
                <div className="text-red-500 text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A2A5E] text-white py-3 rounded-lg font-medium hover:bg-[#09377B] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center h-[48px]"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Verificar'
                )}
              </button>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Não recebeu o código?{' '}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#0A2A5E] hover:underline font-medium"
                  >
                    Reenviar código
                  </button>
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[#0A2A5E] hover:underline font-medium"
                >
                  Alterar e-mail
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Criação de senha nova</h2>

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="relative">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-0 pt-3 pb-2 text-gray-800 border-b-2 border-gray-300 focus:border-[#0A2A5E] focus:outline-none transition-colors"
                  placeholder=" "
                  required
                />
                <label className="absolute left-0 top-3 text-gray-600 transition-all duration-300 pointer-events-none transform origin-left">
                  Senha nova
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-0 pt-3 pb-2 text-gray-800 border-b-2 border-gray-300 focus:border-[#0A2A5E] focus:outline-none transition-colors"
                  placeholder=" "
                  required
                />
                <label className="absolute left-0 top-3 text-gray-600 transition-all duration-300 pointer-events-none transform origin-left">
                  Confirmar senha nova
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-600">
                <p>Sua senha deve conter:</p>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Pelo menos 8 caracteres</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Pelo menos 1 número</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Pelo menos 1 caractere especial</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A2A5E] text-white py-3 rounded-lg font-medium hover:bg-[#09377B] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center h-[48px]"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Redefinir Senha'
                )}
              </button>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Senha redefinida com sucesso!</h2>
            <p className="text-gray-600 mb-8">
              Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#0A2A5E] text-white py-3 rounded-lg font-medium hover:bg-[#09377B] transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Ir para login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;