const Model = require('../database/models');
const { comments } = Model.sequelize.models;

const addComment = async (user, payload) => {
  const { postId, body } = payload;
  const comment = await comments.create({ userId: user.id, postId, body });
  return comment;
};

module.exports = {
  addComment,
};
