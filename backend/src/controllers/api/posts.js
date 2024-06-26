const httpStatus = require('http-status');
const { postService } = require('../../services');
const AppError = require('../../utils/AppError');
const catchError = require('../../utils/catchError');
const { errorMsg } = require('../../constants');

const getPosts = catchError(async (req, res) => {
  const { category } = req.query;
  const posts = await postService.getPosts(category);
  res.status(200).json({
    success: true,
    result: {
      posts,
    },
  });
});

const addPosts = catchError(async (req, res) => {
  const { user } = req;
  const posts = await postService.addPosts(user, req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    result: {
      posts,
    },
  });
});

const updatePost = catchError(async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const posts = await postService.updatePost(user, id, req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    result: {
      posts,
    },
  });
});

const getPostsById = catchError(async (req, res) => {
  const posts = await postService.getPostsById(req.params.id);
  if (!posts) {
    throw new AppError(httpStatus.NOT_FOUND, errorMsg.ID_NOT_FOUND);
  }
  res.status(200).json({
    success: true,
    result: {
      posts,
    },
  });
});

const getPostsBySlug = async (req, res) => {
  const { slug } = req.params;
  const posts = await postService.getPostsBySlug(slug);
  res.status(201).json({
    success: true,
    result: {
      posts,
    },
  });
}

const getPostsByUserId = async (req, res) => {
  const { id } = req.params;
  const posts = await postService.getPostsByUserId(id);
  res.status(201).json({
    success: true,
    result: {
      posts,
    },
  });
}

const getPostsByMy = async (req, res) => {
  const { user } = req;
  const { id } = user;

  const posts = await postService.getPostsByUserId(id);
  res.status(201).json({
    success: true,
    result: {
      posts,
    },
  });
}

const getPostsByLast = async (req, res) => {
  const posts = await postService.getPostsByLast();
  res.status(201).json({
    success: true,
    result: {
      posts,
    },
  });
}

const delPostById = async (req, res) => {
  const { id: postId } = req.params;
  const { user } = req;
  const { id: userId } = user;

  const posts = await postService.delPostById(postId, userId);
  res.status(201).json({
    success: true,
    result: {
      posts,
    },
  });
}

module.exports = {
  getPosts,
  addPosts,
  updatePost,
  getPostsById,
  getPostsBySlug,
  getPostsByUserId,
  delPostById,
  getPostsByMy,
  getPostsByLast
};
