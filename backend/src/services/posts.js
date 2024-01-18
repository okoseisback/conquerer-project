const { getCategoryById } = require('./categories');
const { addPostsTags } = require('./tags');
const Model = require('../database/models');
const db = require('../database/models');


const Sequelize = require('sequelize');

const { posts, users, categories, posts_categories, tags, comments } = Model.sequelize.models;

const getPosts = async () => {
  const post = await posts.findAll({
    include: [
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName', 'fullName'],
      },
       {
        model: comments,
        as: 'comments',
        attributes: [],
      },
    ],
    attributes: [
      'id', 
      'categoryId',
      'userId',
      'title',
      'slug',
      'short_desc',
      'content',
      'image',
      'createdAt',
      'updatedAt',
      [Sequelize.fn('COALESCE', Sequelize.fn('COUNT', Sequelize.col('comments.postId')), 0), 'total_comment'],
    ],
    group: ['comments.postId', 'posts.id', 'categories.id', 'users.id'],
  });
  return post;
};

const addPosts = async (user, payload) => {
  const { id } = user;
  const { categoryId, title, slug, short_desc, content } = payload;
  const post = await posts.create({ categoryId, userId: id, title, slug, short_desc, content });
  await posts_categories.create({
    postId: post.id,
    categoryId,
  });
  return post;
};

const getPostsById = async (id) => {
  const post = await posts.findOne({
    where: { id },
    include: [
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName'],
      },
      {
        model: tags,
        as: 'tags',
        through: {
          attributes: [],
        },
      },
    ],
  });
  return post;
};

const getPostsBySlug = async (slug) => {
  const post = await posts.findOne({
    where: { slug:slug },
    include: [ "comments",
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName', 'fullName'],
      },
      {
        model: tags,
        as: 'tags',
        through: {
          attributes: [],
        },
      },
      {
        model: comments,
        as: 'comments',
        attributes: ['content', 'createdAt'],
        include: [
          {
            model: users,
            as: 'users',
            attributes: ['id', 'userName', 'fullName'], 
          },
        ]
      },
    ],
  });
  return post;
};

const getPostsByUserId = async (id) => {
  const post = await posts.findAll({
    where: { userId:id },
    include: [ "comments",
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName', 'fullName'],
      },
      {
        model: tags,
        as: 'tags',
        through: {
          attributes: [],
        },
      },
      {
        model: comments,
        as: 'comments',
        attributes: ['content', 'createdAt'],
        include: [
          {
            model: users,
            as: 'users',
            attributes: ['id', 'userName', 'fullName'], 
          },
        ]
      },
    ],
  });
  return post;
};

const delPostById = async (id) => {
  await comments.destroy({
    where: {
      postId: id
    },
  });

  const post = await posts.destroy({
    where: {
      id: id
    },
  }).then((deletedRows) => {
    if (deletedRows > 0) {
      return true;
    } else {
      return false;
    }
  })
  .catch((error) => {
    return false;
  });
  return post;
};

module.exports = {
  getPosts,
  addPosts,
  getPostsById,
  getPostsBySlug,
  getPostsByUserId,
  delPostById
};
