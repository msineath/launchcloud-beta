'use strict';
const bcrypt = require('bcryptjs');
const { Validator, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if(Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },  
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail(value) {
          if(!Validator.isEmail(value)) {
            throw new Error('Must be email')
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    defaultScope: {
      attributes: {exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']}
    },
    scopes: {
      currentUser: {attributes: {exclude: ['hashedPassword']}},
      loginUser: {attributes: {}}
    }
  });
  
  User.prototype.toSafeObject = function() {
    const { id, username, email } = this;
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope(currentUser).findByPk(id);
  }

  User.login = async function({credential, password}) {
    const user = await User.scope('loginUser').findOne({where: {
      [Op.or]: {
        username: credential,
        email: credential
      }
    }});
    if(user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id)
    }
  }

  User.signup = async function({username, email, password}) {
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = await User.create({username, email, hashedPassword});
    return await User.scope('currentUser').findByPk(newUser.id);
  }
  
  User.associate = function(models) {
    // associations can be defined here
  };
  
  return User;
};