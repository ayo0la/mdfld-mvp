import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

const SignIn: React.FC = () => {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    // TODO: Integrate real sign-in logic
    setTimeout(() => {
      setPending(false);
      setError('Invalid credentials');
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="min-h-screen bg-[#111] text-white font-gordita flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-[#222] rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-8">
            <Link href="/signin" className="text-lg font-medium border-b-2 border-primary text-primary px-4 pb-2">Login</Link>
            <Link href="/signup" className="text-lg font-medium text-gray-400 px-4 pb-2 hover:text-primary transition">Sign Up</Link>
          </div>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="identifier" className="block text-sm mb-1">Email or Username</label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                placeholder="Enter your email or username"
                className="w-full px-4 py-3 rounded bg-[#181818] border border-[#333] focus:border-primary focus:outline-none text-base"
                value={form.identifier}
                onChange={handleChange}
                disabled={pending}
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm mb-1">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded bg-[#181818] border border-[#333] focus:border-primary focus:outline-none text-base pr-12"
                value={form.password}
                onChange={handleChange}
                disabled={pending}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-primary"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded bg-primary text-white font-bold text-lg mt-2 hover:bg-accent transition"
              disabled={pending}
            >
              LOGIN
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[#333]" />
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-1 h-px bg-[#333]" />
          </div>
          <button
            className="w-full flex items-center justify-center gap-3 py-3 rounded bg-[#181818] border border-[#333] hover:bg-[#232323] transition text-base font-medium"
            type="button"
            disabled={pending}
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn; 