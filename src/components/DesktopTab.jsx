import React from 'react'

const DesktopTab = ({setCurrentTab, currentTab}) => {
    const handleCurrentTab = tab => setCurrentTab(tab);
  return (
    <div className="hidden md:flex items-center justify-between gap-3 ">
    <button
      onClick={() => handleCurrentTab("all")}
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
      onClick={() =>handleCurrentTab("completed")}
      className={currentTab === "completed" ? "active" : ""}
    >
      Completed
    </button>
  </div>
  )
}

export default DesktopTab