import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../components/context/AuthContext";
import MainLayout from "../components/layouts/MainLayout";

const PostPage = () => {
  const auth = useContext(AuthContext);
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const getPosts = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/id/${id}`);
    setPost(getPosts.data.result.posts);
  };

  const commentChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      postId: post.id,
      body: newComment
    };

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/comments`, data, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(() => {
        alert("Comment added successfully!");
        fetchData();
      })
      .catch(() => {
        alert("An unexpected error occurred!");
      });
  };

  return (
    <MainLayout>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="text-3xl font-extrabold leading-tight text-gray-900 lg:mb-2 lg:text-4xl dark:text-white">
                {post.title}
              </h1>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                    {post?.profile?.fullName} <span className="ml-2 text-sm text-gray-400"> @{post?.profile?.userName}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {post.createdAt}
                  </p>
                </div>
              </div>
            </header>
            <p className="lead mb-6">
              {post.body}
            </p>
            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Comments ({post?.comments?.length || 0})
                </h2>
              </div>
              <form className="mb-6" onSubmit={submitHandler}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label for="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows={6}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={commentChangeHandler}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Post comment
                </button>
              </form>
              {post?.comments?.length > 0 ?
                post.comments.map(
                  (comment) =>
                  (
                    <article key={comment.id} className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                            {comment.profile.fullName} <span className="ml-2 text-sm text-gray-400"> @{comment.profile.userName}</span>
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {comment.createdAt}
                          </p>
                        </div>
                      </footer>
                      <p>
                        {comment.body}
                      </p>
                    </article>
                  )
                ) : null
              }
            </section>
          </article>
        </div>
      </main>
    </MainLayout>
  );
};

export default PostPage;