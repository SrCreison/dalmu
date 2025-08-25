const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Rota inicial - O frontend vai linkar para cá
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

// Rota de callback - Google redireciona para cá após o login
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    // Usuário autenticado com sucesso! (req.user é fornecido pelo Passport)
    const payload = {
      id: req.user._id,
      displayName: req.user.displayName,
      image: req.user.image,
    };

    // Gera o token JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Redireciona de volta para o frontend, passando o token como parâmetro de URL
    res.redirect(`${process.env.CLIENT_REDIRECT_URL}?token=${token}`);
  }
);

module.exports = router;
