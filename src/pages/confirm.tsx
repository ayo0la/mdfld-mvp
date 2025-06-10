import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const Confirm: React.FC = () => {
  const [code, setCode] = useState('');
  const router = useRouter();
  const email = (router.query.email as string) || '';

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(email, code);
      router.push('/signin');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleConfirm} className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Confirm Sign Up</h2>
      <input
        className="block w-full mb-4 p-2 border rounded"
        type="text"
        placeholder="Confirmation Code"
        value={code}
        onChange={e => setCode(e.target.value)}
        required
      />
      <button className="w-full bg-primary text-white py-2 rounded" type="submit">
        Confirm
      </button>
    </form>
  );
};

export default Confirm; 