import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Waves, Lock, Mail, ArrowLeft, ShieldCheck, Check } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@lelequ.com');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const { loginAdmin } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (success) {
      navigate('/admin');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@lelequ.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 text-center group">
            <div className="w-12 h-12 rounded-2xl bg-[#123F2E] flex items-center justify-center text-white shadow-md group-hover:bg-[#1B6044] transition-colors mx-auto">
              <Waves className="w-6 h-6 text-[#78B98B]" />
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#202923] tracking-tight">
            LeleQu Content Management System
          </h1>
          <p className="text-xs text-[#6B786F]">
            Masuk untuk mengelola produk, artikel edukasi, kemitraan, dan pesan pelanggan.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
              <ShieldCheck className="w-4 h-4" />
              <span>Autentikasi Administrator</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-semibold text-[#1B6044] hover:underline"
            >
              Isi Akun Demo
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lelequ.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm text-[#202923] focus:border-[#1B6044] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm text-[#202923] focus:border-[#1B6044] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#6B786F] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#1B6044] focus:ring-0"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              Masuk ke Dashboard
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="p-3 rounded-xl bg-[#F8FAF6] border border-neutral-200 text-[11px] text-[#6B786F] space-y-1">
            <span className="font-bold text-[#202923] block">Kredensial Pengujian:</span>
            <div className="flex items-center justify-between">
              <span>Email: <code className="font-mono text-[#123F2E]">admin@lelequ.com</code></span>
              <span>Sandi: <code className="font-mono text-[#123F2E]">admin123</code></span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B786F] hover:text-[#123F2E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Publik LeleQu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
