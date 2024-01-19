const { posts, users, comments, sequelize } = require('../database/models');

const userProfileAttributes = ['id', 'fullName', 'userName', 'address', 'location', 'email'];

const getPosts = async (category) => {
  const where = category ? { category } : {};
  return posts.findAll({
    where,
    include: [
      {
        model: users,
        as: 'profile',
        attributes: userProfileAttributes,
      },
      {
        model: comments,
        as: 'comments',
        attributes: [],
      },
    ],
    attributes: [
      'id',
      'category',
      'userId',
      'title',
      'body',
      [sequelize.fn('COALESCE', sequelize.fn('COUNT', sequelize.col('comments.postId')), 0), 'totalComment'],
      'createdAt',
      'updatedAt',
    ],
    group: [
      'posts.id',
      'posts.category',
      'posts.userId',
      'posts.title',
      'posts.body',
      'posts.createdAt',
      'posts.updatedAt',
      'profile.id',
      'profile.userName',
      'profile.fullName',
    ],
  });
};

const addPosts = async (user, payload) => {
  const { id } = user;
  const { category, title, body } = payload;
  return posts.create({ userId: id, category, title, body });
};

const updatePost = async (user, postId, payload) => {
  const { id: userId } = user;
  const { title, body } = payload;

  return posts.update({ title, body }, {
    where: { id: postId, userId },
  });
};

const delPostById = async (postId, userId) => {
  const [deletedRowsCount] = await Promise.all([
    comments.update({ deletedAt: new Date() }, { where: { postId } }),
    posts.update({ deletedAt: new Date() }, { where: { id: postId, userId } }),
  ]);

  return deletedRowsCount.some((count) => count > 0);
};

const getPostsById = async (id) => {
  return posts.findOne({
    where: { id },
    include: [
      { model: users, as: 'profile', attributes: userProfileAttributes },
      {
        model: comments,
        as: 'comments',
        attributes: ['body', 'createdAt'],
        include: [{ model: users, as: 'profile', attributes: userProfileAttributes }],
      },
    ],
  });
};

const getPostsByUserId = async (id) => {
  return posts.findAll({
    where: { userId: id },
    include: [
      {
        model: users,
        as: 'profile',
        attributes: userProfileAttributes,
      },
      {
        model: comments,
        as: 'comments',
        attributes: [],
      },
    ],
    attributes: [
      'id',
      'category',
      'userId',
      'title',
      'body',
      [sequelize.fn('COALESCE', sequelize.fn('COUNT', sequelize.col('comments.postId')), 0), 'totalComment'],
      'createdAt',
      'updatedAt',
    ],
    group: [
      'posts.id',
      'posts.category',
      'posts.userId',
      'posts.title',
      'posts.body',
      'posts.createdAt',
      'posts.updatedAt',
      'profile.id',
      'profile.userName',
      'profile.fullName',
    ],
  });
};

const getPostsByLast = async () => {
  return posts.findAll({
    include: [
      { model: users, as: 'profile', attributes: userProfileAttributes },
      { model: comments, as: 'comments', attributes: [] },
    ],
    attributes: [
      'id',
      'category',
      'userId',
      'title',
      'body',
      [sequelize.fn('COALESCE', sequelize.fn('COUNT', sequelize.col('comments.postId')), 0), 'totalComment'],
      'createdAt',
      'updatedAt',
    ],
    group: [
      'posts.id',
      'posts.category',
      'posts.userId',
      'posts.title',
      'posts.body',
      'posts.createdAt',
      'posts.updatedAt',
      'profile.id',
      'profile.userName',
      'profile.fullName',
    ],
    order: [['createdAt', 'DESC']],
  });
};

module.exports = {
  getPosts,
  addPosts,
  updatePost,
  getPostsById,
  getPostsByUserId,
  delPostById,
  getPostsByLast,
};
