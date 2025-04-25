import React, { useEffect, useState } from 'react';

function Produits({ cart, setCart }) {
  // ...existing state

  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cart quantity modal state
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch products
  const fetchProduits = () => {
    setLoading(true);
    fetch('http://localhost:4000/produit/liste', {
      headers: localStorage.getItem('token') ? {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      } : {},
    })
      .then(async res => {
        return res.json();
      })
      .then(data => {
        if (data) setProduits(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des produits.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  

  return (
    <>
      {/* Header with Logout button */}
      <div className="container py-3 d-flex justify-content-between align-items-center">
        <h2 className="mb-0 text-center flex-grow-1">Liste des produits</h2>
        <div className="d-flex align-items-center">
          {localStorage.getItem('token') && (
            <button className="btn btn-primary me-2" onClick={() => window.location.href = '/commandes'}>
              Voir mes commandes
            </button>
          )}
          {localStorage.getItem('token') ? (
            <button className="btn btn-outline-danger ms-1" onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}>Déconnexion</button>
          ) : (
            <button className="btn btn-outline-primary ms-1" onClick={() => {
              window.location.href = '/login';
            }}>Connexion</button>
          )}
        </div>
      </div>

      {/* Add Product Button */}
      

      {/* Add Product Modal */}
      

      {/* Main Product List */}
      <div className="container py-3">
        {loading && <div className="text-center">Chargement...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {produits.length === 0 && !loading && !error ? (
          <div className="text-center text-muted">Aucun produit trouvé.</div>
        ) : (
          <div className="row justify-content-center">
            {produits.map((produit) => (
              <div className="col-md-4 mb-4" key={produit._id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{produit.nom}</h5>
                    <p className="card-text">{produit.description}</p>
                    <p className="card-text fw-bold">Prix : {produit.prix} €</p>
                    
                    <button className="btn btn-primary mt-2 ms-2" onClick={() => {
                      if (!localStorage.getItem('token')) {
                        window.location.href = '/login';
                      } else {
                        setSelectedProduct(produit);
                        setShowQuantityModal(true);
                      }
                    }}>
                      Commander
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    {/* Quantity Modal */}
    {showQuantityModal && selectedProduct && (
      <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Choisir la quantité</h5>
              <button type="button" className="btn-close" onClick={() => setShowQuantityModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Quantité</label>
                <input type="number" min="1" max="99" className="form-control" value={quantity} onChange={e => setQuantity(Math.max(1, Math.min(99, Number(e.target.value))))} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowQuantityModal(false)}>Annuler</button>
              <button type="button" className="btn btn-primary" onClick={() => {
                // Add to cart with quantity
                const existing = cart.find(p => p._id === selectedProduct._id);
                if (existing) {
                  setCart(cart.map(p => p._id === selectedProduct._id ? { ...p, quantity: (p.quantity || 1) + quantity } : p));
                } else {
                  setCart([...cart, { ...selectedProduct, quantity }]);
                }
                setShowQuantityModal(false);
                setQuantity(1);
              }}>Ajouter au panier</button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );

}

export default Produits;
