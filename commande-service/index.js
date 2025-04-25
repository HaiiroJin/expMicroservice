require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4001;
const mongoose = require("mongoose");
const Commande = require("./Models/Commande");
const axios = require('axios');
const isAuthenticated = require("./Middleware/isAuthenticated");
const cors = require('cors');
app.use(cors());

mongoose.connect("mongodb://mongo:27017/commande-service")
    .then(() => {
        console.log(`Commande-Service DB Connected`);
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

function prixTotal(produits) {
    let total = 0;
    for (let t = 0; t < produits.length; ++t) {
        total += produits[t].prix;
    }
    console.log("prix total :" + total);
    return total;
}

async function httpRequest(ids) {
    try {
        const URL = "http://localhost:4000/produit/acheter";
        const response = await axios.post(URL, { ids: ids }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return prixTotal(response.data);
    } catch (error) {
        console.error(error);
    }
}

app.get("/commande/liste", isAuthenticated, async (req, res) => {
    try {
        const commandes = await Commande.find({ email_utilisateur: req.user.email }).sort({ created_at: -1 });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
    }
});

app.post("/commande/ajouter", isAuthenticated, async (req, res) => {
    // Expect: { produits: [{ produitId, quantite }], total }
    const { produits, total } = req.body;
    if (!Array.isArray(produits) || typeof total !== 'number') {
        return res.status(400).json({ error: 'Format de commande invalide.' });
    }
    const newCommande = new Commande({
        produits, // [{ produitId, quantite }]
        email_utilisateur: req.user.email,
        prix_total: total,
    });
    newCommande.save()
        .then(commande => res.status(201).json(commande))
        .catch(error => res.status(400).json({ error }));
});

app.listen(PORT, () => {
    console.log(`Commande-Service at ${PORT}`);
});
