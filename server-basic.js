const express = require('express');
const app = express();

app.get('/protegido', (req, res) => {
  const authHeader = req.headers.authorization;

  // Si el cliente no envía la cabecera, le respondemos que es obligatorio (401)
  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic');
    return res.status(401).send('Acceso denegado: Se requiere autenticación');
  }

  try {
    // El formato recibido es "Basic base64(usuario:password)"
    // Separamos la palabra 'Basic' del string en Base64
    const base64Credentials = authHeader.split(' ')[1];
    // Decodificamos de Base64 a texto plano
    const decodedString = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    // Separamos el usuario y la contraseña por los dos puntos ":"
    const [user, pass] = decodedString.split(':');

    // Validación de las credenciales obligatorias del ejercicio
    if (user === 'admin' && pass === '1234') {
      return res.send('¡Bienvenido al recurso protegido #1!');
    } else {
      return res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    return res.status(400).send('Formato de autenticación inválido');
  }
});

// Iniciamos en el puerto 3000 como indica la Tarea 1
app.listen(3000, () => {
  console.log('Servidor Basic Auth corriendo en http://localhost:3000');
});