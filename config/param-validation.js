const Joi = require('joi');
const httpStatus = require('http-status');
const APIError = require('../server/helpers/APIError');

module.exports = {
  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      // email: Joi.string().email().required(),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/).required()
    }
  },

  // POST /api/auth/register
  register: {
    body: {
      username: Joi.string().regex(/^[a-zA-Z0-9_-]{4,16}$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/).required(),
      confirmPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/).required(),
    }
  },

  // POST /api/sendEmail
  sendCode: {
    body: {
      type: Joi.number().integer().min(0).max(1).required(),
      email: Joi.string().email().required()
    }
  },

  // POST /api/user
  createUser: {
    body: {
      email: Joi.string().email().required().error(new APIError('email invalidation', httpStatus.BAD_REQUEST, true)),
      // eslint-disable-next-line no-useless-escape,max-len
      password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\`\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\{\}\|\[\]\:\;\'\<\>\?\,\.]).{8,32}$/).required(),
      // eslint-disable-next-line max-len
      mobile: Joi.string().regex(/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/).required(),
    }
  },

  // UPDATE /api/user
  updateUser: {
    body: {
      username: Joi.string().min(2).max(20),
      // eslint-disable-next-line max-len
      mobile: Joi.string().regex(/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/),
      gender: Joi.number().integer().min(0).max(2),
      avatar: Joi.string(),
    }
  },

  // createAddress: {
  //   longlat: Joi.string(),
  //   addressCode: Joi.number().min(100000).max(999999),
  //   location: Joi.string(),
  //   detailed: Joi.string().min(2).max(15),
  // },
  //
  // createOrganization: {
  //   body: {
  //     longlat: Joi.string(),
  //     addressCode: Joi.number().min(100000).max(999999),
  //     location: Joi.string(),
  //     detailed: Joi.string().min(2).max(15),
  //     organ_name: Joi.string().min(1).max(9).required(),
  //     sub_organ: Joi.string().max(9),
  //     description: Joi.string().min(1).max(50).required(),
  //   }
  // },
  //
  // updateInfo: {
  //   body: {
  //     title: Joi.string().min(1).max(15).required(),
  //     content: Joi.string().min(1).max(50).required(),
  //     other_info: {
  //       original_price: Joi.number().required(),
  //       present_price: Joi.number().required(),
  //       start_time: Joi.string().required(),
  //       end_time: Joi.string().required()
  //     }
  //   }
  // }
};
