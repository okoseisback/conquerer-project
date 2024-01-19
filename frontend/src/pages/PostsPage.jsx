import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../components/context/AuthContext";
import MainLayout from "../components/layouts/MainLayout";
import CONST from '../components/constants';

const PostsPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(CONST.DEF_TAB_CATEGORY_NAME);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let baseApi = `${process.env.REACT_APP_BASE_URL}/posts`;

      switch (selectedCategory) {
        case CONST.CATEGORY_NAME.MY_POST:
          baseApi += "/my";
          break;
        case CONST.CATEGORY_NAME.LAST_POST:
          baseApi += "/last";
          break;
        case CONST.CATEGORY_NAME.BUSINESS:
          baseApi += `/?category=${CONST.CATEGORY_NAME.BUSINESS}`;
          break;
        case CONST.CATEGORY_NAME.MONEY:
          baseApi += `/?category=${CONST.CATEGORY_NAME.MONEY}`;
          break;
        case CONST.CATEGORY_NAME.TECHNOLOGY:
          baseApi += `/?category=${CONST.CATEGORY_NAME.TECHNOLOGY}`;
          break;
        case CONST.CATEGORY_NAME.ARTIFICAL_INTELLIGENCE:
          baseApi += `/?category==${CONST.CATEGORY_NAME.ARTIFICAL_INTELLIGENCE}`;
          break;
        default:
          break;
      }

      try {
        const response = await axios.get(baseApi, { headers: { Authorization: `Bearer ${auth.token}` } });
        setPosts(response.data.result.posts);
      } catch {
         alert("An unexpected error occurred!")
      }
    };

    fetchData();
  }, [selectedCategory, setPosts]);

  return (
    <MainLayout>
      <div className="border-b border-gray-200 dark:border-gray-600 w-full py-3">
        <div className="relative mx-4">
          <input
            className="bg-gray-100 dark:bg-white/10 dark:focus:bg-transparent w-full px-6 py-3 pl-12 rounded-full text-sm placeholder:text-gray-500"
            type="search"
            name="search"
            placeholder="Search"
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
            {CONST.DEF_TAB_CATEGORIES.map(
              (category) =>
              (
                <li key={category.name} className="me-2">
                  <a
                    onClick={() => setSelectedCategory(category.name)}
                    className={`cursor-pointer inline-block p-4 ${category.name === selectedCategory ? 'text-blue-600 border-blue-600' : ''} border-b-2 border-transparent rounded-t-lg hover:text-blue-700 hover:border-blue-700`}
                  >
                    {category.name}
                  </a>
                </li>
              )
            )
            }
          </ul>
        </div>
      </div>
      {posts.length > 0 ?
        posts.map(
          (post) => (
            <a
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className="cursor-pointer block border-b border-gray-200 dark:border-gray-600 w-full px-4 py-3 transition hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <div className="flex space-x-2 py-2">
                <div className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 font-normal text-sm">
                    {post.category}
                  </p>
                  <p className="text-[15px] font-bold">
                    {post.title}
                  </p>
                  <p className="mt-2 text-[13px] text-gray-600 dark:text-gray-400">
                    {post.totalComment} comments
                  </p>
                </div>
                {auth.userId === post.userId ? (
                  <div className="shrink-0" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/post/edit/${post.id}`)
                  }}>
                    <svg className="w-4 h-4 text-gray-800 hover:text-blue-500" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                      <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                    </svg>
                  </div>
                ) : null}
              </div>
            </a>
          )
        ) : (
          <div className="p-4 mx-4 my-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            There are no posts for this category!
          </div>
        )
      }
    </MainLayout>
  );
};

export default PostsPage;
