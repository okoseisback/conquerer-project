import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");

  const login = useCallback((token, userId, fullName, userName) => {
    setToken(token);
    setUserId(userId);
    setFullName(fullName);
    setUserName(userName);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        userId: userId,
        userName: userName,
        fullName: fullName
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.token, storedData.userId, storedData.fullName, storedData.userName);
    }
  }, [login]);

  return { token, login, userId, logout, fullName, userName };
};
