import React, { useContext } from "react";
import { darkThemeProvider } from "../context/Themecontext";

const MobileTab = (props) => {
    const {darkTheme} = useContext(darkThemeProvider)
  return (
    <div
      className={
        darkTheme
          ? " mt-4 flex items-center justify-between gap-3 md:hidden shadow-lg p-4 bg-[#24283c] rounded-sm"
          : " mt-4 flex items-center justify-between gap-3 md:hidden shadow-lg p-4 bg-white rounded-sm"
      }
    >
      <button
        onClick={() => props.handleCurrentTab("all")}
        className={props.currentTab === "all" ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={() => props.handleCurrentTab("active")}
        className={props.currentTab === "active" ? "active" : ""}
      >
        Active
      </button>
      <button
        onClick={() => props.handleCurrentTab("completed")}
        className={props.currentTab === "completed" ? "active" : ""}
      >
        Completed
      </button>
    </div>
  );
};

export default MobileTab;
