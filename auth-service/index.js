require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4002;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Utilisateur = require("./Models/Utilisateur");
const cors = require('cors');
app.use(cors());

mongoose.connect("mongodb://localhost:27017/auth-service")
    .then(() => {
        console.log(`Auth-Service DB Connected`);
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

app.post("/auth/register", async (req, res) => {
    const { nom, email, mot_passe } = req.body;

    const userExists = await Utilisateur.findOne({ email });
    if (userExists) {
        return res.json({ message: "Cet utilisateur existe déjà" });
    }

    bcrypt.hash(mot_passe, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        const newUtilisateur = new Utilisateur({
            nom,
            email,
            mot_passe: hash
        });

        newUtilisateur.save()
            .then(user => res.status(201).json(user))
            .catch(error => res.status(400).json({ error }));
    });
});

app.post("/auth/login", async (req, res) => {
    const { email, mot_passe } = req.body;
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
        return res.json({ message: "Utilisateur introuvable" });
    } else {
        bcrypt.compare(mot_passe, utilisateur.mot_passe).then(resultat => {
            if (!resultat) {
                return res.json({ message: "Mot de passe incorrect" });
            } else {
                const payload = {
                    email,
                    nom: utilisateur.nom
                };
                jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                    if (err) console.log(err);
                    else return res.json({ token: token });
                });
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Auth-Service at ${PORT}`);
});
    
