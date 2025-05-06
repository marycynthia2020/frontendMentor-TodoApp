import { useContext, useEffect, useState } from "react";
import check from "/icon-check.svg";
import cross from "/icon-cross.svg";
import moon from "/icon-moon.svg";
import sun from "/icon-sun.svg";
import { darkThemeProvider } from "./context/Themecontext";
import { nanoid } from "nanoid";

function App() {
  const [todoArray, setTodoArray] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [todos, setTodos] = useState(
    JSON.parse(localStorage?.getItem("todos")) || []
  );

  const [formData, setFormData] = useState({ todo: "" });
  const [currentTab, setCurrentTab] = useState("all");
  const [activeTodosCount, setActiveTodosCount] = useState();

  useEffect(() => {
    let hi = todos.filter(todo => !todo.isCompleted).length;
    console.log(hi);
  }, []);

  // for handling tabs
  useEffect(() => {
    if (currentTab === "all") {
      setTodoArray(todos);
    }
    if (currentTab === "active") {
      const activetodos = todos.filter(todo => !todo.isCompleted);
      let length = activetodos.length;
      console.log(length);
      setTodoArray(todos.filter(todo => !todo.isCompleted));
    }

    if (currentTab === "completed") {
      setTodoArray(todos.filter(todo => todo.isCompleted === true));
    }
  }, [currentTab]);

  const { darkTheme, setDarkTheme } = useContext(darkThemeProvider);
  const toggleDarkTheme = () => setDarkTheme(prev => !prev);

  const handleChange = e => {
    e.preventDefault();
    setFormData(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

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

  const handleClick = id => {
    const currentTodo = todoArray.map(todo => {
      if (id === todo.id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodoArray(currentTodo);
    localStorage.setItem("todos", JSON.stringify(currentTodo));
  };

  const handleCurrentTab = tab => setCurrentTab(tab);

  const handleCompleted = () => {
    const incompleteTodos = todoArray.filter(todo => !todo.isCompleted);
    setTodoArray(incompleteTodos);
  };

  return (
    <div
      className={
        darkTheme
          ? "main  bg-mobileDark md:bg-desktopDark"
          : "main  bg-mobileLight md:bg-desktopLight"
      }
    >
      <div className=" w-[90vw] lg:w-4/5 xl:w-3/5 max-w-[800px] mx-auto  h-[90vh] lg:h-[75%] ">
        <div className=" mb-10 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl tracking-[0.5em] text-white font-bold">
            TODO
          </h1>
          <img
            src={darkTheme ? sun : moon}
            alt=""
            onClick={toggleDarkTheme}
            className="cursor-pointer"
          />
        </div>
        <div
          className={
            darkTheme
              ? "mb-4 shadow-lg flex items-center gap-4 w-full p-4 bg-[#24283c] rounded-sm"
              : "mb-4 shadow-lg flex items-center gap-4 w-full p-4 bg-white rounded-sm"
          }
        >
          <div className="aspect-square w-10 h-10 rounded-full border-2 "></div>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              className=" outline-none w-full bg-transparent"
              placeholder="Currently typing "
              name="todo"
              value={formData.todo}
              onChange={handleChange}
            />
          </form>
        </div>

        <div className="max-h-[50%] overflow-auto shadow-lg">
          {todoArray.map(todo => (
            <div
              key={todo.id}
              className={
                darkTheme
                  ? "border-b flex items-center gap-4 w-full p-4 bg-[#24283c] rounded-sm"
                  : "border-b flex items-center gap-4 w-full p-4 bg-white rounded-sm"
              }
            >
              <div
                className={
                  todo.isCompleted
                    ? " aspect-square w-10 h-10 max-h-10 rounded-full border-2 bg-[#9b94ed] flex items-center justify-center"
                    : "aspect-square w-10 h-10 rounded-full border-2 flex items-center justify-center"
                }
                onClick={() => handleClick(todo.id)}
              >
                <img src={todo.isCompleted ? check : null} alt="" />
              </div>
              <div className={todo.isCompleted ? "done" : ""}>{todo.task}</div>
              <img src={cross} alt="" className="ml-auto" />
            </div>
          ))}
        </div>

        <div
          className={
            darkTheme
              ? "shadow-lg p-4 flex items-center justify-between gap-4 w-full bg-[#24283c] rounded-sm"
              : "shadow-lg p-4 flex items-center justify-between gap-4 w-full bg-white rounded-sm"
          }
        >
          <p>{}</p>
          <div className="hidden md:flex items-center justify-between gap-3">
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
              onClick={() => handleCurrentTab("completed")}
              className={currentTab === "completed" ? "active" : ""}
            >
              Completed
            </button>
          </div>
          <button onClick={handleCompleted}>Clear Completed</button>
        </div>
        {/* for mobile */}
        <div
          className={
            darkTheme
              ? " mt-4 flex items-center justify-between gap-3 md:hidden shadow-lg p-4 bg-[#24283c] rounded-sm"
              : " mt-4 flex items-center justify-between gap-3 md:hidden shadow-lg p-4 bg-white rounded-sm"
          }
        >
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
            onClick={() => handleCurrentTab("completed")}
            className={currentTab === "completed" ? "active" : ""}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
