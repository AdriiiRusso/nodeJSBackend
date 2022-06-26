import express from "express";
const router = express.Router();
import { UsuarioDao } from '../dao/UsuarioDao.js';
import { sendGmail } from "../notifications/gmail/EmailSender.js";
import { htmlNewUserTemplate } from "../notifications/gmail/htmltemplates/NewUserCreatedTemplate.js";

const userDao = new UsuarioDao();

// GET api/usuario/login
router.get('/login', async(req, res) => {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/login', {status: false})
    }
})

// POST api/usuario/login
router.post('/login', async(req, res) => {
    const {user, pass} = req.body;
    // Ugly user and pass validation below:
    if (process.env.DUMMYUSER === user && process.env.DUMMYPASS === pass) {
        req.session.login=true;
        res.redirect('/api/usuario')
    } else {
        req.session.login=false;
        res.redirect('/api/usuario/login')
    }
})

// GET api/usuario/signup
router.get('/signup', (req, res) => {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/signup', {status: false})
    }
})

// POST api/usuario/signup
router.post('/signup', async(req,res) => {
    const { body } = req;
    const newUser = await userDao.createUser(body);
    
    if (newUser) {
        const now = new Date();
        const newUserTemplateEmail = htmlNewUserTemplate(newUser._id, now.toLocaleString());
        await sendGmail('Nuevo usuario creado', newUserTemplateEmail);
        res.status(200).json({"success": "Usuario creado con el ID " + newUser._id})
    } else {
        res.status(400).json({"error": "Hubo un error al crear el usuario, por favor comprobar"})
    }
})

// GET api/usuario
router.get('/', async(req, res) => {
    res.render('pages/home', {status: req.session.login})
})

//GET api/usuario/logout
router.get('/logout', async(req, res) => {
    req.session.destroy( (err) => {
        if (err) {
            res.json(err);
        } else {
            res.render('pages/logout', {status: false});
        }
    })
})

export default router;