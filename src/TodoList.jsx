import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./TodoList.css";

const TodoList = props => {
  const [activity, setActivity] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      var items = [
        {id: 1, title: "Test 1", completed: true},
        {id: 2, title: "Test 2", completed: false},
        {id: 3, title: "Test 3", completed: false},
      ]
      setData(items);
    };

    fetchData();

    return () => {
      console.log("zmiana nazwy");
    };
  }, []);

  function handleChage(e, i) {
    var myData = [...data];
    myData[i].title = e.target.value;
    console.log(myData[i])
    setData(myData);
  }

  function handleClick(e, i) {
    var myData = [...data];
    myData[i].completed = !myData[i].completed;
    console.log(myData[i])
    setData(myData);
  }

  function handleDelete(i) {
    var myData = data.filter(e => e.id !== i);
    setData(myData);
  }

  const lis = data.map((d, i) =>
      <li
          key={d.id}
          className='task'
      >
        <input
            className={`task-input ${d.completed ? "task-done" : ''}`}
            type="text"
            value={d.title}
            onChange={e => handleChage(e, i)}
        ></input>
        <div className='button-box'>
          <button
              onClick={e => handleDelete(d.id)}
              className='delete-button input-button'
          >delete</button>
          <button
              onClick={e => handleClick(e, i)}
              className='done-button input-button'
          >done</button>
        </div>
        <hr className='divider' />
      </li>
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (activity.trim() === "") {
      setError("Empty activity is not correct!")
    }
    else {
      setData([...data, {id: uuidv4(), title: activity}]);
      setActivity("");
      setError("")
    }
  };

  function handleAdd(e) {
    var value = e.target.value;
    if (value.trim() === "") {
      setError("Empty activity is not correct!")
    }
    else {
      setError("")
    }
    setActivity(e.target.value)
  }

  return (
    <div className='main'>
      <div className='header'>Lista do zrobienia</div>
      <div className='search-box'>
        <div className='search-box-up'>
          <form onSubmit={handleSubmit}>
            <input
                className='activity-input'
                type="text"
                value={activity}
                placeholder='Type new task name'
                onChange={e => handleAdd(e)}
            ></input>
            <button className='save-button'>Save</button>
          </form>
        </div>
        <div className='search-box-down'>
          {error.trim() !== "" && <div> {error} </div>}
        </div>
      </div>
      <ul>{lis}</ul>
    </div>
  );
};

export default TodoList;
