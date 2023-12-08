import { useState } from 'react';
import { addChecklist } from './api'; // Importing the function to add a checklist
import { Link } from 'react-router-dom'; // Importing the Link component from react-router-dom

const Checklist = () => {
  // State variables using the useState hook
  const [title, setTitle] = useState(''); // State for checklist title
  const [description, setDescription] = useState(''); // State for checklist description
  const [state, setState] = useState(0); // State for checklist state (0 by default)
  const [tasks, setTasks] = useState([]); // State for checklist tasks
  const [newTask, setNewTask] = useState(''); // State for a new task input

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Creating a new checklist object with the current state values
    const newChecklist = {
      title,
      description,
      state,
      todo: tasks.map((task) => ({
        title: task.title,
        description: '', // Default description for each task
      })),
    };

    try {
      // Calling the addChecklist function with the new checklist object
      await addChecklist(newChecklist);

      // Resetting the form fields after successful checklist addition
      setTitle('');
      setDescription('');
      setState(0);
      setTasks([]);
      setNewTask('');
    } catch (error) {
      console.error('Erreur lors de la création de la checklist : ', error);
    }
  };

  // Function to handle adding a new task to the checklist
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      // Adding a new task to the tasks array
      setTasks([...tasks, { title: newTask }]);
      setNewTask(''); // Resetting the new task input field
    }
  };

  // Rendering the JSX
  return (
    <>
      {/* Link to navigate back to the dashboard */}
      <Link to="/">
        <button className="add-button">Go to dashboard</button>
      </Link>

      {/* Checklist form */}
      <form onSubmit={handleSubmit} className='checklist-form'>
        {/* Input for checklist title */}
        <label>
          Titre:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        {/* Textarea for checklist description */}
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        {/* Section for adding tasks */}
        <div>
          <label>
            Tâches:
            {/* Input for adding a new task */}
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nouvelle tâche"
            />
            {/* Button to add a new task */}
            <button type="button" onClick={handleAddTask} className='add-task'>
              Ajouter tâche
            </button>
          </label>

          {/* Displaying the list of tasks */}
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task.title}</li>
            ))}
          </ul>
        </div>

        {/* Submit button to add the checklist */}
        <button type="submit">Ajouter Checklist</button>
      </form>
    </>
  );
};

export default Checklist;
