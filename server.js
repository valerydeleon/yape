const express         = require('express'); //Framework Express
const bodyParser      = require('body-parser'); //Parsea el post para obtener objetos json en el request
const levelup         = require('levelup'); // Base de datos
const morgan          = require('morgan'); // Sistema de logging (muestra en la cosa los request)
const morganjson      = require('morgan-json');
const apiUsers        = require('./api/users'); //Endpoints relacionados al User model

const app = express();
const db  = levelup('./api/users', {valueEncoding: 'json'});

const format = morganjson({
  short: ':method :url :status',
  length: ':res[content-length]',
  'response-time': ':response-time ms'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('public'));
app.use('/static', express.static(__dirname + '/src'))
app.use("/static", express.static(__dirname + '/node_modules'))
app.use("/app.js", express.static(__dirname + '/app.js'))

app.use(morgan(format));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + "/public/index.html");
// });

//saber donde se hace el request
// que metod utiliza la api (post)
//que indfo se necesita enviar en cada request
//parametrso para hacer un reqyest ajax
//url: http://localhost:3000/api/registerNumber
                                //  metodo post
//metodo HHTP: post
//data: "..." "terms:" "..."

let router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  // res.json({ name: 'yape-api',version: "0.0.1"});
});

app.use('/api',apiUsers(router,db));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server running on port '+port+'!');
});
