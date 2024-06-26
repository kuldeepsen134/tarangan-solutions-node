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


app.use(cors({
	origin: ['http://localhost:3000', 'http://localhost:3001', 'https://tarangan-admin.netlify.app', 'https://tarangan-client.netlify.app'],
	credentials: true,
	methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'],
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

require('./app/router/product/product')(app);
app.use(authJWT);

app.use(morgan('dev'));

require('./app/router/user')(app);
require('./app/router/agency')(app);


require('./app/router/auth')(app);
require('./app/router/address')(app);

require('./app/router/product/brand')(app);
require('./app/router/product/productCategory')(app);


require('./app/router/wishList')(app);

require('./app/router/addToCart')(app);
require('./app/router/order')(app);


app.get('*', (req, res) => handleError('Hunnn smart!', 400, res,));


app.listen(port, () => console.log(`Server is running port on:${port}`))