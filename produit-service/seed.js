require('dotenv').config();
const mongoose = require('mongoose');
const Produit = require('./Models/Produit');

const produits = [
  { nom: "Apple iPhone 15", description: "Smartphone 6.1\" OLED, 128 Go, 5G", prix: 999 },
  { nom: "Samsung Galaxy S24", description: "Écran AMOLED, 256 Go, triple caméra", prix: 899 },
  { nom: "Sony WH-1000XM5", description: "Casque Bluetooth à réduction de bruit", prix: 379 },
  { nom: "Dell XPS 13", description: "Ultrabook 13.3\" Intel i7, 16 Go RAM, 512 Go SSD", prix: 1299 },
  { nom: "GoPro HERO12 Black", description: "Caméra d’action 5K, étanche, Wi-Fi", prix: 429 },
  { nom: "Apple iPad Air", description: "Tablette 10.9\" Liquid Retina, 64 Go", prix: 669 },
  { nom: "Nintendo Switch OLED", description: "Console de jeux hybride, écran OLED 7\"", prix: 349 },
  { nom: "Canon EOS R10", description: "Appareil photo hybride 24MP, vidéo 4K", prix: 1099 },
  { nom: "JBL Charge 5", description: "Enceinte Bluetooth portable, étanche IP67", prix: 179 },
  { nom: "Bose SoundLink Revolve II", description: "Enceinte Bluetooth 360°, autonomie 13h", prix: 229 },
  { nom: "Fitbit Versa 4", description: "Montre connectée fitness, GPS intégré", prix: 199 },
  { nom: "Samsung Galaxy Tab S9", description: "Tablette 11\" AMOLED, 128 Go", prix: 799 },
  { nom: "Logitech MX Master 3S", description: "Souris sans fil ergonomique, USB-C", prix: 109 },
  { nom: "Kindle Paperwhite", description: "Liseuse 6.8\", éclairage intégré, étanche", prix: 149 },
  { nom: "Xiaomi Mi Smart Air Fryer", description: "Friteuse sans huile connectée 3.5L", prix: 99 },
  { nom: "Philips Hue Starter Kit", description: "Kit ampoules connectées LED, pont inclus", prix: 189 },
  { nom: "Apple Watch SE", description: "Montre connectée GPS, 40mm", prix: 299 },
  { nom: "Dyson V11 Absolute", description: "Aspirateur balai sans fil, autonomie 60min", prix: 599 },
  { nom: "Tefal Ingenio Batterie 10 pièces", description: "Batterie de cuisine antiadhésive", prix: 149 },
  { nom: "Rowenta Turbo Silence Extreme", description: "Ventilateur sur pied, silencieux", prix: 89 }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await Produit.deleteMany({});
    await Produit.insertMany(produits);
    console.log("Seeding done!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
