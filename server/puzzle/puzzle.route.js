const express = require('express');

const puzzleCtrl = require('./puzzle.controller');

const router = express.Router();

router.route('/register').post(puzzleCtrl.register);

router.route('/login').post(puzzleCtrl.login);

router.route('/logout').post(puzzleCtrl.logout);

router.route('/user').get(puzzleCtrl.tokenValidation, puzzleCtrl.userGet);

router.route('/record')

  .get(puzzleCtrl.recordGet)

  .post(puzzleCtrl.tokenValidation, puzzleCtrl.recordCreate);


module.exports = router;
