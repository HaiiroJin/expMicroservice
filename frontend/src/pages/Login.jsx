import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [mot_passe, setMotPasse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Replace URL with your auth-service endpoint
      const res = await fetch('http://localhost:4002/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_passe })
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/produits');
      } else {
        throw new Error('Login failed: No token returned');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <div className="d-flex align-items-center justify-content-center vh-100 bg-light" style={{ width: '100vw', minHeight: '100vh' }}>
    <div className="card shadow p-4" style={{ minWidth: 350 }}>
      <h2 className="mb-4 text-center">Connexion</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input type="password" className="form-control" value={mot_passe} onChange={e => setMotPasse(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Se connecter</button>
      </form>
      <div className="mt-3 text-center">
        <span>Pas de compte ? </span>
        <button className="btn btn-link p-0" onClick={() => navigate('/signup')}>Créer un compte</button>
      </div>
    </div>
  </div>
);
}

export default Login;
