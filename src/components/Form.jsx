import React, { useContext } from "react";
import { darkThemeProvider } from "../context/Themecontext";

const Form = (props) => {
    const {darkTheme} = useContext(darkThemeProvider)
  return (
    <div
      className={
        darkTheme
          ? "mb-4 md:mb-10 shadow-lg flex items-center gap-4 w-full p-4 bg-[#24283c] rounded-sm"
          : "mb-4 md:mb-10  shadow-lg flex items-center gap-4 w-full p-4 bg-white rounded-sm"
      }
    >
      <div className="aspect-square w-6 h-6 rounded-full border border-gray-500 "></div>
      <form onSubmit={props.handleSubmit} className="w-full">
        <input
          type="text"
          className=" outline-none w-full bg-transparent"
          placeholder="Currently typing "
          name="todo"
          value={props.formData.todo}
          onChange={props.handleChange}
        />
      </form>
    </div>
  );
};

export default Form;
