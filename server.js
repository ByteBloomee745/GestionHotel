const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Configuration de la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Remplacez par votre utilisateur MySQL
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'eclat_hotel'
});

// Connecter à MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques

// Par :
app.use(express.static(path.join(__dirname, 'frontend')));app.post('/api/reservations', (req, res) => {
  const {
    suiteType, checkIn, checkOut, adults, children,
    firstName, lastName, email, phone, specialRequests,
    breakfastOption, spaOption, airportOption, lateCheckout,
    totalPrice, paymentMethod
  } = req.body;

  const sql = `
    INSERT INTO reservations (
      suite_type, check_in, check_out, adults, children,
      first_name, last_name, email, phone, special_requests,
      breakfast_option, spa_option, airport_option, late_checkout,
      total_price, payment_method, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
  `;

  const values = [
    suiteType, checkIn, checkOut, adults, children,
    firstName, lastName, email, phone, specialRequests,
    breakfastOption, spaOption, airportOption, lateCheckout,
    totalPrice, paymentMethod
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de la réservation' });
    }
    
    res.json({
      success: true,
      reservationId: result.insertId,
      bookingNumber: `ECL-${new Date().getFullYear()}-${result.insertId}`
    });
  });
});

// Route pour obtenir une réservation
app.get('/api/reservations/:id', (req, res) => {
  const sql = 'SELECT * FROM reservations WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de la récupération' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    
    res.json(result[0]);
  });
});

// Route pour toutes les autres requêtes (servir l'application frontend)
app.get('/server', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur serveur');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
// Route pour le formulaire de contact
app.post('/contact', (req, res) => {
    const { fullName, email, subject, message } = req.body;
    
    // Ici vous pouvez:
    // 1. Enregistrer dans la base de données
    const sql = `
        INSERT INTO contacts 
        (full_name, email, subject, message, created_at)
        VALUES (?, ?, ?, ?, NOW())
    `;
    
    db.query(sql, [fullName, email, subject, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erreur de base de données' 
            });
        }
        
        // 2. Envoyer un email (voir étape suivante)
        
        res.json({ 
            success: true, 
            message: 'Message reçu avec succès' 
        });
    });
});