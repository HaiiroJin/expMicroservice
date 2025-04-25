require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4000;
const mongoose = require("mongoose");
const Produit = require("./Models/Produit");
const isAuthenticated = require("./Middleware/isAuthenticated");
const cors = require('cors');
app.use(cors());

app.use(express.json());

mongoose.connect("mongodb://mongo:27017/produit-service")
    .then(() => {
        console.log(`Produit-Service DB Connected`);
    })
    .catch((err) => {
        console.log(err);
    });

app.post("/produit/ajouter", (req, res) => {
    const { nom, description, prix } = req.body;
    const newProduit = new Produit({
        nom,
        description,
        prix,
    });

    newProduit
        .save()
        .then((produit) => res.status(201).json(produit))
        .catch((error) => res.status(400).json({ error }));
});

app.get("/produit/liste", (req, res) => {
    Produit.find()
        .then((produits) => res.status(200).json(produits))
        .catch((error) => res.status(500).json({ error }));
});

app.delete("/produit/:id", isAuthenticated, (req, res) => {
    Produit.findByIdAndDelete(req.params.id)
        .then((deletedProduit) => {
            if (!deletedProduit) return res.status(404).json({ error: "Produit non trouvé" });
            res.status(200).json({ message: "Produit supprimé" });
        })
        .catch((error) => res.status(400).json({ error }));
});

app.get("/produit/acheter", (req, res) => {
    const { ids } = req.body;
    Produit.find({ _id: { $in: ids } })
        .then((produits) => res.status(201).json(produits))
        .catch((error) => res.status(400).json({ error }));
});

app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});
