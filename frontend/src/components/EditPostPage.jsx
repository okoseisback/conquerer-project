import React, { useEffect, useState, useContext } from "react";
import ToDoList from "./todo/ToDoList";
import axios from "axios";

import AuthContext from "./context/AuthContext";
import MainLayout from "./Layouts/MainLayout";
import { useNavigate, useParams } from "react-router-dom";

const EditPostPage = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const getCategories = await axios.get(`http://localhost:3001/api/v1/categories`);
      setCategories(getCategories.data.result.category);
    };
    fetchData();
  }, [setCategories]);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      tagId: 1,
      categoryId: selectedCategory,
      title: title,
      content: content,
      userId: 1,
      slug: "sample-slug4m",
      short_desc: "Short Description",
    };


    await axios
      .post("http://localhost:3001/api/v1/posts", data, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then((response) => {
        alert("Ekleme başarılı!");
        navigate('/');

      })
      .catch(() => {
        alert("Please Enter Valid Credentials");
      });
  };

  const deleteHandler = async (e) => {
    e.preventDefault();

    const data = {
      tagId: 1,
      categoryId: selectedCategory,
      title: title,
      content: content,
      userId: 1,
      slug: "sample-slug4m",
      short_desc: "Short Description",
    };


    await axios
      .delete(`http://localhost:3001/api/v1/posts/del/${id}`, null, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then((response) => {
        alert("Silme başarılı!");
        navigate('/');

      })
      .catch(() => {
        alert("Please Enter Valid Credentials");
      });
  };

  return (
    <MainLayout>

      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            New Post
          </h2>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue=""
                  placeholder=""
                  required=""
                  value={title}
                  onChange={titleChangeHandler}
                />
              </div>
              <div className="sm:col-span-2">
                <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                <textarea
                  id="content"
                  name="content"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  value={content}
                  onChange={contentChangeHandler}

                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an category</label>
                <select
                  id="category"
                  name="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedCategory}
                  onChange={categoryChangeHandler}
                >
                  <option selected>Choose a category</option>
                  {
                    categories.map(
                      (category) =>
                      (
                        <option value={category.id}> {category.name_category}</option>
                      )
                    )
                  }
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update
              </button>
              <button
                onClick={deleteHandler}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </section>

    </MainLayout>
  );
};

export default EditPostPage;
