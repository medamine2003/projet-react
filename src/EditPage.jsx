//import des hooks et fonctions crées dans api.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChecklist, editChecklist,modifyChecklistStatus  } from './api';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [checklistState, setChecklistState] = useState(0); 
//récupération de la checklist choisie pour la modifier
  useEffect(() => {
    const fetchChecklistDetails = async () => {
      try {
        const checklistDetails = await getChecklist(id);
        setSelectedChecklist(checklistDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la checklist :', error);
      }
    };

    if (id) {
      fetchChecklistDetails();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedChecklist({ ...selectedChecklist, [name]: value });
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setSelectedChecklist({
        ...selectedChecklist,
        todo: [
          ...selectedChecklist.todo,
          {
            title: newTask,
            description: '',
            done: false, 
          },
        ],
      });
      setNewTask('');
    }
  };

  const handleTaskStatusChange = (index) => {
    const updatedTasks = [...selectedChecklist.todo];
    updatedTasks[index].done = !updatedTasks[index].done;
    setSelectedChecklist({ ...selectedChecklist, todo: updatedTasks });
  };

  const handleSaveEdit = async () => {
    try {
        await editChecklist(id, selectedChecklist);
        await modifyChecklistStatus(id, checklistState)
        navigate(`/`)
    } catch (error) {
      console.error('Erreur lors de la modification de la checklist :', error);
    }
  };

  if (!selectedChecklist) {
    return <div>Loading...</div>;
  }
// composant EditPage pour gérer la modification des checklists 
  return (
    <div>
      <h2>Edit Checklist</h2>
      <label className='checklist-form'>
        Title:
        <input
          type="text"
          name="title"
          value={selectedChecklist.title}
          onChange={handleInputChange}
        />
      </label>
      <label className='checklist-form'>
        Description:
        <textarea
          name="description"
          value={selectedChecklist.description}
          onChange={handleInputChange}
        ></textarea>
      </label>
      <label className='checklist-form'>
        Checklist State:
        <select onChange={(e) => setChecklistState(e.target.value)}>    
          <option value={0}>Vierge</option>
          <option value={1}>En cours</option>
          <option value={2}>Terminée</option>
        </select>
        
      </label>
      <label className='checklist-form'>
        Tasks:
        <ul>
          {selectedChecklist.todo.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleTaskStatusChange(index)}
              />
              {task.title}
            </li>
          ))}
          
        </ul>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </label>
      <button onClick={handleSaveEdit} className='save'>Save</button>
    </div>
  );
};

export default EditPage;
