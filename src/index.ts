import express from 'express';

const app = express();
app.set('view engine','ejs')
const port = 3001;

const uploadFileRoute = require('./routes/uploadFile');

app.use('/upload', uploadFileRoute);

app.listen(port, () => console.log(`Server running at the port ${port}`));


