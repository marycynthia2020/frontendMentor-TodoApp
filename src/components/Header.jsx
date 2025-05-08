import React, { useContext } from "react";
import { darkThemeProvider } from "../context/Themecontext";
import moon from "/icon-moon.svg";
import sun from "/icon-sun.svg";

const Header = (props) => {
  const { darkTheme } = useContext(darkThemeProvider);
  return (
    <div className=" mb-10 md:mb-16 flex justify-between items-center">
      <h1 className="text-3xl md:text-4xl tracking-[0.5em] text-white font-bold">
        TODO
      </h1>
      <img
        src={darkTheme ? sun : moon}
        alt=""
        onClick={props.toggleDarkTheme}
        className="cursor-pointer"
      />
    </div>
  );
};

export default Header;
