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

// Connect to MongoDB
app.locals.dbConnected = false;
mongoDBCon()
    .then(() => {
        console.log('MongoDB connected successfully');
        app.locals.dbConnected = true;
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        // We're not exiting the process here, allowing the app to run even if DB connection fails
    });

console.log('MongoDB connection attempt initiated');

// Routes
try {
    app.use('/api/auth', authRoutes);
    app.use('/api/emailsequence', emailSequenceRoutes);
    console.log('Routes set up');
} catch (error) {
    console.error('Error setting up routes:', error);
}

// 404 handler
app.use((req, res) => {
    console.log('404 Not Found:', req.path);
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// If this file is run directly (not imported), start the server
if (import.meta.url === `file://${process.argv[1]}`) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

console.log('Server initialization complete');

export default app;
