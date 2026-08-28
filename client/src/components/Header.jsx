import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaChartBar } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext.jsx";
import VersionInfo from "./VersionInfo";

const Header = ({ title }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="header-controls">
        <Link
          to="/dashboard"
          className="header-dashboard-link"
          title="Ver Dashboard"
        >
          <FaChartBar />
        </Link>
        <VersionInfo />
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={isDarkMode ? "Tema claro" : "Tema escuro"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

Header.defaultProps = {
  title: "BIA 2026",
};

export default Header;
