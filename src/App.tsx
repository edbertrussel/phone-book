import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ContactListPage from './Page/ContactListPage';
import AddContactForm from './Page/AddContactForm';
import { EditContactForm } from './Page/EditContactForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ContactListPage />} />
        <Route path="/add-contact" element={<AddContactForm />} />
        <Route path="/:id" element={<EditContactForm/>} />
      </Routes>
    </div>
  );
}

export default App;
