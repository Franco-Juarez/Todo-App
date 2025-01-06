const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080', 'http://localhost:5000', 'http://localhost:8000'];

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    // Permitir el origen si está en la lista
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  } else {
    // Opcional: Rechazar solicitudes con un mensaje si no está permitido
    console.log(`Origen no permitido: ${origin}`);
  }

  // Continuar con la ejecución del middleware
  next();
};

export default corsMiddleware;