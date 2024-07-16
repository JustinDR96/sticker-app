import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./src/routes/userRoutes.js";


// Obtenez __filename et __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Servir les fichiers statiques du dossier 'dist' (le dossier de build de Vite)
app.use(express.static(path.join(__dirname, "dist")));

// Utiliser les routes utilisateur
app.use("/api", userRoutes);

// Toutes les autres routes renvoient le fichier index.html pour le routage côté client
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
