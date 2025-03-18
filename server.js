// Importar las dependencias
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

// Crear una instancia de Express
const app = express();
const PORT = 3000; // Puerto en el que correrá el servidor

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors());

// Ruta para obtener los precios de las criptomonedas
app.get('/api/crypto', async (req, res) => {
    try {
        // Hacer la solicitud a la API de CoinGecko
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd');
        const data = await response.json();
        res.json(data); // Enviar los datos al frontend
    } catch (error) {
        console.error('Error al obtener los precios de las criptomonedas:', error);
        res.status(500).json({ error: 'No se pudieron obtener los precios de las criptomonedas' });
    }
});

// Ruta para obtener el valor del dólar en Argentina
app.get('/api/dolar', async (req, res) => {
    try {
        // Hacer la solicitud a la API de DolarAPI
        const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
        const data = await response.json();
        res.json(data); // Enviar los datos al frontend
    } catch (error) {
        console.error('Error al obtener el valor del dólar:', error);
        res.status(500).json({ error: 'No se pudo obtener el valor del dólar' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:5500`);
});