import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { apiLimiter } from './middleware/rateLimiter.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import electionRoutes from './routes/electionRoutes.js';

// Connect to Database
connectDB();

const app = express();

//cors
const allowedOrigins = process.env.CLIENT_URL 
    ? process.env.CLIENT_URL.split(',').map(url => url.trim().replace(/\/$/, '')) 
    : [];

console.log('Allowed Origins:', allowedOrigins);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            
            const sanitizedOrigin = origin.replace(/\/$/, '');
            if (allowedOrigins.includes(sanitizedOrigin) || allowedOrigins.includes('*')) {
                callback(null, true);
            } else {
                console.log(`CORS blocked for origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
)

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/', apiLimiter);

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Election Guide Assistant API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/election', electionRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
