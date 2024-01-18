import React, { useEffect, useState, useContext } from "react";
import ToDoList from "./todo/ToDoList";
import axios from "axios";

import AuthContext from "./context/AuthContext";
import MainLayout from "./Layouts/MainLayout";
import { useNavigate, useParams } from "react-router-dom";



const BlogDetailPage = (props) => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const { blogSlug } = useParams();

  const [post, setPost] = useState({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchData();
  }, [blogSlug]);

  const fetchData = async () => {
    const getPosts = await axios.get(`http://localhost:3001/api/v1/posts/${blogSlug}`);
    setPost(getPosts.data.result.posts);
  };

  const commentChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      postId: post.id,
      title_comment: "",
      short_desc: "",
      content: newComment
    };

    await axios
      .post("http://localhost:3001/api/v1/comments", data, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then((response) => {
        fetchData();
        alert("Yorum eklendi!");
      })
      .catch(() => {
        alert("Please Enter Valid Credentials");
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
              <p className="text-base text-gray-500 dark:text-gray-400">
                <span className="text-md font-bold text-gray-900 dark:text-white">
                  {post?.users?.fullName || ""}
                </span>  
                <span className="text-sm text-gray-700 mr-2 dark:text-gray-400">
                @{post?.users?.userName || ""} 
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {post.createdAt}
                </span>
              </p>
            </header>
            <p className="lead mb-6">
              {post.content}
            </p>
            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Comments ({post?.comments?.length || 0})
                </h2>
              </div>
              <form className="mb-6" onSubmit={submitHandler}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
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
                    <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                            {comment.users.fullName} <span className="ml-2 text-sm text-gray-400"> @{comment.users.userName}</span>
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {comment.createdAt}
                          </p>
                        </div>


                      </footer>
                      <p>
                        {comment.content}
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

export default BlogDetailPage;
