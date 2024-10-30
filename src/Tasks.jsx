import React, { useEffect, useState } from "react";
import ClockTimer from "./Components/Clock";
import Sidebar from "./Components/Sidebar";
import RightBar from "./Components/RightBar";

const Tasks = () => {
  const [inputText, setInputText] = useState("");
  const [todoArr, setTodoArr] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  // For Fetching Quotes
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(
          "https://quotes-api-self.vercel.app/quote"
        );
        const data = await response.json();
        console.log("data: ", data);
        setQuote(data.quote);
        setAuthor(data.author);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);
  // For Fetching Todo List using dummy api

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();
        const todos = data.todos.map((item) => ({
          text: item.todo,
          completed: item.completed,
        }));
        setTodoArr(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Save todos to local storage whenever todoArr changes
  useEffect(() => {
    localStorage.setItem("todoarr", JSON.stringify(todoArr));
  }, [todoArr]);

  // Functionality to add a new item to the list
  const addItemToArray = () => {
    if (inputText.trim() !== "") {
      // Prepend the new task to the existing todoArr
      setTodoArr([{ text: inputText, completed: false }, ...todoArr]);
      setInputText("");
    }
  };

  // Functionality to toggle complete status
  const toggleComplete = (index) => {
    const updatedArr = todoArr.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodoArr(updatedArr); // Update the state
  };

  // Functionality to delete an item
  const deleteItem = (index) => {
    const updatedArr = todoArr.filter((_, i) => i !== index);
    setTodoArr(updatedArr); // Update the state
  };

  // Functionality to enter edit mode for a specific item
  const startEditItem = (index) => {
    setEditIndex(index);
    setEditText(todoArr[index].text);
  };

  // Functionality to save the edited item
  const saveEditItem = (index) => {
    const updatedArr = [...todoArr];
    updatedArr[index].text = editText;
    setTodoArr(updatedArr); // Update the state
    setEditIndex(null);
    setEditText("");
  };

  // Functionality to reset the todo list
  const resetList = () => {
    setTodoArr([]);
  };

  // Functionality to calculate number of completed tasks
  const completedTasks = todoArr.filter((item) => item.completed).length;

  return (
    <div className="GrandParentDiv">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="RightSideDiv">
        <div className="parentMain">
          <div className="MainHeaderDiv">
            {/* TOP HEADER TEXT */}
            <h1>Hi There! 👋🏻</h1>
            <h3>{quote}</h3>
            <h3>- {author}</h3>
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
            <button onClick={addItemToArray}>Add</button>
          </div>
          <div className="todolistMain">
            {/* LIST OF ADDED TASKS */}
            {loading ? (
              <div>Loading To-Do items...</div> // Display loading message
            ) : (
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
                        onKeyPress={(e) =>
                          e.key === "Enter" && saveEditItem(index)
                        }
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
            )}
          </div>
          {/* RESET BUTTON */}
          <button className="btnReset" onClick={resetList}>
            Reset List
          </button>
        </div>
      </div>
      <div className="fixed">
        <RightBar />
      </div>
    </div>
  );
};

export default Tasks;
