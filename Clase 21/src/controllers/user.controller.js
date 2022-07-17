import {UsuarioService} from '../services/usuario.service.js';

const usuarioService = new UsuarioService();

export async function logInView(req, res) {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/login', {status: false})
    }
}

export async function signUpView(req, res) {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/signup', {status: false})
    }
}

export async function signUp(req, res) {
    const { body } = req;
    const newUser = await usuarioService.createUser(body);

    if (newUser) {
        res.status(200).json({"success": "Usuario creado con el ID: " + newUser._id})
    } else {
        res.status(400).json({"error": "Por favor verificar los datos enviados en la petición"})
    }
}

export async function logIn(req, res) {
    const {user, pass} = req.body;
    const loggedUser = await usuarioService.loginUser({
        username: user,
        password: pass
    });

    if ((loggedUser) || (process.env.USER === user && process.env.PASS === pass)) {
        req.session.login=true;
        res.redirect('/api/usuario')
    } else {
        req.session.login=false;
        res.redirect('/api/usuario/login')
    }
}

export async function homeView(req, res) {
    res.render('pages/home', {status: req.session.login})
}

export async function logOutView(req, res) {
    if (!req.session.login) {
        res.redirect('/api/usuario')
    } else {
        req.session.destroy( (err) => {
            if (err) {
                res.json(err);
            } else {
                res.render('pages/logout', {status: false});
            }
        })
    }
}