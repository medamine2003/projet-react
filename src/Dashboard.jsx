import { useState, useEffect } from 'react';
import { fetchAllChecklists, deleteChecklist } from './api';
import { Link } from 'react-router-dom';
//import { useParams } from 'react-router-dom';
//import { checklistState } from './EditPage';

const Dashboard = () => {
  const [checklists, setChecklists] = useState([]);
 // const [selectedChecklistId, setSelectedChecklistId] = useState(null);
 //const { state: checklistState } = useParams();
  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        const response = await fetchAllChecklists();
        setChecklists(response.response);
        console.log(response.response)
      } catch (error) {
        console.error('Erreur lors de la récupération des checklists :', error);
       
      }
    };

    fetchChecklists();
  }, []);

  const handleDeleteChecklist = async (checklistId) => {
    if (window.confirm('Are you sure you want to delete this checklist?')) {
      try {
        await deleteChecklist(checklistId);
        const updatedChecklists = checklists.filter((checklist) => checklist.id !== checklistId);
        setChecklists(updatedChecklists);
      } catch (error) {
        console.error(error);
        
      }
    }
  };

  return (
    <>
    
    
      <Link to="/Checklist" >
        <button className="add-button">Add</button>
      </Link>

      {checklists.length > 0 && (
        <div >
          {checklists.map((checklist) => (
            <div key={checklist.id} className='card'>
              <h2 className='title'>{checklist.title}</h2>
              <p className='description'>{checklist.description}</p>
              <h4 className='state'>
                Statut: {checklist.state} 
              </h4>
              <label className='checklist-form'>
      Tasks:
      <ul>
        {checklist.todo.map((task, index) => (
          <li key={index}>{task.title}</li>
        ))}
        
      </ul>
    </label>
              <button onClick={() => handleDeleteChecklist(checklist.id)} className='delete'>Delete</button>
              <Link to={`/EditPage/${checklist.id}`} > <button className='edit'>Edit</button>  </Link>
            </div>
          ))}
        </div>
      )}
    
    </>
  );
};

export default Dashboard;
