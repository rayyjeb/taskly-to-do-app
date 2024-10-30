import React, { useEffect, useState } from "react";

const Tasks = () => {
  const [inputText, setInputText] = useState("");
  const [todoArr, setTodoArr] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Functionalty to Load saved items from session storage on initial render
  useEffect(() => {
    const savedTodos = JSON.parse(sessionStorage.getItem("todoarr")) || [];
    setTodoArr(savedTodos);
  }, []);

  //Functionalty to  Update session storage whenever the todoArr changes
  useEffect(() => {
    sessionStorage.setItem("todoarr", JSON.stringify(todoArr));
  }, [todoArr]);

  //Functionalty to  Add a new item to the list
  const addItemToArray = () => {
    if (inputText.trim() !== "") {
      setTodoArr([...todoArr, { text: inputText, completed: false }]);
      setInputText("");
    }
  };

  //Functionalty to  Toggle complete status
  const toggleComplete = (index) => {
    const updatedArr = todoArr.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodoArr(updatedArr);
  };

  //Functionalty to  Delete an item
  const deleteItem = (index) => {
    const updatedArr = todoArr.filter((_, i) => i !== index);
    setTodoArr(updatedArr);
  };

  //Functionalty to  Enter edit mode for a specific item
  const startEditItem = (index) => {
    setEditIndex(index);
    setEditText(todoArr[index].text);
  };

  //Functionalty to  Save the edited item
  const saveEditItem = (index) => {
    const updatedArr = [...todoArr];
    updatedArr[index].text = editText;
    setTodoArr(updatedArr);
    setEditIndex(null);
    setEditText("");
  };

  //Functionalty to  Reset the todo list
  const resetList = () => {
    setTodoArr([]);
  };

  //Functionalty to  Calculate number of completed tasks
  const completedTasks = todoArr.filter((item) => item.completed).length;

  return (
    <div className="GrandParentDiv">
      <div className="parentMain">
        <div className="MainHeaderDiv">
          {/* TOP HEADER TEXT */}
          <h1>Hi There! 👋🏻</h1>
          <h3>Stay Organized, Stay Ahead!</h3>
        </div>
        <div className="completed-tasks-message">
          <h5>
            {completedTasks}/{todoArr.length} Completed Tasks
          </h5>
        </div>
        <div className="inputTaskDiv">
          {/* INPUT TEXT FOR ADDING TASKS */}
          <input
            className="inputBox"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a new task"
            onKeyPress={(e) => e.key === "Enter" && addItemToArray()}
          />
          <button onClick={addItemToArray}>Add Task</button>
        </div>
        <div className="todolistMain">
          {/* LIST OF ADDED TASKS */}
          <ul id="todolist">
            {todoArr.map((item, index) => (
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
                key={index}
                id={`item${index}`}
                className={item.completed ? "completed" : ""}
              >
                {editIndex === index ? (
                  <input
                    type="text"
                    className="editInput"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => saveEditItem(index)}
                    onKeyPress={(e) => e.key === "Enter" && saveEditItem(index)}
                    autoFocus
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "90%",
                    }}
                  >
                    <span
                      style={{
                        textDecoration: item.completed
                          ? "line-through"
                          : "none",
                        paddingRight: "12px",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      onClick={() => toggleComplete(index)}
                    >
                      {item.completed ? "✅" : "⭕"} {item.text}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        gap: "1rem",
                      }}
                    >
                      {/* EDIT AND DELETE BUTTON */}
                      <span onClick={() => startEditItem(index)}>Edit</span>
                      <span onClick={() => deleteItem(index)}>&times;</span>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* RESET BUTTON */}
        <button className="btnReset" onClick={resetList}>
          Reset List
        </button>
      </div>
    </div>
  );
};

export default Tasks;
