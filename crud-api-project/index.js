const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students.routes');
const connectDb = require('./config/database.js');
const auth = require('./middleware/auth.js');
const userRoutes = require('./routes/users.routes.js');
const { MulterError } = require('multer');
const cors = require('cors');
const path = require('path');

connectDb();

app.use(express.urlencoded({ extended : false }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());

app.use('/api/users', userRoutes);

app.use(auth);

app.use('/api/students', studentRoutes);


// Error Handling Middleware
app.use((error, req, res, next) => {
    if(error instanceof MulterError) {
        return res.status(400).send(`Image Error:  ${error.message} : ${error.code}`);
    } else if(error) {
        return res.status(500).send(`Something went wrong:  ${error.message}`);
    }
    next();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})