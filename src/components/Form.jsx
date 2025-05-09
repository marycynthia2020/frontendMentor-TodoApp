import React, { useContext, useEffect, useState } from "react";
import { darkThemeProvider } from "../context/Themecontext";
import { nanoid } from "nanoid";

const Form = ({ setTodoArray, todoArray }) => {
  const [formData, setFormData] = useState({ todo: "" });
  const { darkTheme } = useContext(darkThemeProvider);

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.todo) {
      const newTodo = {
        task: formData.todo,
        id: nanoid(),
        isCompleted: false,
      };
      setTodoArray(prev => [newTodo, ...prev]);
      setFormData({ todo: "" });
    }
  };

  // addng the todo to local storage after enter key is pressed
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoArray));
  }, [todoArray]);

  const handleChange = e => {
    e.preventDefault();
    setFormData(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div
      className={
        darkTheme
          ? "mb-4 md:mb-10 shadow-lg flex items-center gap-4 w-full p-4 bg-[#24283c] rounded-sm"
          : "mb-4 md:mb-10  shadow-lg flex items-center gap-4 w-full p-4 bg-white rounded-sm"
      }
    >
      <div className="aspect-square w-6 h-6 rounded-full border border-gray-500 "></div>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          className=" outline-none w-full bg-transparent"
          placeholder="Create a a new todo..."
          name="todo"
          value={formData.todo}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Form;
