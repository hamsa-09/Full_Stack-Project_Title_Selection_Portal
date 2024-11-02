// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loginRouter = require('./routes/routing'); 
const internalRouter = require('./routes/internals');
const externalRouter = require('./routes/externals');
const guideRouter= require('./routes/guide');
const titleRouter=require('./routes/title');
const app = express();
const url = 'mongodb://localhost:27017/projectTitle'; 

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on('open', () => {
    console.log('Connected to MongoDB...');
});
app.use(cors({
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST','PATCH','DELETE']
}));

// Middleware
app.use(express.json());

app.use('/project', loginRouter);
app.use('/project', guideRouter);
app.use('/project', internalRouter);
app.use('/project', externalRouter);
app.use('/project', titleRouter);


// starting server
app.listen(9000, () => {
    console.log('Server started on port 9000');
});
