import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initSockets } from './sockets/socketHandler.js';

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Initialize Socket.io
initSockets(server);

// Security & Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  ENV.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5201',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5201',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser agents or curl requests without origin
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      (ENV.NODE_ENV === 'development' && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
    ) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (ENV.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate Limiter for API endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Mount API Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = ENV.PORT;
server.listen(PORT, () => {
  console.log(`[ROOMMATE Server] Running in ${ENV.NODE_ENV} mode on port ${PORT}`);
  console.log(`[ROOMMATE Server] Health Check: http://localhost:${PORT}/api/health`);
});

export { app, server };
