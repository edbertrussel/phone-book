import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditContact } from '../mutation/useEditContact';
import { useContactInfo } from '../hooks/useContactInfo';
import './css/EditContactForm.css';  


export const EditContactForm: React.FC = () => {
  const { id } = useParams();
  const idAsNumber = id ? parseInt(id, 10) : undefined;
  const { data } = useContactInfo(idAsNumber);
  const { handleEditContact } = useEditContact();


  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (data) {
      setFirstName(data.contact_by_pk.first_name || '');
      setLastName(data.contact_by_pk.last_name || '');
    }
  }, [data]);

  const handleSaveChanges = async () => {
    try {
      const contactInput = {
        id: idAsNumber,
        _set: {
          first_name: firstName,
          last_name: lastName,
        },
      };
  
      await handleEditContact(contactInput);

      navigate("/");
      
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    
    <div className="page-wrapper">
      <div className='padding-global'>
        <div className='editForm-container'>
          <div className='editFormInside-container'>
            <h2>Edit Contact</h2>

            <div className="form-label">
              <label>First Name:</label>
            </div>

            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

            <div className="form-label">
              <label>Last Name:</label>
            </div>

            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

            <div className='buttons-container'>
              <button  onClick={() => navigate("/")} className='back-button'>Back</button>
              <button className='save-button' onClick={handleSaveChanges}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
