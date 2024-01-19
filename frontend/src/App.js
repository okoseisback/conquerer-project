import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AuthContext from "./components/context/AuthContext";
import { useAuth } from "./components/hooks/authHook";

import PostsPage from "./pages/PostsPage";
import AccountPage from "./pages/AccountPage";
import NewPostPage from "./pages/NewPostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import LoginForm from "./pages/LoginPage";
import SignupForm from "./pages/RegisterPage";

function App() {
  const { token, login, userId, logout, fullName, userName } = useAuth();

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
          fullName: fullName
        }}
      >
        <Router>
          {token ? (
            <Routes>
              <Route path="/" element={<PostsPage />} />
              <Route
                path="/profile"
                element={
                  <AccountPage />
                }
              />
              <Route
                path="/post/new"
                element={
                  <NewPostPage />
                }
              />
              <Route
                path="/post/edit/:id"
                element={
                  <EditPostPage />
                }
              />
              <Route
                path="/post/:id"
                element={
                  <PostPage />
                }
              />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<LoginForm />} />
            </Routes>
          )}
          <Routes>
            <Route path="/register" element={<SignupForm />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
