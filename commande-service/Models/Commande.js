const mongoose = require("mongoose");

const ProduitCommandeSchema = new mongoose.Schema({
    produitId: String,
    quantite: Number
}, { _id: false });

const CommandeSchema = mongoose.Schema({
    produits: [ProduitCommandeSchema],
    email_utilisateur: String,
    prix_total: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = Commande = mongoose.model("commande", CommandeSchema);
