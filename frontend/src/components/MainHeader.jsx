import React from "react";
import SearchBar from "./shared/SearchBar";
import logo from "../assets/logo512.png";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const MainHeader = ({ getSearchInput }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    auth.logout();
    navigate("/");
  };
  return (
    <div className="container mx-auto flex flex-wrap gap-1 justify-center md:justify-between items-center text-xs sm:text-base py-2 px-4 flex-col sm:flex-row">
      <div className="flex items-center mr-2">
        Explorer
      </div>
    </div>
  );
};

export default MainHeader;
