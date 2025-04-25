import React, { useEffect, useState } from 'react';

function Commandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [produits, setProduits] = useState([]);

  const isLoggedIn = !!localStorage.getItem('token');

  // Fetch all products for name lookup
  useEffect(() => {
    fetch('http://localhost:4000/produit/liste')
      .then(res => res.json())
      .then(data => setProduits(data || []))
      .catch(() => setProduits([]));
  }, []);

  const getProductName = (id) => {
    const prod = produits.find(p => p._id === id);
    return prod ? prod.nom : id;
  };

  const fetchCommandes = () => {
    setLoading(true);
    fetch('http://localhost:4001/commande/liste', {
      headers: localStorage.getItem('token') ? {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      } : {},
    })
      .then(res => res.json())
      .then(data => {
        setCommandes(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des commandes.');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCommandes();
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const handleShowCommandes = () => {
    fetchCommandes();
    setShowList(true);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Liste des commandes</h2>
      {!isLoggedIn ? (
        <div className="alert alert-warning text-center">Veuillez vous connecter pour voir vos commandes.</div>
      ) : (
        <>
          {loading && <div className="text-center">Chargement...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {commandes.length === 0 && !loading && !error ? (
            <div className="text-center text-muted">Aucune commande trouvée.</div>
          ) : (
            <div className="row justify-content-center">
              {commandes.map((commande) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={commande._id}>
                  <div className="card h-100 shadow-sm rounded border-0">
                    <div className="card-body p-4 d-flex flex-column">
                      <h5 className="card-title mb-3 text-primary">Commande <span className="text-dark">#{commande._id}</span></h5>
                      <p className="mb-1"><span className="fw-semibold">Utilisateur :</span> <span className="text-secondary">{commande.email_utilisateur || 'N/A'}</span></p>
                      <p className="mb-2"><span className="fw-semibold">Date :</span> <span className="text-secondary">{commande.created_at ? new Date(commande.created_at).toLocaleString() : 'N/A'}</span></p>
                      <div className="mb-2">
                        <strong>Produits :</strong>
                        <ul className="list-group list-group-flush ms-2 mb-2">
                          {(commande.produits || []).map((p, idx) => (
                            <li key={idx} className="list-group-item px-0 py-1 border-0 bg-transparent text-dark">
                              <span className="badge bg-light text-dark border me-2">{getProductName(p.produitId)}</span>
                              <span className="badge bg-primary">x {p.quantite}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto">
                        <span className="fw-bold fs-5 text-success">Total : {commande.prix_total || 0} €</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Commandes;
