import { useEffect, useState } from 'react';

export default function TestBackend() {
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch('/api/server/ping')
      .then(res => res.json())
      .then(data => setResult(JSON.stringify(data)))
      .catch(err => setResult('Error: ' + err.message));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Backend Connection Test</h1>
      <pre>{result}</pre>
    </div>
  );
} 