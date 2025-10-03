import User from '../db/models/User.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export function getLoginForm(req, res) {
  res.render('login');
}

export function getRegisterForm(req, res) {
  res.render('register');
}

export async function postLoginForm(req, res) {
  if (!req.body.name || !req.body.password) {
    req.session.message = {
      type: 'error',
      message: 'Merci de remplir tout les champs du formulaire',
    };

    res.redirect('/login');
    return;
  }

  const { name, password } = req.body;

  if (name.trim() === '' || password.trim() === '') {
    req.session.message = {
      type: 'error',
      message: 'Merci de remplir tout les champs du formulaire',
    };

    res.redirect('/login');
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    req.session.message = {
      type: 'error',
      message:
        'Le mot de passe doit comporter au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial',
    };
    return res.redirect('/login');
  }

  const user = await User.findOne({ email: name });

  if (!user) {
    req.session.message = { type: 'error', message: 'Identifiant inconnu' };
    res.redirect('/login');
  }

  const hashedInput = crypto
    .createHmac('sha256', process.env.PASSWORD_SECRET)
    .update(password)
    .digest('hex');

  if (user.password !== hashedInput) {
    req.session.toast = { type: 'error', message: 'Identifiants inconnu' };
    res.redirect('/login');
    return;
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    algorithm: 'HS256',
  });

  if (user.role === 'admin') {
    req.session.isAdmin = true;
  }
  req.session.token = token;
  req.session.isConnected = true;
  req.session.message = { type: 'success', message: 'Connécté avec succès.' };
  res.locals.isConnected = true;

  res.redirect('/');
}

export async function postRegisterForm(req, res) {
  const { firstName, lastName, email, password, passwordConfirmation } = req.body;

  if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
    req.session.message = {
      type: 'error',
      message: 'Merci de remplir tous les champs du formulaire',
    };
    return res.redirect('/register');
  }

  if (password !== passwordConfirmation) {
    req.session.message = {
      type: 'error',
      message: 'Les mots de passe ne correspondent pas',
    };
    return res.redirect('/register');
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    req.session.message = {
      type: 'error',
      message: 'Cet utilisateur existe deja',
    };
    return res.redirect('/register');
  }

  const hashedPassword = crypto
    .createHmac('sha256', process.env.PASSWORD_SECRET)
    .update(password)
    .digest('hex');

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  req.session.message = {
    type: 'success',
    message: 'Votre compte a été créé avec succès !',
  };

  res.redirect('/login');
}

export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur de déconnexion :', err);
      return res.redirect('/'); // ou une page d’erreur
    }
    res.locals.isConnected = false;
    res.locals.isAdmin = false;
    res.clearCookie('connect.sid'); // optionnel mais propre
    res.redirect('/login');
  });
}
