import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';

function Header({ title, description, }) {

  return (
    <>
      <div className="header">
        <h1>{title}</h1>
        <p className="description">{description}</p>
      </div>
    </>
  )
}

function ToDo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  })
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
   const [isOpen, setIsOpen] = useState('')

  const toggleComplete = (index) => {
    const updtateTasks = [...tasks];
    updtateTasks[index].completed = !updtateTasks[index].completed;
    setTasks(updtateTasks);
  }

  const deleteTask = (index) => {
    const updtateTasks = [...tasks];
    updtateTasks.splice(index, 1);
    setTasks(updtateTasks);
  }

  const handleInput = () => {
    if (!task) {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      name: task,
      time: time,
      date: date,
      completed: false,
    }
    alert("Task Added Successfully");
    setTasks([...tasks, newTask]);
    setDate('');
    setTime('');
    setTask('');


  }

  const handleTaskView = () => {
    setIsOpen(prev =>!prev)
  }
  return (
    <div className="todo">
      <Header title={'To Do App'} description={'Add Your ToDo List Bellow'} />

      <div className="todo-list">
        <input className="input1" type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a new task..." />
        <div className="input2">
          <input className="period" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input className="period" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <button onClick={handleInput}>
            Add Task
          </button>
          <button onClick={handleTaskView}>
            {isOpen ? 'Hide Tasks' : 'Show Tasks'}
          </button>
        </div>



        {isOpen && (
          <ul className="tasks">
            <h2>My ToDo List</h2>
            {tasks.map((item, index) => (
              <li key={index} className={item.completed ? 'task completed' : 'task'}>

                <input className="checkbox" type="checkbox" checked={item.completed} onChange={(e) => toggleComplete(index)} />
                <p> <span className="date">Task:</span> {item.name}</p>
                <p> <span className="date">Date:</span> {item.date}</p>
                <p> <span className="date">Time:  </span>{item.time}</p>
                <FaTrash className="trash" onClick={() => deleteTask(index)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

export default App;