import express from 'express';
import { mongoDBCon } from './src/config/mongoDBCon.js';
import authRoutes from './src/api/routes/auth/auth.routes.js';
import emailSequenceRoutes from './src/api/routes/emailsequence/emailsequence.routes.js';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

console.log('Starting server initialization...');

// Middleware
app.use(cors());
app.use(express.json());

console.log('Middleware set up');

// Connect to MongoDB
let dbConnected = false;
mongoDBCon()
    .then(() => {
        console.log('MongoDB connected successfully');
        dbConnected = true;
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
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

// Health check route
app.get('/api/health', (req, res) => {
    console.log('Health check route accessed');
    res.json({ status: 'ok', dbConnected });
});

// Static file serving for production
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
    console.log('Static file serving set up for production');
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

console.log('Server initialization complete');

export default app;
