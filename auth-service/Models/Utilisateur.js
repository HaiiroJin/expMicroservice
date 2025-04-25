const mongoose = require("mongoose");

const UtilisateurSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    mot_passe: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);