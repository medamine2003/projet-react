import { useState } from 'react';
import { addChecklist } from './api'; 
import { Link } from 'react-router-dom';

const Checklist = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState(0); 
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  //const checklistState = ['Vierge', 'En cours', 'Terminée'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChecklist = {
      title,
      description,
      state, // Inclure le statut dans la nouvelle checklist
      todo: tasks.map((task) => ({
        title: task.title,
        description: ''
      })),
    };

    try {
      await addChecklist(newChecklist); 
      setTitle('');
      setDescription('');
      setState(0);
      setTasks([]);
      setNewTask('');
    } catch (error) {
      console.error('Erreur lors de la création de la checklist : ', error);
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { title: newTask }]);
      setNewTask('');
    }
  };

  return (
    <>
      <Link to="/" >
        <button className="add-button">Go to dashboard</button>
      </Link>
      <form onSubmit={handleSubmit} className='checklist-form'>
        <label>
          Titre:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        
        <div>
          <label>
            Tâches:
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nouvelle tâche"
            />
            <button type="button" onClick={handleAddTask} className='add-task'>
              Ajouter tâche
            </button>
          </label>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task.title}</li>
            ))}
          </ul>
        </div>
        <button type="submit" >Ajouter Checklist</button>
      </form>
    </>
  );
};
export default Checklist;
