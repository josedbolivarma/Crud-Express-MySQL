import express from "express";
import employeesRoutes from './routes/employes.routes.js';
import indexRoutes from './routes/index.routes.js';
import { PORT } from "./config.js";
const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(employeesRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    });
});

app.listen(PORT);
console.log("Server running on port 3000");