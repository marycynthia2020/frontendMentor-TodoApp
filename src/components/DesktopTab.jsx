import React from 'react'

const DesktopTab = (props) => {
  return (
    <div className="hidden md:flex items-center justify-between gap-3 ">
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
  )
}

export default DesktopTab