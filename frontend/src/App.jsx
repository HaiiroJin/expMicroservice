import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Produits from './pages/Produits';
import Commandes from './pages/Commandes';
import Cart from './pages/Cart';

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function MainApp() {
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();
    // Navbar inside Router
    function Navbar({ onCartClick }) {
      const totalItems = cart.reduce((sum, p) => sum + (p.quantity || 1), 0);
      return (
        <nav className="navbar navbar-light bg-light px-3 mb-3">
          <a className="navbar-brand" href="/produits">Boutique</a>
          <button className="btn btn-outline-primary position-relative" onClick={onCartClick}>
            🛒
            {totalItems > 0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{totalItems}</span>}
          </button>
        </nav>
      );
    }

    // Validate cart logic
    const handleValidate = async () => {
      if (!localStorage.getItem('token')) {
        alert('Veuillez vous connecter pour valider la commande.');
        setShowCart(false);
        navigate('/login');
        return;
      }
      const total = cart.reduce((sum, p) => sum + (p.prix * (p.quantity || 1)), 0);
      try {
        const res = await fetch('http://localhost:4001/commande/ajouter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ produits: cart.map(p => ({ produitId: p._id, quantite: p.quantity || 1 })), total })
        });
        if (!res.ok) throw new Error('Erreur lors de la validation de la commande.');
        setCart([]);
        setShowCart(false);
        alert('Commande validée avec succès !');
        navigate('/commandes');
      } catch (err) {
        alert(err.message);
      }
    };

    return (
      <div className="container-fluid p-0">
        <Navbar onCartClick={() => setShowCart(true)} />
        <Cart cart={cart} setCart={setCart} show={showCart} onClose={() => setShowCart(false)} onValidate={handleValidate} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/produits" element={<Produits cart={cart} setCart={setCart} />} />
          <Route path="/commandes" element={<Commandes />} />
          <Route path="*" element={<Navigate to="/produits" />} />
        </Routes>
      </div>
    );
  }

  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App
