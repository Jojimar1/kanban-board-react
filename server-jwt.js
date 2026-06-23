const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const SECRET_KEY = "clave_maestra_super_secreta";

// 1. Ruta de Login: Genera el token
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "alumno" && password === "web2026") {
    const token = jwt.sign({ user: username, role: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } else {
    return res.status(401).send("Login fallido");
  }
});

// 2. Ruta protegida: Verifica el token
app.get("/api/datos", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send("Token requerido");
  }

  const token = authHeader.split(" ")[1]; // Formato "Bearer TOKEN"

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send("Token inválido");
    }
    return res.json({
      mensaje: "Acceso concedido",
      datos: [1, 2, 3],
    });
  });
});

app.listen(4000, () => {
  console.log("Servidor JWT corriendo en http://localhost:4000");
});
