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
  const [todos, setTodos] = useState(todoArray);
  const [formData, setFormData] = useState({ todo: "" });
  const [currentTab, setCurrentTab] = useState("all");
  const [activeTodosCount, setActiveTodosCount] = useState();

  // for current number of active
  useEffect(() => {
    setActiveTodosCount(todoArray.filter(todo => !todo.isCompleted).length);
  }, [todoArray]);

  // for handling tabs
  useEffect(() => {
    if (currentTab === "all") {
      setTodos(todoArray);
    }
    if (currentTab === "active") {
      setTodos(todoArray.filter(todo => !todo.isCompleted));
    }

    if (currentTab === "completed") {
      setTodos(todoArray.filter(todo => todo.isCompleted === true));
    }
  }, [currentTab, todoArray]);

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
      setTodos(prev => [newTodo, ...prev]);
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
    setTodos(currentTodo);
  };

  const handleCurrentTab = tab => setCurrentTab(tab);

  const handleCompleted = () => {
    const incompleteTodos = todoArray.filter(todo => !todo.isCompleted);
    setTodoArray(incompleteTodos);
    setTodos(incompleteTodos);
  };
  const handleDelete = (id) => {
    const todosLeft = todoArray.filter(todo => todo.id !== id)
    setTodoArray(todosLeft)
    setTodos(todosLeft)
  }

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
              ? "mb-4 shadow-lg flex items-center gap-4 w-full p-6 bg-[#24283c] rounded-sm"
              : "mb-4 shadow-lg flex items-center gap-4 w-full p-6 bg-white rounded-sm"
          }
        >
          <div className="aspect-square w-6 h-6 rounded-full border "></div>
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

        <div className="max-h-[60%] overflow-auto shadow-lg">
          {todos.length>0? todos.map(todo => (
            <div
              key={todo.id}
              className={
                darkTheme
                  ? "border-b flex items-center gap-4 w-full p-6 bg-[#24283c] rounded-sm task shadow-lg"
                  : "border-b flex items-center gap-4 w-full p-6 bg-white rounded-sm task shadow-lg"
              }
            >
              <div
                className={
                  todo.isCompleted
                    ? " circle gradient "
                    : "circle"
                }
                onClick={() => handleClick(todo.id)}
              >
                <img src={todo.isCompleted ? check : null} alt="" />
              </div>
              <div className={todo.isCompleted ? "done" : ""}>{todo.task}</div>
              <img src={cross} alt="" className="ml-auto md:hidden delete " onClick={() => handleDelete(todo.id)}/>
            </div>
          )): currentTab !== "all"? <p className={darkTheme?"p-4 bg-[#24283c] mb-2":"p-4 bg-white mb-2"}>No {currentTab} items</p>:""}
        </div>

        <div
          className={
            darkTheme
              ? "shadow-lg p-4 flex items-center justify-between gap-4 w-full bg-[#24283c] rounded-sm"
              : "shadow-lg p-4 flex items-center justify-between gap-4 w-full bg-white rounded-sm"
          }
        >
          <p>
            {activeTodosCount <= 0
              ? "No item Left"
              : activeTodosCount === 1
              ? "1 Item Left"
              : activeTodosCount + " Items Left"}
          </p>
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
