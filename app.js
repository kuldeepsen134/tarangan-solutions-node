const express = require('express')
const app = express();

require('dotenv').config();

const cors = require('cors')
const bodyParser = require('body-parser');

const morgan = require('morgan')
const passport = require("passport");

const cookieSession = require("cookie-session");


const { PORT } = require('./app/config/config');


const port = PORT;
const HOST = '192.168.0.23';



app.use(cors({
    origin: ["*",],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));



require('./app/controller/passport');


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());







app.use(bodyParser.json())

const { authJWT } = require('./app/middleware/auth');
const { handleError } = require('./app/utils/helper');
app.use(authJWT);

app.use(morgan('dev'));

require('./app/router/user')(app);
require('./app/router/auth')(app);
require('./app/router/address')(app);

require('./app/router/product/brand')(app);
require('./app/router/product/productCategory')(app);
require('./app/router/product/product')(app);

require('./app/router/wishList')(app);

require('./app/router/addToCart')(app);
require('./app/router/order')(app);







app.get('*', (req, res) => handleError('Hunnn smart!', 400, res,));



app.listen(port, HOST, () => console.log(`Server is running port on ${HOST}:${port}`))