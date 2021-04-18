const mongoose = require('mongoose');

const Types = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  username: {
    type: Types.String,
    // unique: true,
    // required: true,
    minlength: 2,
    maxlength: 20,
    description: '用户名，不允许重复'
  },
  password: {
    type: Types.String,
    // required: true,
    description: '密码，加密存储'
  },
  register_date: {
    type: Types.Number,
    description: '注册时间'
  },
  last_login_date: {
    type: Types.Number,
    description: '最后登录时间'
  },
});

const RecordSchema = new mongoose.Schema({
  owner: {
    type: Types.ObjectID,
    ref: 'puzzle_user',
    description: '记录所有者'
  },
  time: {
    type: Types.Number,
    description: '所用时间'
  },
  create_date: {
    type: Types.Number,
    description: '创建时间'
  },
});

UserSchema.method({});

UserSchema.statics = {};

module.exports = {
  User: mongoose.model('puzzle_user', UserSchema),
  Record: mongoose.model('puzzle_record', RecordSchema),
};
