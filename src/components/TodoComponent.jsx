import React, { useContext } from "react";
import { darkThemeProvider } from "../context/Themecontext";
import check from "/icon-check.svg";
import cross from "/icon-cross.svg";
import { Draggable, Droppable } from "@hello-pangea/dnd";

const TodoComponent = props => {
  const { darkTheme } = useContext(darkThemeProvider);

  return (
    <Droppable droppableId="todos">
      {provided => (
        <div
          className="max-h-[60%] overflow-auto shadow-lg"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {props.todos.length > 0 ? (
            props.todos.map((todo, index) => (
              <Draggable draggableId={todo.id} index={index} key={todo.id}>
                {provided => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    key={todo.id}
                    className={
                      darkTheme
                        ? "border-b flex items-center gap-4 w-full p-4 bg-[#24283c] rounded-sm task shadow-lg cursor-pointer"
                        : "border-b flex items-center gap-4 w-full p-4 bg-white rounded-sm task shadow-lg cursor-pointer"
                    }
                  >
                    <div
                      className={
                        todo.isCompleted ? " circle gradient " : "circle"
                      }
                      onClick={() => props.handleClick(todo.id)}
                    >
                      <img src={todo.isCompleted ? check : null} alt="" />
                    </div>
                    <div className={todo.isCompleted ? "done" : ""}>
                      {todo.task}
                    </div>
                    <img
                      src={cross}
                      alt=""
                      className="ml-auto md:hidden delete "
                      onClick={() => props.handleDelete(todo.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))
          ) : props.currentTab !== "all" ? (
            <p
              className={
                darkTheme ? "p-4 bg-[#24283c] mb-2" : "p-4 bg-white mb-2"
              }
            >
              No {props.currentTab} items
            </p>
          ) : (
            ""
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoComponent;
