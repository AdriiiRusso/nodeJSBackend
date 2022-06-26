import express from "express";
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';
import userRouter from './routes/user.js';
import otherRouter from './routes/other.js';
import session from 'express-session';
import {engine} from 'express-handlebars';
import path from 'path';
import {fileURLToPath} from 'url';
import mongoStore from 'connect-mongo';
import {Strategy} from 'passport-facebook';
import passport from "passport";
import minimist from 'minimist';
import logger from "./loggers/Log4jsLogger.js";
import loggerMiddleware from "./middlewares/routesLogger.middleware.js";
import compression from 'compression';

const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }
};

const { PORT } = minimist(process.argv.slice(2), options);

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos'],
    scope: ['email']
},
(accessToken, refreshToken, userProfile, done) => {
    return done(null, userProfile);
}))

passport.serializeUser((user, done) => {
    done(null, user)
})
//
passport.deserializeUser((id, done) => {
    done(null, id)
})

app.use(loggerMiddleware);

app.use(compression());

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGODB,
            options: {
                userNewParser: true,
                useUnifiedTopology: true,
            }
        }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 600000}
        
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
app.use('/api/usuario', userRouter);
app.use('/test', otherRouter);

app.use(passport.initialize());
app.use(passport.session());

app.get('/fb-login', async(req, res) => {
    res.render('pages/fb')
})

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/failLogin'
}))

app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
        logger.info(r.route.path)
    }
  });

app.get('/', (req,res) => {
    if(req.isAuthenticated()) {
        res.render('pages/home', {status: true, fbUserName: req.user.displayName, avatar: req.user.photos[0].value})
    } else {
        res.render('pages/home', {status: false})
    }
})

app.get('/fb-logout', (req, res) => {
    req.logout();
    res.redirect('/api/usuario')
})

app.all("*", (_req, res) => {
    res.status(404).json({"error": "Ruta inexistente"})
})

const server = app.listen(process.env.PORT, () => {
    logger.info(`Frontend: \t\t\t http://localhost:${PORT}/api/usuario`)
    logger.info(`Randoms en: \t\t\t http://localhost:${PORT}/test/randoms`)
    logger.info(`Información del sistema en: \t http://localhost:${PORT}/test/info`)
    logger.info(`Backend: \t\t\t http://localhost:${PORT}/api/productos\n\t\t\t\t\t\t\t\t\t http://localhost:${PORT}/api/carrito`)
})
    
server.on('error', (err) => logger.error(err));
