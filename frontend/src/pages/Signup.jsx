import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [mot_passe, setMotPasse] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Replace URL with your auth-service endpoint
      const res = await fetch('http://localhost:4002/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom, email, mot_passe })
      });
      if (!res.ok) throw new Error('Signup failed');
      setSuccess('Compte créé ! Connectez-vous.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <div className="d-flex align-items-center justify-content-center vh-100 bg-light" style={{ width: '100vw', minHeight: '100vh', width: '100vw', minHeight: '100vh' }}>
    <div className="card shadow p-4" style={{ minWidth: 350 }}>
      <h2 className="mb-4 text-center">Créer un compte</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input type="text" className="form-control" value={nom} onChange={e => setNom(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input type="text" className="form-control" value={prenom} onChange={e => setPrenom(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input type="password" className="form-control" value={mot_passe} onChange={e => setMotPasse(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Créer un compte</button>
      </form>
      <div className="mt-3 text-center">
        <span>Déjà inscrit ? </span>
        <button className="btn btn-link p-0" onClick={() => navigate('/login')}>Se connecter</button>
      </div>
    </div>
  </div>
);
}

export default Signup;
