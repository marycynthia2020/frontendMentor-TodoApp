import React, { useContext } from "react";
import { darkThemeProvider } from "../context/Themecontext";

const MobileTab = ({setCurrentTab, currentTab}) => {
    const {darkTheme} = useContext(darkThemeProvider)
      const handleCurrentTab = tab => setCurrentTab(tab);
  return (
    <div
      className={
        darkTheme
          ? " mt-4 flex items-center justify-between gap-3 md:hidden shadow-lg p-4 bg-[#24283c] rounded-sm"
          : " mt-4 flex items-center justify-between gap-3 md:hidden shadow-lg p-4 bg-white rounded-sm"
      }
    >
      <button
        onClick={() =>handleCurrentTab("all")}
        className={currentTab === "all" ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={() => handleCurrentTab("active")}
        className={currentTab === "active" ? "active" : ""}
      >
        Active
      </button>
      <button
        onClick={() => handleCurrentTab("completed")}
        className={currentTab === "completed" ? "active" : ""}
      >
        Completed
      </button>
    </div>
  );
};

export default MobileTab;
