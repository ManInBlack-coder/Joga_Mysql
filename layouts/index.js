const express = require('express')
const app = express()

const path = require('path')

//add template engine 
const hbs = require('express-handlebars');
// setup template directory and files extensions
app.set('views',path.join(__dirname,'views'));
app.set('views engine','hbs');
app.engine('hbs', hbs.engine ({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir:__dirname+'/views/layouts/',
}))


const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// create database connection

var con = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'qwerty',
  database: 'joga_mysql'
} )

con.connect(function(err) {
  if (err) throw err;
  console.log("connected to joga mysql");
} )

//app start point

app.listen(3000, () => {
  console.log('app is started at http://localhost:3000')
});