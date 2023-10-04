import React, { useState } from 'react';
import { useAddContact } from '../mutation/useAddContact';
import { useNavigate } from 'react-router-dom';
import './css/AddContactForm.css';  

export default function AddContactForm() {
  const { handleAddContact } = useAddContact(); 
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [phones, setPhones] = useState<Array<{ number: string }>>([]);

  const navigate = useNavigate();

  const numericRegex = /^[0-9]*$/;
  const alphanumericRegex = /^[a-zA-Z0-9]*$/;

  const handlePhoneAdd = () => {
    if (phone) {
      if (phone.match(numericRegex))
      {
        setPhones([...phones, { number: phone }]);
        setPhone('');
      } else {
        alert("Phone number should contain only number!")
      }
    }
  };

  const HandleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || phones.length === 0) {
      alert("Please fill in all the contact info!");
      return;
    }

    if (!firstName.match(alphanumericRegex) || !lastName.match(alphanumericRegex)) {
      alert('First Name and Last Name should contain only letters and numbers.');
      return;
    }
    
    try {
      // Call the handleAddContact function to add the contact
      const result = await handleAddContact(firstName, lastName, phones);

      // Handle the result, e.g., show a success message or reset the form
      console.log('Contact added:', result);
      
      // Reset the form
      setFirstName('');
      setLastName('');
      setPhones([]);

      navigate("/");

    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error('Error adding contact:', error);

      alert("Please enter another phone number!");

      setFirstName('');
      setLastName('');
      setPhones([]);
    }
};

return (
  <div className="page-wrapper">
    <div className='padding-global'>
      <div className='addForm-container'>
        <h2>Add New Contact</h2>
        <form className='formInside-container' onSubmit={HandleFormSubmit}>

          <div className='addForm-label'>
            <label>First Name:</label>
          </div>

          <input className="twoInput-field" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

          <div className='addForm-label'>
            <label>Last Name:</label>
          </div>

          <input className="twoInput-field" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

          <div className='addForm-label'>
            <label>Phone Number:</label>
          </div>

          <div className='phone-container'>
            <input className="oneInput-field" type="text" value={phone}
            onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.match(numericRegex) || inputValue === '') {
              setPhone(inputValue);
            }}}/>

            <button type="button" className="addPhone-button" onClick={handlePhoneAdd}>Add</button>
          </div>

          <div className='list-container'>
            <ul className='list-number'>Phone List:
              {phones.map((p, index) => (<li key={index}>- {p.number}</li>))}
            </ul>
          </div>

          <div className="buttonss-container">
            <button className='backs-button' onClick={() => navigate("/")}>Back</button>
            <button type="submit" className="adds-button">Add Contact</button>
          </div>

        </form>
      </div>
    </div>
  </div>
);
}
