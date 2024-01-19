const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const Model = require('../database/models');
const AppError = require('../utils/AppError');

const { users, tokens } = Model.sequelize.models;
const { tokenTypes } = require('../config/tokens');
const { verifyToken, generateTokenAuth } = require('./tokens');

const salt = bcrypt.genSaltSync(10);

const checkAvailableEmail = async (email) => {
  const dataEmail = await users.findOne({ where: { email } });
  if (dataEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email sudah digunakan');
  }
};

const checkAvailableUsername = async (userName, id) => {
  const existingUser = await users.findOne({ where: { userName } });
  if (existingUser) {
    if (existingUser.id !== id) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Username sudah digunakan');
    }
  }
};

const createUser = async (payload) => {
  const { fullName, email, password } = payload;
  await checkAvailableEmail(email);
  const user = await users.create({ fullName, email, password: bcrypt.hashSync(password, salt) });
  return user;
};

const updateUser = async (user, payload) => {
  const { id } = user;
  const { fullName, userName, birthDate } = payload;
  await checkAvailableUsername(userName, id);

  const updUser = await users.findByPk(id);
  await updUser.update({
    fullName,
    userName,
    birthDate,
  });

  return updUser;
};

const updatePassword = async (user, payload) => {
  const { id } = user;
  const { password } = payload;

  const updUser = await users.findByPk(id);
  await updUser.update({
    password: bcrypt.hashSync(password, salt) 
  });

  return updUser;
};

const getUser = async (user) => {
  const { id } = user;
  return await users.findByPk(id);
};

const getUserByEmail = async (email) => {
  return await users.findOne({ where: { email } });
};

const matchPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  const passwords = await bcrypt.compare(password, user.password);
  if (!password) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password Salah');
  }
  return passwords;
};

const login = async (email, password) => {
  const user = await getUserByEmail(email);
  const checkPassword = await matchPassword(email, password);
  if (!user || !checkPassword) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found');
  }
  return user;
};

const getUserById = async (id) => {
  const user = await users.findOne({ where: { id } });
  return user;
};

const refreshTokens = async (refreshToken) => {
  try {
    const refToken = await verifyToken(refreshToken, tokenTypes.REFRESH_TOKEN);
    const user = await getUserById(refToken.userId);
    if (!user) {
      throw new Error();
    }
    await refToken.destroy();
    return generateTokenAuth(user);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

const logout = async (refreshToken) => {
  const refToken = await tokens.findOne({
    where: {
      token: refreshToken,
      type: tokenTypes.REFRESH_TOKEN,
      blacklisted: false,
    },
  });
  if (!refToken) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tidak ditemukan');
  }

  await tokens.destroy({
    where: {
      token: refreshToken,
      type: tokenTypes.REFRESH_TOKEN,
      blacklisted: false,
    },
  });
};
module.exports = {
  createUser,
  updateUser,
  updatePassword,
  getUser,
  login,
  logout,
  refreshTokens,
};
