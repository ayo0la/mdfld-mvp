import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { signUp } from 'aws-amplify/auth';

const SignUp: React.FC = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', agree: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{2,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(null);
    if (!USERNAME_REGEX.test(form.username)) {
      setError('Username must be at least 2 characters and can only contain letters, numbers, ".", "-", and "_".');
      setPending(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setPending(false);
      return;
    }
    if (!form.agree) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      setPending(false);
      return;
    }
    try {
      await signUp({
        username: form.username,
        password: form.password,
        options: {
          userAttributes: {
            email: form.email,
          },
        },
      });
      setSuccess('Registration successful! Please check your email to verify your account.');
      setForm({ username: '', email: '', password: '', confirmPassword: '', agree: false });
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="min-h-screen bg-[#111] text-white font-gordita flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-[#222] rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-8">
            <Link href="/signin" className="text-lg font-medium text-gray-400 px-4 pb-2 hover:text-primary transition">Login</Link>
            <Link href="/signup" className="text-lg font-medium border-b-2 border-primary text-primary px-4 pb-2">Sign Up</Link>
          </div>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm mb-1">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded bg-[#181818] border border-[#333] focus:border-primary focus:outline-none text-base"
                value={form.username}
                onChange={handleChange}
                disabled={pending}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded bg-[#181818] border border-[#333] focus:border-primary focus:outline-none text-base"
                value={form.email}
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
                autoComplete="new-password"
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
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 rounded bg-[#181818] border border-[#333] focus:border-primary focus:outline-none text-base pr-12"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={pending}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-primary"
                tabIndex={-1}
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={form.agree}
                onChange={handleChange}
                disabled={pending}
                className="accent-primary w-4 h-4"
                required
              />
              <label htmlFor="agree" className="text-xs text-gray-300 select-none">
                I agree to the{' '}
                <a href="#" className="underline text-primary hover:text-accent">Terms of Service</a>{' '}and{' '}
                <a href="#" className="underline text-primary hover:text-accent">Privacy Policy</a>
              </label>
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-500 text-sm text-center">{success}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded bg-primary text-white font-bold text-lg mt-2 hover:bg-accent transition"
              disabled={pending}
            >
              SIGN UP
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

export default SignUp; 