import express from 'express';
import taskRoutes from './routes/tasksRoutes.js';
import corsMiddleware from './middleware/cors.js';

const app = express();

app.disable('x-powered-by')
const PORT = process.env.PORT ?? 3000

// Middleware para incorporar el cors
app.use(corsMiddleware);

app.use(express.json());
// Usar el router de tareas para manejar las rutas de /tasks
app.use('/api', taskRoutes);
app.use('/', (req, res) => {
  res.header('Content-Type', 'text/html')
  res.status(200).send('<h1>Bienvenido a la API</h1>')
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
