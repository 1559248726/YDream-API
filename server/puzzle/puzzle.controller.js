const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {User, Record} = require('./puzzle.model');
const config = require('../../config/config');

function tokenValidation(req, res, next) {
  jwt.verify(req.cookies.puzzle_token, config.jwtSecret, (err, data) => {
    if (err) {
      return res.send({message: 'token error'});
    }
    if (data._id === req.session.puzzle_id) {
      return next();
    }
    return res.send({message: 'token error'});
  });
}

async function register(req, res) {
  const {username, password, confirmPassword} = req.body;

  const findUsername = await User.findOne({username});
  if (findUsername) {
    return res.send({message: 'username duplicate'});
  }

  if (password !== confirmPassword) {
    return res.send({message: 'password error'});
  }
  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(req.body.password, salt);

  const register_ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/) ? req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0] : 'null';

  const user = new User({
    username,
    password: encryptPassword,
    register_date: new Date().getTime()
  });

  await user.save();

  return res.send({message: 'success'});
}

async function login(req, res) {
  const {password, username} = req.body;

  const user = await User.findOne({username});

  if (user) {
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      await User.update({_id: user._id}, {
        last_login_date: new Date().getTime(),
      });

      req.session.puzzle_id = user._id;

      const token = jwt.sign({
        _id: user._id
      }, config.jwtSecret, {expiresIn: 60 * 60 * 24 * 2});
      res.cookie('puzzle_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 2,
        httpOnly: false
      });
      return res.send({message: 'success'});
    }
    return res.send({message: 'password error'});
  }
  return res.send({message: 'username error'});
}

function logout(req, res) {
  req.session.puzzle_id = null;
  res.clearCookie('puzzle_token');

  return res.json({message: 'success'});
}

async function userGet(req, res) {
  const user = await User.findOne({_id: req.session.puzzle_id}, {username: 1, _id: 0})

  if (user) {
    return res.send({
      message: 'success',
      user
    });
  } else {
    return res.send({message: 'not login'});
  }
}

async function recordGet(req, res, next) {
  const {isUser} = req.query;

  const findOption = {}
  if (isUser && req.session.puzzle_id) {
    findOption.owner = req.session.puzzle_id
  }
  const findRecords = await Record.find(findOption, {
    time: 1,
    _id: 0,
    create_date: 1
  }).populate('owner', 'username -_id')
    .limit(10)
    .sort({
      time: 1,
      create_date: 1
    });

  if (findRecords) {
    return res.json({
      message: 'success',
      records: findRecords
    });
  }
}

async function recordCreate(req, res) {
  const {time} = req.body;

  if (time) {
    const record = new Record({
      owner: req.session.puzzle_id,
      time,
      create_date: new Date().getTime()
    });

    await record.save();

    return res.send({message: 'success'});
  } else {
    return res.send({message: 'time error'});
  }
}

module.exports = {
  tokenValidation,
  login,
  register,
  logout,
  userGet,
  recordGet,
  recordCreate
};
