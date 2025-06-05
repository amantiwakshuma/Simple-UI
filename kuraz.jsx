import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: true },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // for filtering

  const addTask = () => {
    if (!newTask.trim()) {
      alert('Task title cannot be empty!');
      return; // This checks validation
    }
    setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }]);
    setNewTask('');
  };

  const markTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; 
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 w-full"
          placeholder="Add a new task"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 mt-2">Add Task</button>
      </div>
      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className={`flex justify-between items-center p-2 border ${task.completed ? 'bg-green-200' : 'bg-white'}`}>
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
            <div>
              <button onClick={() => markTaskCompletion(task.id)} className="bg-yellow-500 text-white p-1 mr-2">
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-1">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
