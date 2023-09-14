import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "../App.css";
import { CryptoContext } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Navbar = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState("light-theme");

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const navigate = useNavigate();
  const { currency, setCurrency } = useContext(CryptoContext);

  function changeHandler(e) {
    setCurrency(e.target.value);
  }

  return (
    <div className="Navbar">
      <h2
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Crypto Buzz
      </h2>
      <div className="navbarRightSide">
        <label className="Label">
          Currency :
          <select
            className="Select"
            name="Currency"
            value={currency}
            onChange={changeHandler}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </label>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={30}
        />
      </div>
    </div>
  );
};

export default Navbar;
