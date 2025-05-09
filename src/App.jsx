import { useContext, useEffect, useState } from "react";
import { darkThemeProvider } from "./context/Themecontext";
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
  const [currentTab, setCurrentTab] = useState("all");

  const { darkTheme} = useContext(darkThemeProvider);
 

  const activeTodosCount = todoArray.filter(todo => !todo.isCompleted).length;

  const todos = checkTabs(currentTab);

  function checkTabs(tab) {
    if (tab === "all") {
      return todoArray;
    }
    if (tab === "active") {
      return todoArray.filter(todo => !todo.isCompleted);
    }

    if (tab === "completed") {
      return todoArray.filter(todo => todo.isCompleted);
    }
  }

  const handleCompleted = () => {
    const incompleteTodos = todoArray.filter(todo => !todo.isCompleted);
    setTodoArray(incompleteTodos);
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
    const newTodos = Array.from(todoArray);
    const [reOrderedItem] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, reOrderedItem);
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
          <Header/>
          <Form setTodoArray={setTodoArray} todoArray={todoArray} />

          <TodoComponent
            todos={todos}
            currentTab={currentTab}
            todoArray={todoArray}
            setTodoArray={setTodoArray}
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
             setCurrentTab={setCurrentTab}
            />
            <button onClick={handleCompleted}>Clear Completed</button>
          </div>
          {/* for mobile */}
          <MobileTab
            currentTab={currentTab}
           setCurrentTab={setCurrentTab}
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
