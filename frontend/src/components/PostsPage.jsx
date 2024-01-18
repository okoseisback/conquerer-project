import React, { useEffect, useState, useContext } from "react";
import ToDoList from "./todo/ToDoList";
import axios from "axios";

import AuthContext from "./context/AuthContext";
import MainLayout from "./Layouts/MainLayout";

import { useNavigate } from "react-router-dom";

const PostsPage = (props) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const getCategories = await axios.get(`http://localhost:3001/api/v1/categories`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setCategories(getCategories.data.result.category);

      const getPosts = await axios.get(`http://localhost:3001/api/v1/posts`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setPosts(getPosts.data.result.posts);
    };
    fetchData();
  }, [setCategories]);

  return (
    <MainLayout>
      {/* New Tweet section */}
      <div className="border-b border-gray-200 dark:border-gray-600 w-full py-3">
        {/* Search Input */}
        <div className="relative mx-4">
          <input
            className="bg-gray-100 dark:bg-white/10 dark:focus:bg-transparent w-full px-6 py-3 pl-12 rounded-full text-sm placeholder:text-gray-500"
            type="search"
            name="search"
            placeholder="Search Twitter"
          />
          <div className="absolute inset-y-0 left-4 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="inline w-5 h-5 text-gray-500 fill-current"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="text-sm font-medium text-center text-gray-500 mt-2 px-4 border-b border-gray-200 dark:text-gray-400">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <a
                href="/"
                className="inline-block p-4 text-twitter-600 border-b-2 border-twitter-600 rounded-t-lg active"
              >
                My Posts
              </a>
            </li>
            <li className="me-2">
              <a
                href="?cat=last-post"
                className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                aria-current="page"
              >
                Last Posts
              </a>
            </li>
            {
              categories.map(
                (category) =>
                (
                  <li className="me-2">
                    <a
                      href="?cat={category.slug}"
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                    >
                      {category.name_category}
                    </a>
                  </li>
                )
              )
            }
          </ul>
        </div>
      </div>

      {
        posts.map(
          (post) => (
            <a
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="cursor-pointer block border-b border-gray-200 dark:border-gray-600 w-full px-4 py-3 transition hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <div className="flex space-x-2 py-2">
                <div className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 font-normal text-sm">
                    {post.categories[0].name_category}
                  </p>
                  <p className="text-[15px] dark:text-white">
                    {post.title}
                  </p>
                  <p className="mt-2 text-[13px] text-gray-600 dark:text-gray-400">
                    {post.total_comment} comments
                  </p>
                </div>
                <div className="shrink-0" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blog/edit/${post.id}`)
                }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <g>
                      <circle cx={5} cy={12} r={2} />
                      <circle cx={12} cy={12} r={2} />
                      <circle cx={19} cy={12} r={2} />
                    </g>
                  </svg>
                </div>
              </div>
            </a>
          )
        )
      }
    </MainLayout>
  );
};

export default PostsPage;
