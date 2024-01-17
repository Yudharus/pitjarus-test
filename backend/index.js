import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sumRoutes from './routes/sums.js';

const app = express();

dotenv.config();
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(sumRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to server')
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})


