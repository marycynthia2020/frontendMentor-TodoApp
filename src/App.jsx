import { useContext, useEffect, useState } from "react";
import { darkThemeProvider } from "./context/Themecontext";
import { nanoid } from "nanoid";
import TodoComponent from "./components/TodoComponent";
import MobileTab from "./components/MobileTab";
import DesktopTab from "./components/DesktopTab";
import Header from "./components/Header";
import Form from "./components/Form";
import { DragDropContext } from "@hello-pangea/dnd";

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

  // adding todos to list when enter is pressed
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
  const handleDelete = id => {
    const todosLeft = todoArray.filter(todo => todo.id !== id);
    setTodoArray(todosLeft);
    setTodos(todosLeft);
  };

  // drag n drop
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.draggableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newTodos = Array.from(todos);
    const [reOrderedItem] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, reOrderedItem);
    setTodos(newTodos);
    setTodoArray(newTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={
          darkTheme
            ? "main  bg-mobileDark md:bg-desktopDark "
            : "main  bg-mobileLight md:bg-desktopLight"
        }
      >
        <div className=" w-[90vw] lg:w-4/5 xl:w-3/5 max-w-[800px] mx-auto  h-[90vh] lg:h-[75vh] ">
          <Header toggleDarkTheme={toggleDarkTheme} />
          <Form
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <TodoComponent
            todos={todos}
            currentTab={currentTab}
            handleClick={handleClick}
            handleDelete={handleDelete}
          />

          <div
            className={
              darkTheme
                ? "shadow-lg p-4 flex items-center justify-between gap-4 w-full bg-[#24283c] rounded-sm"
                : "shadow-lg p-4 flex items-center justify-between gap-4 w-full bg-white rounded-sm "
            }
          >
            <p>
              {activeTodosCount}{" "}
              {activeTodosCount <= 1 ? " item left" : " items left"}
            </p>
            <DesktopTab
              currentTab={currentTab}
              handleCurrentTab={handleCurrentTab}
            />
            <button onClick={handleCompleted}>Clear Completed</button>
          </div>
          {/* for mobile */}
          <MobileTab
            currentTab={currentTab}
            handleCurrentTab={handleCurrentTab}
          />
          <div className="text-[#4D5066] mt-10 text-center">
            Drag and drop to reorder list
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
