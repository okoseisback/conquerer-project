import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import PostsPage from "./components/PostsPage";

import AccountPage from "./components/AccountPage";

import ToDoView from "./components/todo/ToDoView";
import TasksPage from "./pages/TasksPage";
import MainHeader from "./components/MainHeader";
import SearchResultPage from "./pages/SearchResultPage";
import { useCallback } from "react";
import AuthContext from "./components/context/AuthContext";
import LoginForm from "./components/Forms/LoginForm";
import { useAuth } from "./components/hooks/authHook";
import SignupForm from "./components/Forms/SignupForm";
import NewPostPage from "./components/NewPostPage";
import BlogDetailPage from "./components/BlogDetailPage";
import EditPostPage from "./components/EditPostPage";

function App() {
  const [todos, setTodos] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { token, login, userId, logout, userName } = useAuth();


  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
          userId: userId,
          userName: userName,
        }}
      >
        <Router>
          {token ? (

            <Routes>
              {todos.length ? (
                <Route
                  path="/"
                  element={<Navigate to={`/${todos[0]._id}/tasks`} replace />}
                />
              ) : (
                <Route path="/" element={<PostsPage />} />
              )}
         

              <Route
                path="/profile"
                element={
                  <AccountPage />
                }
              />

              <Route
                path="/blog/new"
                element={
                  <NewPostPage />
                }
              />
              <Route
                path="/blog/edit/:id"
                element={
                  <EditPostPage />
                }
              />
              <Route
                path="/blog/:blogSlug"
                element={
                  <BlogDetailPage />
                }
              />
              

            </Routes>

          ) : (
            <Routes>
              <Route path="/" element={<LoginForm />} />
            </Routes>
          )}
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
