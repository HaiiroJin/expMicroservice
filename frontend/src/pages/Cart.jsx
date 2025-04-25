import React from 'react';

function Cart({ cart, setCart, show, onClose, onValidate }) {
  const total = cart.reduce((sum, p) => sum + (p.prix * (p.quantity || 1)), 0);

  const removeFromCart = (id) => {
    setCart(cart.filter(p => p._id !== id));
  };

  return (
    <div className={`offcanvas offcanvas-end show`} tabIndex="-1" style={{ visibility: show ? 'visible' : 'hidden', width: 400, background: '#fff', borderLeft: '1px solid #ddd', position: 'fixed', top: 0, right: 0, height: '100%', zIndex: 1050, transition: 'transform 0.3s', transform: show ? 'translateX(0)' : 'translateX(100%)' }}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Mon Panier</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <div className="alert alert-info">Votre panier est vide.</div>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map(p => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={p._id}>
                  <span>
                    <strong>{p.nom}</strong> <span className="text-muted">({p.prix} €)</span>
                    <span className="badge bg-primary ms-2">x {p.quantity || 1}</span>
                  </span>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(p._id)}>Retirer</button>
                </li>
              ))}
            </ul>
            <div className="mb-3 fw-bold">Total à payer : {total} €</div>
            <button className="btn btn-success w-100" onClick={onValidate}>Valider la commande</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
