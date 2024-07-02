import express from 'express';

import { mongoDBCon } from './src/config/mongoDBCon.js';
import authRoutes from './src/api/routes/auth/auth.routes.js';
import emailSequenceRoutes from './src/api/routes/emailsequence/emailsequence.routes.js';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/emailsequence', emailSequenceRoutes);


// to run on production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
    })
}

const restart = () => mongoDBCon().then(() => {
    console.log('mongodb connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch(err => {
    console.log('something went wrong,server stopped ,', err);
})


restart();