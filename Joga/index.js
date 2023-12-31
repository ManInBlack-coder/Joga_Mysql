const express = require('express')
const app = express()

const path = require('path')

//add template engine 
const hbs = require('express-handlebars');
// setup template directory and files extensions
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.engine('hbs', hbs.engine ({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname+'/views/layouts/',
}))

// setup static public directory
app.use(express.static('public'));

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// create database connection

var con = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'qwerty',
  database: 'joga_mysql'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("connected to joga mysql");
});

//app start point

app.get('/', (req,res) => {
  let query = 'SELECT * FROM article';
  let articles = [];
  con.query(query,(err,result) => {
    if (err) {
      throw err
    } else {
      articles = result
      res.render('index', { articles:articles});
    }
  })
})

//show all articles - index page
app.get('/article/:slug', (req, res) => {
  let query = `SELECT author.name AS author, author_id AS author_id, article.image AS image, article.published AS published, article.name AS name, article.body AS body FROM article JOIN author ON article.author_id = author.id WHERE slug = "${req.params.slug}";`
  let article = [];
  con.query(query, [req.params.slug], (err, result) => {
      if (err) throw err
      article = result
      res.render('article',{ article: article });
  })
})


// Show article by this slug
app.get('./author/:id', (req, res) => {
  let query =  `SELECT author.name AS author, article.image AS image, article.name AS name, article.slug AS slug FROM article JOIN author ON article.author_id = author.id WHERE author_id = "${req.params.id}";`
  let articles = [];
  con.query(query, [req.params.id], (err, result) => {
      if (err) throw err
      articles = result
      author = result[0].author
      res.render('author',{ author: author, articles: articles });
  })
})

app.listen(3001, () => {
  console.log('app is started at https://localhost:3000');
});
