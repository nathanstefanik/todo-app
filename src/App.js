import './App.css';
import Task from "./Task";
import TaskForm from "./TaskForm";
import {useState,useEffect} from "react";

function App() {
  const [tasks,setTasks] = useState([]);
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
  }, []);
  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name,done:false}];
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    })
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;
  
  function getMessage() {
    const percentage = numberComplete / numberTotal;
    if (percentage === 0) {
      return 'Fresh start!';
    }
    if (percentage === 1) {
      return 'Nothing left to do...';
    }
    return 'Keep it going';
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove);
    })
  }

  function renameTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete!</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask}/> 
      {tasks.map((task,index) => (
        <Task {...task} 
              onTrash={() => removeTask(index)}
              onRename={newName => renameTask(index,newName)}
              onToggle={done => updateTaskDone(index, done)}/>
      ))}
    </main>
  );
}

export default App;
