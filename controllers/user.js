import User from '../db/models/User.js';
import crypto from 'cryptojs';
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
  const user = await User.findOne({ login: name });
  if (!user) {
    req.session.message = { type: 'error', message: 'Identifiant inconnu' };
    res.redirect('/login');
  }
  if (user.password !== crypto.SHA1(password).toString()) {
    req.session.toast = { type: 'error', message: 'Identifiants inconnu' };
    res.redirect('/login');
    return;
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { algorithm: 'HS256' });
  req.session.token = token;
  req.session.isConnected = true;
  req.session.message = { type: 'success', message: 'Connécté avec succès.' };
  res.redirect('/');
}

export function logout(req, res) {
  req.session.regenerate(() => {
    req.session.message = { type: 'success', message: 'Déconnecté avec succès' };
    res.redirect('/');
  });
}
