const express = require('express');
const path = require('path')
const app = express();

const indexRouter = require('./src/index.js');

app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});