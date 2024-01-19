import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../components/context/AuthContext";
import MainLayout from "../components/layouts/MainLayout";
import axios from "axios";

const PostsPage = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [maxDate, setMaxDate] = useState('');

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayDate = `${year}-${month}-${day}`;

    setMaxDate(todayDate);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getUser = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const { fullName, userName, birthDate } = getUser.data.result;
      setFullName(fullName);
      setUserName(userName);
      setBirthDate(birthDate.split('T')[0]);
    };
    fetchData();
  }, [setFullName, setUserName, setBirthDate]);

  const fullNameChangeHandler = (e) => {
    setFullName(e.target.value);
  };

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const birthDateChangeHandler = (e) => {
    setBirthDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName.length <= 1) {
      alert("Fullname required!");
      return;
    }

    if (userName.length <= 1) {
      alert("Username required!");
      return;
    }

    const data = {
      fullName,
      userName,
      birthDate
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/update/user`, data, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(() => {
        auth.login(auth.token, auth.userId, fullName, userName);
        alert("User updated successfully!");
      })
      .catch(() => {
        alert("An unexpected error occurred!");
      return;
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.length <= 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    if (confirmPassword.length <= 8) {
      alert("Confirm password must be at least 8 characters!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirmation password did not match!");
      return;
    }

    const data = {
      password: password,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/update/user/password`, data, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(() => {
        alert("User password updated successfully!");
        auth.logout();
        navigate("/");
      })
      .catch(() => {
        alert("An unexpected error occurred!");
        return;
      });
  };

  return (
    <MainLayout>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Pesonal Info
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fullname
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={fullName}
                  onChange={fullNameChangeHandler}
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={userName}
                  onChange={userNameChangeHandler}
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  max={maxDate}
                  name="birthDate"
                  id="birthDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={birthDate}
                  onChange={birthDateChangeHandler}
                  required=""
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Security
          </h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required=""
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="block text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  <svg
                    className="w-5 h-5 mr-1 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete My Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default PostsPage;
