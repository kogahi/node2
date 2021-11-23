const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const router = require('./routes/index');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
// テンプレートエンジンの指定
app.set('view engine', 'ejs');
app.use('/', router);

app.listen(3000);