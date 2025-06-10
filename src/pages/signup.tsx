import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Auth.signUp({ username: email, password });
      router.push('/confirm?email=' + encodeURIComponent(email));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        className="block w-full mb-2 p-2 border rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="block w-full mb-4 p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="w-full bg-primary text-white py-2 rounded" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default Signup; 