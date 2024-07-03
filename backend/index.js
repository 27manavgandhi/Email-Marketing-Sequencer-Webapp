import express from 'express';
import { mongoDBCon } from './src/config/mongoDBCon.js';
import authRoutes from './src/api/routes/auth/auth.routes.js';
import emailSequenceRoutes from './src/api/routes/emailsequence/emailsequence.routes.js';
import cors from 'cors';

const app = express();

console.log('Starting server initialization...');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Middleware set up');

// Health check route
app.get('/api/health', (req, res) => {
    console.log('Health check route accessed');
    res.json({ status: 'ok', message: 'Server is running', dbStatus: app.locals.dbConnected ? 'connected' : 'disconnected' });
});

// Debug route
app.use('*', (req, res, next) => {
    console.log('Accessed path:', req.method, req.path);
    next();
});

// Connect to MongoDB
app.locals.dbConnected = false;
mongoDBCon()
    .then(() => {
        console.log('MongoDB connected successfully');
        app.locals.dbConnected = true;
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

console.log('MongoDB connection attempt initiated');

// Routes
console.log('Setting up routes...');
app.use('/api/auth', authRoutes);
app.use('/api/emailsequence', emailSequenceRoutes);
console.log('Routes set up');

// 404 handler
app.use((req, res) => {
    console.log('404 Not Found:', req.method, req.path);
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

console.log('Server initialization complete');

export default app;
