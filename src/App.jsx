//import des composants et des hooks
import { useState } from 'react';
import './style.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Checklist from './Checklist';
import axiosInstance from './api'; 
import EditPage from './EditPage'
const App = () => {
  const [checklists, setChecklists] = useState([]); 
// fonction pour récupérer les checklist de l'api
  const handleAddChecklist = async () => {
    try {
      const response = await axiosInstance.get('checklists');
      setChecklists(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des checklists :', error);
    }
  };

  return (
// utilisation des composants importés    
    <div className="App">
   {/*Mes routes */}
      <Routes>
        <Route index path="/" element={<Dashboard checklists={checklists} />} />
        <Route
          path="/Checklist"
          element={<Checklist onAddChecklist={handleAddChecklist} />}
        />
       <Route path="/EditPage/:id" element={<EditPage />} />
      </Routes>
    </div>
  );
};

export default App;
