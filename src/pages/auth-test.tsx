import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthTestPage = () => {
  const { user, loading, signIn, signOut } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await signIn(form.username, form.password);
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    } finally {
      setPending(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div style={{ padding: 32 }}>
        <h2>Signed in as: {user.username}</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          disabled={pending}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={pending}
        />
        <br />
        <button type="submit" disabled={pending}>Sign In</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AuthTestPage; 